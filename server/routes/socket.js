// 引入必要的模块
const http = require('http');
const { Server } = require('socket.io');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('connect\n');
});

// 将 Socket.IO 附加到 HTTP 服务器上
const io = new Server(server, {
	cors: {
		origin: '*', // 允许所有来源，或者指定特定的来源
		methods: ['GET', 'POST']
	}
});

// 存储用户的映射关系 (userId -> socket.id)
const users = {};

// 离线消息队列
const offlineMessages = [];

// 监听连接事件
io.on('connection', socket => {
	try {
		console.log('a user connected');

		// 接收用户信息并存储
		socket.on('user info', async userInfo => {
			const userId = userInfo?.id;
			if (!users[userId]) {
				users[userId] = socket.id;
				socket.userId = userId;

				// 检查并发送离线消息
				const messagesForUser = offlineMessages.filter(msg => msg.to === userId);
				messagesForUser.forEach(msg => {
					socket.emit(
						'private message',
						createPrivateMessage(msg.from, userId, msg.message, msg.userInfo, false)
					);
				});

				// 清除已发送的离线消息
				offlineMessages.splice(0, offlineMessages.length, ...offlineMessages.filter(msg => msg.to !== userId));

				io.emit('update users', Object.keys(users)); // 发送当前在线用户列表给所有客户端
			} else {
				console.log(`User ${userInfo.name} is already connected`);
			}
		});

		// 监听来自客户端的消息
		socket.on('private message', ({ to, msg, userInfo }) => {
			const toSocketId = users[to];
			if (toSocketId) {
				// 如果接收者在线，直接发送消息
				io.to(toSocketId).emit('private message', createPrivateMessage(userInfo.id, to, msg, userInfo, false));
				console.log(`message from ${userInfo.name} to ${to}: ${msg}`);
			} else {
				// 如果接收者不在线，存储离线消息
				offlineMessages.push({ to, from: userInfo.id, message: msg, userInfo });
				console.log(`Offline message stored for user ${to}`);
			}
		});

		// 当用户断开连接时触发
		socket.on('disconnect', () => {
			if (socket.userId) {
				delete users[socket.userId];
				io.emit('update users', Object.keys(users)); // 更新在线用户列表
				console.log(`${socket.userId} disconnected`);
			}
		});
	} catch (error) {
		console.log('聊天服务出错了', error);
	}
});

const port = 3001;

// 开始监听端口
server.listen(port, '0.0.0.0', () => {
	console.log(`socket服务启动成功，端口在:${port}`);
});

/**
 * 创建一条私聊消息
 * @param senderId 发送者id
 * @param receiverId 接收者id
 * @param content 消息内容
 * @param userInfo 发送该条消息的用户信息
 * @param isMe 是否是自己发送的
 * @param messageType 消息类型
 */
function createPrivateMessage(senderId, receiverId, content, userInfo, isMe, messageType = 'text') {
	return {
		senderId,
		receiverId,
		content,
		userInfo,
		isMe,
		messageType
	};
}
