import Chat from '../../components/Chat';
import Landing from './landing';
import { useParams } from 'react-router-dom';
import useSocket from '../../connection/useSocket';

export default function Room({ login, user }) {
  const { id } = useParams();
  const socket = useSocket();

  socket.emit('room', { roomID: id, userID: user });

  if (!id || id === 'landing') return <Landing login={login} />;
  return <Chat id={id} user={user} />;
}
