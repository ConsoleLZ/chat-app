import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const methods = {
			// 退出登录
			onQuit() {
				uni.removeStorageSync('token');
				uni.redirectTo({ url: '/pages/login/index' });
			}
		};

		return {
			...methods
		};
	}
});
