import { fetchRoom, fetchRoomUsers, fetchUser } from './QueryFunctions';
import { useEffect, useState } from 'react';
import BaseContainer from './BaseContainer';
import Header from './Header';
import Messages from './Messages';
import UserList from './UserList';
import useSocket from '../connection/useSocket';

export default function Chat({ id, user }) {
  const socket = useSocket();

  const [roomData, setRoomData] = useState({});
  const [roomUsers, setRoomUsers] = useState([]);
  const [userData, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    Promise.resolve().then(async () => {
      try {
        const [fRoom, fRoomUsers, fUser] = await Promise.all([
          fetchRoom(id),
          fetchRoomUsers(id),
          fetchUser(user),
        ]);

        setUser(fUser);
        setRoomData(fRoom);
        setRoomUsers(fRoomUsers);

        Promise.resolve().then(() => {
          const newUsers = {
            [fUser._id]: fUser,
          };

          fRoomUsers.forEach((u) => {
            if (!newUsers[u._id]) newUsers[u._id] = u;
          });

          setUsers(newUsers);
        });
      } catch (e) {
        // alert
        return console.error(e);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const appendMessage = (m) => {
      const newMessages = [...messages, m];
      setMessages(newMessages);
    };

    const userJoin = (user) => {
      if (roomUsers.some((u) => u?._id === user?._id)) return;

      const newList = [...roomUsers, user];
      const newUsers = { ...users, [user?._id]: user };

      Promise.all([
        setRoomUsers(newList),
        setUsers(newUsers),
        appendMessage({
          userID: user?._id,
          type: 'sys:join',
          self: userData?._id === user?._id,
        }),
      ]);
    };

    const userLeave = ({ _id }) => {
      const index = roomUsers.findIndex((u) => u?._id === _id);
      if (index === -1) return;

      roomUsers.splice(index, 1);
      Promise.all([
        setRoomUsers([...roomUsers]),
        appendMessage({
          userID: _id,
          type: 'sys:leave',
        }),
      ]);
    };

    const receiveMessage = (message) => {
      if (message?.userID === userData?._id) message.self = true;
      appendMessage(message);
    };

    socket.on('user:join', userJoin);
    socket.on('user:leave', userLeave);
    socket.on('user:message', receiveMessage);

    return () => {
      socket.off('user:join', userJoin);
      socket.off('user:leave', userLeave);
      socket.off('user:message', receiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomUsers, messages, users]);

  return (
    <BaseContainer className='flex-col'>
      <Header name={id} />

      <div className='flex flex-row flex-grow'>
        <Messages user={userData} messages={messages} users={users} />
        <UserList creator={roomData.creator} list={roomUsers} />
      </div>
    </BaseContainer>
  );
}
