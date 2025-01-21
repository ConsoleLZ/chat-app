import io from '@hyoga/uni-socket.io';
import { SOCKET_URL } from '@/config.js';

let socket = null;

// 初始化Socket连接并发送用户信息
export function initSocket(userInfo) {
	if (!socket) {
		socket = io(SOCKET_URL, {
			transports: ['websocket', 'polling'],
			timeout: 5000
		});

		// 监听连接成功的事件，并在此时发送用户信息
		socket.on('connect', () => {
			console.log('Connected to server');
			sendUserInfo(userInfo);
		});
	}

	return socket;
}

// 发送用户信息到服务器
function sendUserInfo(userInfo) {
	if (socket) {
		socket.emit('user info', userInfo);
	}
}

// 获取Socket实例
export function getSocket() {
	return socket;
}

// 断开Socket连接
export function disconnectSocket() {
	if (socket) {
		socket.disconnect();
		socket = null; // 确保断开后重置socket为null
	}
}

// 监听私聊消息
export function listenPrivateMessage(callback) {
	if (socket) {
		socket.on('private message', callback);
	}
}

// 发送私聊消息
export function sendPrivateMessage(to, msg, userInfo, createTime = Date.now()) {
	if (socket) {
		socket.emit('private message', { to, msg, userInfo, createTime });
	}
}

// 监听更新用户列表
export function listenUpdateUsers(callback) {
	if (socket) {
		socket.on('update users', callback);
	}
}

/**
 * 创建一条私聊消息
 * @senderId 发送者id
 * @receiverId 接收者id
 * @content 消息内容
 * @userInfo 发送该条消息的用户信息
 * @isMe 是否是自己发送的
 * @messageType 消息类型
 */
export function createPrivateMessage(senderId, receiverId, content, userInfo, isMe, messageType = 'text') {
	return {
		senderId,
		receiverId,
		content,
		userInfo,
		isMe,
		messageType,
		createTime: Date.now()
	};
}
