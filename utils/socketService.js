import io from '@hyoga/uni-socket.io';
import {SOCKET_URL} from '@/config.js'

let socket = null;

export function initSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
			timeout: 5000
    })
  }

  return socket
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}