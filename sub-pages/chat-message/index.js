import { defineComponent, reactive, toRefs, nextTick } from 'vue';

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

		const methods = {
			sendMessage() {
				if (state.inputText.trim()) {
					state.messages.push({
						content: state.inputText,
						isMe: true,
						avatar: '/static/logo.svg'
					});
					state.inputText = '';
					nextTick(() => {
						state.scrollTop += 1
					});
				}
			},
			goBack() {
				uni.navigateBack();
			}
		};

		return {
			...toRefs(state),
			...methods
		};
	}
});
