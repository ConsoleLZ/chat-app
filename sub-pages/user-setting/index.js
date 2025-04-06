import { defineComponent, reactive, toRefs, ref } from 'vue';
import { postDeleteContactStore } from '@/store/index';
import { onLoad } from '@dcloudio/uni-app';

export default defineComponent({
	setup() {
		const state = reactive({
			contactUserId: null
		});

		const components = {
			modalRef: ref(null)
		};

		const methods = {
			onDel() {
				components.modalRef.value.open();
			},
			// 确认删除联系人
			onConfirmDel() {
				const postData = {
					userId: uni.getStorageSync('userInfo').id,
					contactUserId: state.contactUserId
				};
				postDeleteContactStore.post(postData).then(res => {
					const data = res.data;
					if (data.ok) {
						uni.switchTab({
							url: '/pages/contact-list/index'
						});
					} else {
						uni.showToast({
							title: '删除失败',
							icon: 'error'
						});
					}
				});
			}
		};

		onLoad(options => {
			state.contactUserId = options.contactUserId;
		});

		return {
			...toRefs(state),
			...methods,
			...components
		};
	}
});
