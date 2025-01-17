import { defineComponent, reactive, toRefs, nextTick, ref } from 'vue';
import { faceList } from './constants';
import { sendPrivateMessage, listenPrivateMessage } from '@/utils/socketService';
import { onLoad } from '@dcloudio/uni-app';

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
				const userInfo = uni.getStorageSync('userInfo')
				if (state.inputText.trim()) {
					sendPrivateMessage(state.chatInfo.contactUserId, state.inputText)
					state.messages.push({
						content: state.inputText,
						isMe: true,
						avatar: userInfo.avatar,
						name: userInfo.name
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
		listenPrivateMessage(({message, name})=>{
			state.messages.push({
				content: message,
				isMe: false,
				avatar: state.chatInfo.avatar,
				name
			});
		})

		onLoad((options)=>{
            state.chatInfo = JSON.parse(options.userInfo)
        })

		return {
			...toRefs(state),
			...methods,
			...components,
			...constants
		};
	}
});
