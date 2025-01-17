import { defineComponent, reactive, toRefs, nextTick, ref } from 'vue';
import { faceList } from './constants';
import { sendPrivateMessage, createPrivateMessage, listenPrivateMessage } from '@/utils/socketService';
import { onLoad } from '@dcloudio/uni-app';

export default defineComponent({
	setup() {
		const state = reactive({
			messages: uni.getStorageSync('messages') === '' ? [] : uni.getStorageSync('messages'),
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
					const message = createPrivateMessage(userInfo.id, state.chatInfo.contactUserId, state.inputText, userInfo, true)
					sendPrivateMessage(state.chatInfo.contactUserId, state.inputText, userInfo);
					state.messages.push(message);
					uni.setStorageSync('messages', state.messages)
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
			goBack() {
				uni.navigateBack();
			}
		};

		// 监听服务器消息
		listenPrivateMessage(data => {
			state.messages.push(data)
			nextTick(() => {
				state.scrollTop += 1;
			});
		});

		onLoad(options => {
			state.chatInfo = JSON.parse(options.userInfo);
		});

		return {
			...toRefs(state),
			...methods,
			...components,
			...constants
		};
	}
});
