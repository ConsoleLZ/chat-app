// 引入必要的模块
const http = require('http');
const { Server } = require('socket.io');
const { redisConfig } = require('../db.config');
const redis = require('redis');

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

// Redis客户端
let redisClient;

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

				// 检查并发送存储的消息
				const messages = await getMessagesFromRedis(userId);
				messages.forEach(msg => {
					socket.emit('private message', msg);
				});

				io.emit('update users', Object.keys(users)); // 发送当前在线用户列表给所有客户端
			} else {
				console.log(`User ${userInfo.name} is already connected`);
			}
		});

		// 单聊
		socket.on('private message', async ({ to, msg, userInfo, createTime }) => {
			const toSocketId = users[to];
			// 创建消息对象
			const message = createMessage(userInfo.id, to, msg, userInfo, createTime);
			if (!message.createTime) {
				console.error('Invalid message: missing createTime', message);
				return;
			}

			// 存储消息到Redis
			await storeMessageInRedis(message);

			if (toSocketId) {
				// 只发送给接收方
				if (!message.createTime) {
					console.error('Invalid receiver message: missing createTime', message);
					return;
				}
				io.to(toSocketId).emit('private message', message);
			}
		});

		// 群聊
		socket.on('group message', async ({ groupId, to, msg, userInfo, createTime }) => {
			// 创建消息时，设置groupId，并将receiverId设为null（或群组ID）
			const message = createMessage(
				userInfo.id, // senderId
				groupId, // 将群组ID作为receiverId（或设为null，根据需求调整）
				msg,
				userInfo,
				createTime,
				'text',
				groupId // 显式传递groupId
			);

			// 存储消息到Redis
			await storeMessageInRedis(message);

			// 发送给群成员（排除自己）
			to.forEach(item => {
				if (userInfo.id !== item && users[item]) {
					io.to(users[item]).emit('group message', message);
				}
			});
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

initRedis();

/**
 * 创建一条消息
 * @param senderId 发送者id
 * @param receiverId 接收者id
 * @param content 消息内容
 * @param userInfo 发送该条消息的用户信息
 * @param messageType 消息类型
 */
function createMessage(
	senderId,
	receiverId,
	content,
	userInfo,
	createTime = Date.now(),
	messageType = 'text',
	groupId = null // 新增groupId参数
) {
	return {
		senderId,
		receiverId,
		content,
		userInfo,
		createTime,
		messageType,
		isMe: false,
		groupId // 明确标识群组消息
	};
}

/**
 * 将消息存储到Redis
 * @param {Object} message 消息对象
 */
async function storeMessageInRedis(message) {
	if (!message.createTime) {
		console.error('Cannot store message without createTime', message);
		return;
	}

	// 根据是否存在groupId选择存储键
	let key;
	if (message.groupId) {
		key = `group_messages:${message.groupId}`; // 群聊消息键
	} else {
		key = `messages:${message.senderId}:${message.receiverId}`; // 单聊消息键
	}

	const value = JSON.stringify(message);

	// 存储到有序集合
	await redisClient.zAdd(key, { score: message.createTime, value });

	// 设置过期时间（7天）
	await redisClient.expire(key, 60 * 60 * 24 * 7);
}

/**
 * 从Redis获取消息历史
 * @param {string} userId 用户ID
 * @returns {Array} 消息数组
 */
async function getMessagesFromRedis(userId) {
	// 获取发送方是当前用户的消息
	const sendKeys = await redisClient.keys(`messages:${userId}:*`);
	// 获取接收方是当前用户的消息
	const receiveKeys = await redisClient.keys(`messages:*:${userId}`);

	// 合并所有相关key
	const allKeys = [...new Set([...sendKeys, ...receiveKeys])];

	let messages = [];
	for (const key of allKeys) {
		// 获取有序集合中的所有消息
		const values = await redisClient.zRange(key, 0, -1);
		messages = messages.concat(
			values.map(v => {
				const message = JSON.parse(v);
				// 根据当前用户身份设置isMe
				message.isMe = message.senderId === userId;
				return message;
			})
		);
	}

	// 按时间排序
	messages.sort((a, b) => a.createTime - b.createTime);
	return messages;
}

// 初始化redis
async function initRedis() {
	redisClient = redis.createClient({
		url: `redis://:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}`
	});

	// 连接成功事件
	redisClient.on('connect', () => {
		console.log('redis连接成功，端口在' + redisConfig.port);
	});

	// 监听错误信息
	redisClient.on('error', err => {
		console.error('Redis client error:', err);
	});

	await redisClient.connect();
}
