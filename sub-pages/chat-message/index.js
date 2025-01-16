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
				},
				{
					content: '哈哈哈哈',
					isMe: true,
					avatar: '/static/logo.svg'
				}
			],
			inputText: ''
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
						uni.pageScrollTo({
							scrollTop: 99999,
							duration: 300
						});
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
