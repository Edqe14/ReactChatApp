import './styles/global.css';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import AlertTemplate from './components/AlertTemplate';
import Home from './pages';
import ReactDOM from 'react-dom';
import Room from './pages/room/[id]';
import { axios } from './components/QueryFunctions';
import { useCookies } from 'react-cookie';
import useSocket from './connection/useSocket';

const queryClient = new QueryClient();

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const location = useLocation();
  const socket = useSocket();

  const login = async (payload) => {
    const res = await axios
      .post(
        '/auth',
        payload ?? {
          isNew: false,
          userID: cookies.userID,
        }
      )
      .catch((e) => e);
    if (res.status === 200) {
      socket.emit('status', { userID: res.data.userID, online: true });
      setCookie('login', Date.now());

      console.log(location);
      if (location.pathname === '/') history.push('/room/landing');
      return;
    }

    removeCookie('userID');
    alert.error(res.response.data.message);
    history.push('/');
    return console.error(res);
  };

  socket.on('connect', () => login());

  return (
    <AlertProvider
      template={AlertTemplate}
      position={positions.BOTTOM_CENTER}
      timeout={10000}
      transitions={transitions.SCALE}
      offset='10px'
    >
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route exact path='/'>
            <Home login={login} />
          </Route>

          <Route path='/room/:id'>
            <Room login={login} />
          </Route>
        </Switch>
      </QueryClientProvider>
    </AlertProvider>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
