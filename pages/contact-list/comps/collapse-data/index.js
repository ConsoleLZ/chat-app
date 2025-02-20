import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		data: {
			type: Array,
			default: []
		},
		// 两种模式，0：列表展示在线状态 1：不展示状态
		mode: {
			type: Number,
			default: 0
		}
	},
	setup() {
		const methods = {
			// 跳转到用户详情页
			onJumpUserDetail(userInfo) {
				uni.navigateTo({
					url: `/sub-pages/user-detail/index?userInfo=${JSON.stringify(userInfo)}`
				});
			}
		};

		return {
			...methods
		};
	}
});
