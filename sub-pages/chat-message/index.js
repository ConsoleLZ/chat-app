import { defineComponent, reactive, toRefs, nextTick, ref } from 'vue';
import { faceList } from './constants';
import { sendPrivateMessage, createPrivateMessage, listenPrivateMessage } from '@/utils/socketService';
import { onLoad, onShow } from '@dcloudio/uni-app';

export default defineComponent({
	setup() {
		const state = reactive({
			messages: [],
			inputText: '',
			scrollTop: 9999,
			chatInfo: {} // 联系人信息
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
					const message = createPrivateMessage(
						userInfo.id,
						state.chatInfo.contactUserId,
						state.inputText,
						userInfo
					);
					sendPrivateMessage(state.chatInfo.contactUserId, state.inputText, userInfo);

					// 更新本地存储
					const messages = uni.getStorageSync('messages') || {};
					messages[message.createTime] = {
						...message,
						isMe: true
					};
					uni.setStorageSync('messages', messages);
					// 更新显示的消息
					state.messages = Object.values(messages).sort((a, b) => a.createTime - b.createTime);

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
				Object.keys(messages).forEach(key => {
					if(messages[key].senderId === state.chatInfo.contactUserId){
						messages[key].isView = true;
					}
				});
				uni.setStorageSync('messages', messages);
			},
			// 处理消息发送时间，显示在页面上
			dateGroup(messages){
				const disposeData = JSON.parse(JSON.stringify(messages))
				let beforeDate = disposeData[0].createTime // 记录上一次循环的createTime
				disposeData.forEach((item, index)=>{
					console.log(item.createTime, beforeDate, item.createTime - beforeDate)
					if(item.createTime - beforeDate > 300000){
						disposeData.splice(index, 0, {isDate: true, date: item.createTime, senderId: item.senderId, receiverId: item.receiverId})
					}

					beforeDate = item.createTime
				})
				disposeData.splice(0, 0, {isDate: true, date: disposeData[0].createTime, senderId: disposeData[0].senderId, receiverId: disposeData[0].receiverId})

				return disposeData
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
			state.chatInfo = JSON.parse(options.userInfo);

			// 初始化时加载消息
			const messages = uni.getStorageSync('messages') || {};
			state.messages = Object.values(messages).sort((a, b) => a.createTime - b.createTime);
			state.messages = methods.dateGroup(state.messages)
			console.log(state.messages)
		});

		onShow(() => {
			methods.changeMessageView();
		});

		// 监听发送过来的私聊消息
		uni.$on('privateMessage', function (data) {
			if(data.senderId === state.chatInfo.contactUserId){
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
