import { defineComponent, reactive, toRefs, ref } from 'vue';
import UserDetailComp from './comps/user-detail/index.vue';
import {jump} from '@/utils/utils.js'

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
			userInfo: uni.getStorageSync('userInfo'),
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight
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
			// 打开用户详情信息
			onOpenPopup() {
				components.popupRef.value.open();
			}
		};

		return {
			jump,
			...methods,
			...toRefs(state),
			...components
		};
	}
});
