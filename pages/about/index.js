import { defineComponent } from 'vue';
import UserDetailComp from '@/components/user-detail/index.vue'
import {disconnectSocket} from '@/utils/socketService.js'

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
				uni.removeStorageSync('token')
				disconnectSocket()
				uni.redirectTo({ url: '/pages/login/index' })
			}
		};

		return {
			userInfo,
			...methods
		};
	}
});
