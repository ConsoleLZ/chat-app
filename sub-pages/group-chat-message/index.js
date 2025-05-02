import { defineComponent, reactive, toRefs, ref, nextTick } from 'vue';
import { faceList, tabs } from '@/sub-pages/chat-message/constants.js';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { sendGroupMessage, createMessage, messageType } from '@/utils/socketService';
import { postUploadImagesStore, getExpressionStore, getAllMembersStore } from '@/store/index.js';

export default defineComponent({
	setup() {
		const state = reactive({
			messages: [],
			inputText: '',
			memberIds: null,
			scrollTop: 9999,
			loading: false,
			title: null,
			groupId: null,
			index: 0,
			expressionList: [],
			groupMembers: []
		});

		const constants = {
			faceList,
			messageType,
			tabs
		};

		const components = {
			popupRef: ref(null),
			popupInfoRef: ref(null)
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
			// 查看群聊相关信息
			onShowInfo(){
				components.popupInfoRef.value.open();
			},
			sendMessage() {
				const userInfo = uni.getStorageSync('userInfo');
				if (state.inputText.trim()) {
					const message = createMessage(
						userInfo.id,
						state.memberIds,
						state.inputText,
						userInfo,
						true,
						messageType.text
					);

					sendGroupMessage(
						message.id,
						state.groupId,
						state.memberIds,
						state.inputText,
						userInfo,
						messageType.text
					);

					const messages = uni.getStorageSync('groupMessages') || [];
					messages.push({
						...message,
						groupId: state.groupId
					});
					state.messages = messages;

					uni.setStorageSync('groupMessages', messages);
					state.inputText = '';

					nextTick(() => {
						state.scrollTop += 1;
					});
				}
			},
			goBack() {
				uni.navigateBack();
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
				const message = createMessage(userInfo.id, state.memberIds, url, userInfo, false, messageType.image);

				sendGroupMessage(message.id, state.groupId, state.memberIds, url, userInfo, messageType.image);

				const messages = uni.getStorageSync('groupMessages') || [];
				messages.push({
					...message,
					groupId: state.groupId
				});
				
				state.messages = messages;

				uni.setStorageSync('groupMessages', messages);

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
							state.memberIds,
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
								state.memberIds,
								data.url,
								userInfo,
								false,
								messageType.image
							);

							sendGroupMessage(
								message.id,
								state.groupId,
								state.memberIds,
								data.url,
								userInfo,
								messageType.image
							);
							// 更新本地存储
							const messages = uni.getStorageSync('groupMessages') || [];
							messages.push({
								...message,
								groupId: state.groupId
							});
							state.messages = messages;

							uni.setStorageSync('groupMessages', messages);
							state.inputText = '';

							state.messages = state.messages.map(item => {
								if (item?.id === data.id) {
									return {
										...item,
										loading: false
									};
								}
								return item;
							});
							nextTick(() => {
								state.scrollTop += 1;
							});
						});
					}
				});
			},
			// 选择表情
			selectFace(item) {
				state.inputText += item;
				components.popupRef.value.close();
			}
		};

		onLoad(async (options) => {
			const info = JSON.parse(options.info);
			state.groupId = info.id;
			const res = await getAllMembersStore.get({groupId: info.id})
			state.groupMembers = res.data?.data
			console.log(state.groupMembers)
			const memberIds = res.data?.data?.map(item=>item.userId)
			state.title = `${info.name}(${memberIds.length})`;
			
			state.memberIds = memberIds;

			// 初始化加载消息
			const messages = uni.getStorageSync('groupMessages') || [];
			state.messages = messages;
		});

		onShow(() => {
			methods.getExpressionData();
		});

		// 监听发送过来的消息
		uni.$on('groupMessage', function (data) {
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
