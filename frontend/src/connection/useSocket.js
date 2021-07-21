import Config from '../config/endpoints';
import { io } from 'socket.io-client';
import { useState } from 'react';

export const defaultSocket = io(Config.Gateway);

export default function useSocket(url) {
  const [socket] = useState(url ? io(url) : defaultSocket);

  socket.once('connect', () => console.log(`Socket Connected [${socket.id}]`));

  return socket;
}
