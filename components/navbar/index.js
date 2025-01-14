import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
	props: {
		title: {
			type: String,
			default: null
		}
	},
	setup() {
		const state = reactive({
			isShowOverlay: false
		});

		const methods = {
			// 展示遮罩
			async onShowOverlay(){
				await uni.hideTabBar()
				state.isShowOverlay = true
			},
			// 关闭遮罩
			async onCloseOverlay(){
				await uni.showTabBar()
				state.isShowOverlay = false
			},
			// 跳转到搜索联系人页面
			onJumpSearchContact(){
				uni.navigateTo({ url: '/sub-pages/search-contact/index' })
			}
		};

		return {
			...methods,
			...toRefs(state)
		};
	}
});
