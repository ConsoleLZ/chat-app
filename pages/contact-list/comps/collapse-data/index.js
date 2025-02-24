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
				if (props.mode === 0) {
					// 跳转到用户详情
					uni.navigateTo({
						url: `/sub-pages/user-detail/index?userId=${data.contactUserId}`
					});
				}else {
					const info = {
						id: data.id,
						name: data.name,
						memberIds: data.memberIds?.concat([data.ownerId])
					}
					// 跳转到群聊页
					uni.navigateTo({
						url: `/sub-pages/group-chat-message/index?info=${JSON.stringify(info)}`
					});
				}
			}
		};

		return {
			...methods
		};
	}
});
