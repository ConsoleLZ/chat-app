import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		data: {
			type: Array,
			default: []
		},
		// 两种模式，0：联系人列表 1：群聊列表
		mode: {
			type: Number,
			default: 0
		}
	},
	setup(props) {
		const methods = {
			onJump(data) {
				console.log(data)
				if (props.mode === 0) {
					// 跳转到用户详情
					// uni.navigateTo({
					// 	url: `/sub-pages/user-detail/index`
					// });
				}
			}
		};

		return {
			...methods
		};
	}
});
