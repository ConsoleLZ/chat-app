import { defineComponent, reactive, toRefs, nextTick } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			messages: [
				{
					content: '你好！',
					isMe: false,
					avatar: '/static/logo.svg'
				},
				{
					content: '你好，有什么可以帮您？',
					isMe: true,
					avatar: '/static/logo.svg'
				},
        {
					content: '你好！',
					isMe: false,
					avatar: '/static/logo.svg'
				},
				{
					content: '你好，有什么可以帮您？',
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
            console.log('滚动')
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
