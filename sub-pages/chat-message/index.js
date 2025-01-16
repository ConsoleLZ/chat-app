import { defineComponent, reactive, toRefs, nextTick, ref } from 'vue';
import { faceList } from './constants';
import {getSocket} from '@/utils/socketService'

export default defineComponent({
	setup() {
		const state = reactive({
			messages: [
				{
					content: '你好，有什么可以帮您？',
					isMe: false,
					avatar: '/static/logo.svg'
				},
				{
					content: '没有',
					isMe: true,
					avatar: '/static/logo.svg'
				},
				{
					content: '好的',
					isMe: false,
					avatar: '/static/logo.svg'
				},
				{
					content: '你是谁？',
					isMe: true,
					avatar: '/static/logo.svg'
				}
			],
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
				if (state.inputText.trim()) {
					getSocket().emit('chat message', state.inputText)
					state.messages.push({
						content: state.inputText,
						isMe: true,
						avatar: '/static/logo.svg'
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
			selectFace(item){
				state.inputText += item
				components.popupRef.value.close();
			},
			goBack() {
				uni.navigateBack();
			}
		};

		return {
			...toRefs(state),
			...methods,
			...components,
			...constants
		};
	}
});
