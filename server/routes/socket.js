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

// 监听连接事件
io.on('connection', socket => {
	console.log('a user connected');

	// 监听来自客户端的消息
	socket.on('chat message', msg => {
		console.log('message: ' + msg);

		// 广播消息给所有客户端（包括发送者）
		io.emit('chat message', msg);
	});

	// 当用户断开连接时触发
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

const port = 3001;

// 开始监听端口
server.listen(port, '0.0.0.0', () => {
	console.log(`socket服务启动成功，端口在:${port}`);
});
