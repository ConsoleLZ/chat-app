import { io } from 'socket.io-client';
import {SOCKET_URL} from '@/config.js'

let socket = null;

export function initSocket() {
  if (!socket) {
    io(SOCKET_URL)
  }
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}