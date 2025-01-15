import { io } from 'socket.io-client';
import {SOCKET_URL} from '@/config.js'

let socket = null;

export function initSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      // 可选配置项
      transports: ['websocket'], // 强制使用 WebSocket 协议
      autoConnect: false,         // 不自动连接，允许手动控制
    });
  }
  return socket;
}

export function getSocket() {
  return socket;
}

export function connectSocket() {
  if (socket) {
    socket.connect();
  }
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}