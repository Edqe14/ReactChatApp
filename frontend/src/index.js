import './styles/global.css';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import AlertTemplate from './components/AlertTemplate';
import Home from './pages';
import ReactDOM from 'react-dom';
import Room from './pages/room/[id]';
import { axios } from './components/QueryFunctions';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import useSocket from './connection/useSocket';

const queryClient = new QueryClient();

function App() {
  const [cookies, , removeCookie] = useCookies();
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
      if (location.pathname === '/') return history.push('/room/landing');
      return;
    }

    removeCookie('userID');
    alert.error(res.response.data.message);
    return console.error(res);
  };

  socket.io.on('reconnect', () => login());

  useEffect(() => {
    Promise.resolve().then(() => {
      if (location.pathname === '/') return;
      if (!cookies.userID) return history.push('/');
      login();
    });
  });

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

          <Route exact path='/room'>
            <Redirect to='/room/landing' />
          </Route>

          <Route path='/room/:id'>
            <Room login={login} user={cookies.userID} />
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
