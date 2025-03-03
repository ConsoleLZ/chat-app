import { defineComponent } from 'vue';
import UserDetailComp from '@/components/user-detail/index.vue';
import { disconnectSocket } from '@/utils/socketService.js';
import { jump } from '@/utils/utils.js';

export default defineComponent({
	components: {
		UserDetailComp
	},
	setup() {
		const userInfo = uni.getStorageSync('userInfo');
		const methods = {
			// 退出登录
			onQuit() {
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('token');
				uni.removeStorageSync('messages');
				disconnectSocket();
				uni.redirectTo({ url: '/pages/login/index' });
			},
			// 跳转到我的信息页
			onJumpSet(){
				jump('/sub-pages/set-user-info/index')
			}
		};

		return {
			jump,
			userInfo,
			...methods
		};
	}
});
