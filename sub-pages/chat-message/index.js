import { defineComponent, reactive, toRefs, nextTick, ref } from 'vue';
import { faceList, tabs } from './constants';
import { sendPrivateMessage, createMessage, messageType } from '@/utils/socketService';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { getUserInfoStore, postUploadImagesStore, getExpressionStore } from '@/store/index.js';

export default defineComponent({
	setup() {
		const state = reactive({
			messages: [],
			inputText: '',
			scrollTop: 9999,
			chatInfo: {}, // 联系人信息
			loading: false,
			index: 0,
			expressionList: []
		});

		const constants = {
			faceList,
			messageType,
			tabs
		};

		const components = {
			popupRef: ref(null)
		};

		const methods = {
			getExpressionData() {
				getExpressionStore
					.get({
						userId: uni.getStorageSync('userInfo').id
					})
					.then(res => {
						const data = res.data;
						state.expressionList = data?.data;
					});
			},
			sendMessage() {
				const userInfo = uni.getStorageSync('userInfo');
				if (state.inputText.trim()) {
					const message = createMessage(
						userInfo.id,
						state.chatInfo.id,
						state.inputText,
						userInfo,
						true,
						messageType.text
					);
					sendPrivateMessage(message.id, state.chatInfo.id, state.inputText, userInfo, messageType.text);

					// 更新本地存储
					const messages = uni.getStorageSync('messages') || {};
					messages[message.createTime] = message;
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
			onChangeTabs(item) {
				state.index = item.index;
			},
			// 打开表情包弹窗
			openFace() {
				components.popupRef.value.open();
			},
			// 发送表情包
			onSendExpression(url) {
				const userInfo = uni.getStorageSync('userInfo');
				// 创建一个新的表情包消息
				const message = createMessage(
					userInfo.id,
					state.chatInfo.id,
					url, // 表情包的链接地址
					userInfo,
					false,
					messageType.image // 假设有一个专门用于表情包的消息类型
				);
				// 通过 WebSocket 或者其他方式发送私信
				sendPrivateMessage(message.id, state.chatInfo.id, url, userInfo, messageType.image);

				// 更新本地存储
				const messages = uni.getStorageSync('messages') || {};
				messages[message.createTime] = message;
				uni.setStorageSync('messages', messages);

				// 更新显示的消息
				state.messages = Object.values(messages).sort((a, b) => a.createTime - b.createTime);
				state.messages = methods.dateGroup(state.messages); // 按日期分组

				components.popupRef.value.close();
				state.index = 0;
				// 滚动到底部
				nextTick(() => {
					state.scrollTop += 1;
				});
			},
			// 发送图片
			onChooseImage() {
				const userInfo = uni.getStorageSync('userInfo');
				uni.chooseImage({
					count: 1,
					success(info) {
						const filePath = info.tempFilePaths[0];
						const message = createMessage(
							userInfo.id,
							state.chatInfo.id,
							filePath,
							userInfo,
							true,
							messageType.image
						);
						state.messages.push(message);
						postUploadImagesStore.uploadFile(filePath, 'file', { id: message.id }).then(res => {
							const data = JSON.parse(res.data);

							const message = createMessage(
								userInfo.id,
								state.chatInfo.id,
								data.url,
								userInfo,
								false,
								messageType.image
							);

							sendPrivateMessage(message.id, state.chatInfo.id, data.url, userInfo, messageType.image);
							// 更新本地存储
							const messages = uni.getStorageSync('messages') || {};
							messages[message.createTime] = message;
							uni.setStorageSync('messages', messages);
							// 更新显示的消息
							state.messages = Object.values(messages).sort((a, b) => a.createTime - b.createTime);

							state.messages = state.messages.map(item => {
								if (item?.id === data.id) {
									return {
										...item,
										loading: false
									};
								}
								return item;
							});
							state.messages = methods.dateGroup(state.messages);
							state.inputText = '';
							nextTick(() => {
								state.scrollTop += 1;
							});
							console.log(state.messages);
						});
					}
				});
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
			// 图片预览
			onPreviewImage(url) {
				uni.previewImage({
					urls: [url]
				});
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
			// 将消息变成已读
			readMessage() {
				const messages = uni.getStorageSync('messages') || {};

				Object.values(messages).forEach(item => {
					item.isView = true;
				});

				uni.setStorageSync('messages', messages);
			},
			goBack() {
				uni.navigateBack();
			}
		};

		onLoad(options => {
			state.loading = true;
			const userId = options.userId;
			getUserInfoStore
				.get({
					userId
				})
				.then(res => {
					methods.readMessage();
					state.chatInfo = res.data.info[0];

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
			methods.getExpressionData();
		});

		// 监听发送过来的消息
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
