import { fetchRooms, fetchUser } from '../../components/QueryFunctions';
import { useEffect, useState } from 'react';
import BaseContainer from '../../components/BaseContainer';
import Button from '../../components/Button';
import Field from '../../components/Field';
import { useAlert } from 'react-alert';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

export default function Landing() {
  const [cookies] = useCookies(['userID']);
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => !cookies.userID && history.push('/'));

  const [animate, setAnimate] = useState(false);
  const [room, setRoom] = useState('');
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 1500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Promise.resolve().then(async () => {
      const [fUser, fRooms] = await Promise.all([
        fetchUser(cookies.userID),
        fetchRooms(),
      ]);

      setUser(fUser);
      setRooms(fRooms);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinRoom = (e) => {
    e.preventDefault();

    const id = e?.target?.room?.value;
    if (!id) return alert.error('Room ID must not be empty');

    return history.push(`/room/${id}`);
  };

  const updateRoom = (e) => {
    const value = (e?.target?.value ?? '').replace(/ /gi, '-');
    setRoom(value);
  };

  const randomRoom = () => {
    const rand = rooms[Math.floor(Math.random() * rooms.length)];
    history.push(`/room/${rand}`);
  };

  return (
    <BaseContainer className='flex flex-col justify-center items-center shadow-md'>
      {!isLoading && (
        <>
          <h1
            className={[
              'absolute',
              'transition duration-500 ease-in-out',
              'text-7xl mb-16',
              animate && 'text-6xl transform -translate-y-36 scale-75',
              !animate && 'pointer-events-none',
            ].join(' ')}
          >
            Welcome,{' '}
            <span className='font-medium text-pink'>{user.username}</span>
          </h1>

          <div
            className={[
              'transitiion duration-500 ease-in-out',
              !animate && 'opacity-0',
            ].join(' ')}
          >
            <form onSubmit={joinRoom} className='w-96 flex flex-col'>
              <Field
                name='room'
                title='Room ID'
                value={room}
                onChange={updateRoom}
              />

              <div className='flex justify-between items-center'>
                <Button text='Random' onClick={randomRoom} />
                <Button text='Join' type='submit' />
              </div>
            </form>
          </div>
        </>
      )}
    </BaseContainer>
  );
}
