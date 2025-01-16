import { defineComponent, reactive, toRefs, nextTick, ref } from 'vue';
import { faceList } from './constants';
import { getSocket } from '@/utils/socketService';

export default defineComponent({
	setup() {
		const state = reactive({
			messages: [],
			inputText: '',
			scrollTop: 9999
		});

		const constants = {
			faceList
		};

		const components = {
			popupRef: ref(null)
		};

		const methods = {
			sendMessage() {
				const userInfo = uni.getStorageSync('userInfo')
				if (state.inputText.trim()) {
					getSocket().emit('chat message', state.inputText);
					state.messages.push({
						content: state.inputText,
						isMe: true,
						avatar: userInfo.avatar
					});
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
		getSocket().on('chat message', data => {
			state.messages.push({
				content: data,
				isMe: false,
				avatar: '/static/logo.svg'
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
