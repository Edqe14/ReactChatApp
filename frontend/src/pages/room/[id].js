import Landing from './landing';
import { useParams } from 'react-router-dom';

export default function Room({ login }) {
  const { id } = useParams();
  if (id === 'landing') return <Landing login={login} />;

  // TODO socket & layout

  return <h1>{id}</h1>;
}
