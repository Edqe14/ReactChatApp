import { useEffect, useState } from 'react';
import BaseContainer from '../../components/BaseContainer';
import Button from '../../components/Button';
import Field from '../../components/Field';
import { fetchUser } from '../../components/QueryFunctions';
import { useAlert } from 'react-alert';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

export default function Landing() {
  const [cookies] = useCookies(['userID']);
  const { isLoading, data } = useQuery('user', () => fetchUser(cookies.userID));
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => !cookies.userID && history.push('/'));

  const [animate, setAnimate] = useState(false);
  const [room, setRoom] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 1500);
    return () => clearTimeout(timeout);
  });

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
            ].join(' ')}
          >
            Welcome,{' '}
            <span className='font-medium text-pink'>{data.username}</span>
          </h1>

          <div
            className={[
              'transitiion duration-500 ease-in-out',
              !animate && 'opacity-0',
            ].join(' ')}
          >
            <form onSubmit={joinRoom} className='w-96'>
              <Field
                name='room'
                title='Room ID'
                value={room}
                onChange={updateRoom}
              />

              <div className='flex items-center justify-end'>
                <Button text='Join' type='submit' />
              </div>
            </form>
          </div>
        </>
      )}
    </BaseContainer>
  );
}
