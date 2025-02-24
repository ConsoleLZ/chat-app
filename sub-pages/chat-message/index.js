import { defineComponent, reactive, toRefs, nextTick, ref } from 'vue';
import { faceList } from './constants';
import { sendPrivateMessage, createMessage, listenPrivateMessage } from '@/utils/socketService';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { getUserInfoStore } from '@/store/index.js';

export default defineComponent({
	setup() {
		const state = reactive({
			messages: [],
			inputText: '',
			scrollTop: 9999,
			chatInfo: {}, // 联系人信息
			loading: false
		});

		const constants = {
			faceList
		};

		const components = {
			popupRef: ref(null)
		};

		const methods = {
			sendMessage() {
				const userInfo = uni.getStorageSync('userInfo');
				if (state.inputText.trim()) {
					const message = createMessage(
						userInfo.id,
						state.chatInfo.id,
						state.inputText,
						userInfo
					);
					sendPrivateMessage(state.chatInfo.id, state.inputText, userInfo);

					// 更新本地存储
					const messages = uni.getStorageSync('messages') || {};
					messages[message.createTime] = {
						...message,
						isMe: true
					};
					uni.setStorageSync('messages', messages);
					// 更新显示的消息
					state.messages = Object.values(messages).sort((a, b) => a.createTime - b.createTime);

					state.messages = methods.dateGroup(state.messages);
					state.inputText = '';
					nextTick(() => {
						state.scrollTop += 1;
					});
				}
			},
			// 打开表情包弹窗
			openFace() {
				components.popupRef.value.open();
			},
			// 选择表情
			selectFace(item) {
				state.inputText += item;
				components.popupRef.value.close();
			},
			// 将所有的未读消息变成已读消息
			changeMessageView() {
				const messages = uni.getStorageSync('messages') || {};
				Object.keys(messages)?.forEach(key => {
					if (messages[key].senderId === state.chatInfo.id) {
						messages[key].isView = true;
					}
				});
				uni.setStorageSync('messages', messages);
			},
			// 处理消息发送时间，显示在页面上
			dateGroup(messages) {
				// 深拷贝 messages 数组以避免修改原始数据
				const disposeData = JSON.parse(JSON.stringify(messages));

				// 创建一个新的数组来存储结果
				const result = [];

				if (disposeData.length === 0) return result;

				// 初始化第一个日期标记
				let beforeDate = disposeData[0].createTime;
				result.push({
					isDate: true,
					date: beforeDate,
					senderId: disposeData[0].senderId,
					receiverId: disposeData[0].receiverId
				});

				// 遍历消息并添加日期标记
				for (let i = 0; i < disposeData.length; i++) {
					const item = disposeData[i];

					// 如果当前消息的时间戳与上一个时间戳相差超过5分钟，则插入新的日期标记
					if (item.createTime - beforeDate > 300000) {
						result.push({
							isDate: true,
							date: item.createTime,
							senderId: item.senderId,
							receiverId: item.receiverId
						});
						beforeDate = item.createTime;
					}

					// 添加当前消息到结果数组
					result.push(item);
				}

				return result;
			},
			goBack() {
				uni.navigateBack();
			}
		};

		// 监听服务器消息
		listenPrivateMessage(data => {
			// 更新本地存储
			const messages = uni.getStorageSync('messages') || {};
			if (!messages[data.createTime]) {
				messages[data.createTime] = data;

				// 更新显示的消息
				state.messages = Object.values(messages).sort((a, b) => a.createTime - b.createTime);

				nextTick(() => {
					state.scrollTop += 1;
				});
			}
		});

		onLoad(options => {
			state.loading = true;
			const userId = options.userId;
			getUserInfoStore
				.get({
					userId
				})
				.then(res => {
					state.chatInfo = res.data.info[0];
					console.log(state.chatInfo)

					// 初始化时加载消息
					const messages = uni.getStorageSync('messages') || {};
					state.messages = Object.values(messages).sort((a, b) => a.createTime - b.createTime);
					state.messages = methods.dateGroup(state.messages);
				})
				.finally(() => {
					state.loading = false;
				});
		});

		onShow(() => {
			methods.changeMessageView();
		});

		// 监听发送过来的私聊消息
		uni.$on('privateMessage', function (data) {
			if (data.senderId === state.chatInfo.id) {
				data.isView = true;
			}
			state.messages.push(data);
			nextTick(() => {
				state.scrollTop += 1;
			});
		});

		return {
			...toRefs(state),
			...methods,
			...components,
			...constants
		};
	}
});
