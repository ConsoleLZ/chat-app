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

// 存储用户的映射关系 (username -> socket.id)
const users = {};

// 监听连接事件
io.on('connection', socket => {
	console.log('a user connected');

	// 接收用户信息并存储
	socket.on('user info', (userInfo) => {
		const userId = userInfo?.id
		if (!users[userId]) {
			users[userId] = socket.id;
			socket.userId = userId;
			socket.username = userInfo.name
			io.emit('update users', Object.keys(users)); // 发送当前在线用户列表给所有客户端
		} else {
			console.log(`Username ${userId} is already taken`);
		}
	});

	// 监听来自客户端的消息
	socket.on('private message', ({ to, msg }) => {
		const toSocketId = users[to];
		if (toSocketId) {
			// 发送私信给指定用户
			io.to(toSocketId).emit('private message', {
				from: socket.userId,
				message: msg,
				name: socket.username
			});
			console.log(`message from ${socket.username} to ${to}: ${msg}`);
		} else {
			console.log(`User ${to} not found`);
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
});

const port = 3001;

// 开始监听端口
server.listen(port, '0.0.0.0', () => {
	console.log(`socket服务启动成功，端口在:${port}`);
});
