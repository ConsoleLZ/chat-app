import { defineComponent, reactive, toRefs, ref } from 'vue';
import UserDetailComp from './comps/user-detail/index.vue';

export default defineComponent({
	components: {
		UserDetailComp
	},
	props: {
		title: {
			type: String,
			default: null
		}
	},
	setup() {
		const state = reactive({
			isShowOverlay: false,
			userInfo: uni.getStorageSync('userInfo')
		});

		const components = {
			popupRef: ref(null)
		};

		const methods = {
			// 展示遮罩
			async onShowOverlay() {
				await uni.hideTabBar();
				state.isShowOverlay = true;
			},
			// 关闭遮罩
			async onCloseOverlay() {
				await uni.showTabBar();
				state.isShowOverlay = false;
			},
			// 跳转到搜索联系人页面
			onJumpSearchContact() {
				setTimeout(() => {
					uni.navigateTo({ url: '/sub-pages/search-contact/index' });
				}, 150);
			},
			// 打开用户详情信息
			onOpenPopup() {
				components.popupRef.value.open();
			}
		};

		return {
			...methods,
			...toRefs(state),
			...components
		};
	}
});
