import { listenPrivateMessage, listenGroupMessage } from '@/utils/socketService.js';

// get请求的参数拼接
export const buildQueryString = params => {
	// 首先检查输入是否为对象且不是null
	if (typeof params !== 'object' || params === null) {
		throw new Error('Parameter must be an object');
	}

	// 创建一个数组来存储键值对
	const queryStringParts = [];

	// 定义编码函数以确保安全的URL参数
	function encode(value) {
		return encodeURIComponent(value);
	}

	// 遍历对象的键值对并添加到数组中
	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			let value = params[key];

			// 如果值是数组或对象，需要序列化它们
			if (Array.isArray(value) || typeof value === 'object') {
				value = JSON.stringify(value);
			}

			// 对键和值进行编码，并添加到数组中
			queryStringParts.push(encode(key) + '=' + encode(value));
		}
	}

	// 将数组连接成字符串并返回，去掉可能存在的前导'?'
	return '?' + queryStringParts.join('&');
};

// 监听后端消息逻辑
export const listenMessage = () => {
	// 私有消息
	const private1 = () => {
		listenPrivateMessage(data => {
			// 使用对象存储消息，以createTime作为key
			const messages = uni.getStorageSync('messages') === '' ? {} : uni.getStorageSync('messages');
			// 检查消息是否已存在
			if (!messages[data.createTime]) {
				data.isView = false;
				messages[data.createTime] = data;
				uni.$emit('privateMessage', data);
				uni.setStorageSync('messages', messages);
			}
		});
	};
	// 群聊消息
	const group = ()=> {
		listenGroupMessage(data => {
			console.log(data)
		})
	}

	return {
		private1,
		group
	};
};

// 页面跳转
export const jump = (url, delay) => {
	setTimeout(() => {
		uni.navigateTo({ url });
	}, delay);
};
