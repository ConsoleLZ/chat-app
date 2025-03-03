import { defineComponent, reactive, toRefs } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import UserDetailComp from '@/components/user-detail/index.vue';
import {getUserInfoStore} from '@/store/index.js'

export default defineComponent({
	components: {
		UserDetailComp
	},
	setup() {
		const state = reactive({
			userId: null
		});

		const methods = {
			// 跳转到聊天页
			onJumpChat() {
				uni.navigateTo({
					url: `/sub-pages/chat-message/index?userId=${state.userInfo.id}`
				});
			}
		};

		onLoad(options => {
			state.userId = options.userId
		});

		return {
			...toRefs(state),
			...methods
		};
	}
});
