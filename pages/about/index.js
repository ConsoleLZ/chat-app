import { defineComponent } from 'vue';
import UserDetailComp from '@/components/user-detail/index.vue'

export default defineComponent({
	components: {
		UserDetailComp
	},
	setup() {
		const userInfo = uni.getStorageSync('userInfo')
		const methods = {
			// 退出登录
			onQuit(){
				uni.removeStorageSync('userInfo')
				uni.redirectTo({ url: '/pages/login/index' })
			}
		};

		return {
			userInfo,
			...methods
		};
	}
});
