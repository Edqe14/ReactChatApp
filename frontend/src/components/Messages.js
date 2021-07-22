import { useEffect, useState } from 'react';
import Input from './Input';
import Message from './Message';
import useSocket from '../connection/useSocket';

export default function Messages({ user, messages, users }) {
  const socket = useSocket();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [lockScroll, setLockScroll] = useState(true);

  useEffect(() => {
    const div = document.getElementById('messages');
    if (div && lockScroll) {
      div.scrollTo(0, div.scrollHeight);
    }
  }, [messages, lockScroll]);

  useEffect(() => {
    const handler = async (e) => {
      const bottom =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) return setLockScroll(true);
      return setLockScroll(false);
    };

    const div = document.getElementById('messages');
    div.addEventListener('scroll', handler);
    return () => {
      div.removeEventListener('scroll', handler);
    };
  }, []);

  const sendMessage = async (value) => {
    socket.emit('message', {
      userID: user._id,
      timestamp: Date.now(),
      value,
      type: 'user:message',
    });
  };

  const handleChange = async (e) => {
    Promise.resolve().then(() => {
      if (e.keyCode !== 13 || (e.keyCode === 13 && e.shiftKey)) return;

      const value = `${e.target.innerText}`.trim();
      e.target.innerText = '';
      if (!value) return;

      sendMessage(value);
    });

    const text = e.target.innerText;
    setShowPlaceholder(!text?.length);
  };

  return (
    <div className='w-full sm:w-3/4 h-all overflow-y-auto relative pb-20'>
      <div
        className='h-full w-full flex flex-col p-6 overflow-y-auto'
        id='messages'
      >
        {messages.map((m, i, a) => (
          <Message {...m} users={users} key={i} index={i} messages={a} />
        ))}
      </div>

      <div className='absolute w-full bottom-2 px-2'>
        {showPlaceholder && (
          <p className='absolute py-2 px-4 text-light text-opacity-50 pointer-events-none'>
            Type your messages here
          </p>
        )}
        <Input onKeyUp={handleChange} />
      </div>
    </div>
  );
}
