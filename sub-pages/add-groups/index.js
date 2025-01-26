import { defineComponent, toRefs, reactive, ref } from 'vue';
import { getContactsStore } from '@/store/index.js';
import { onShow } from '@dcloudio/uni-app';
import CollapseDataComp from './comps/collapse-data/index.vue';

export default defineComponent({
	components: {
		CollapseDataComp
	},
	setup() {
		const state = reactive({
			searchValue: '',
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
			classifyContactsData: null,
			checkedValue: [],
			formState: {
				groupName: null
			},
			rules: {
				groupName: {
					type: 'string',
					required: true,
					message: '请填写群聊名称',
					trigger: ['change']
				}
			}
		});

		const components = {
			collapseRef: ref(null),
			modalRef: ref(null),
			fromRef: ref(null)
		};

		const methods = {
			// 获取联系人数据
			getContactsData() {
				uni.showLoading({
					title: '加载中'
				});
				const userInfo = uni.getStorageSync('userInfo');
				getContactsStore
					.get({
						userId: userInfo.id
					})
					.then(res => {
						state.classifyContactsData = res.data.classifyContacts;
					})
					.catch(() => {
						components.toastRef.value.show({
							type: 'error',
							title: '提示',
							message: '服务器错误'
						});
					})
					.finally(() => {
						uni.hideLoading();
						uni.stopPullDownRefresh();
						components.collapseRef.value.init();
					});
			},
			async onConfirm() {
				await components.fromRef.value.validate();
				console.log(state.formState.groupName);
			},
			onCreate() {
				state.formState.groupName = null;
				components.modalRef.value.open();
			},
			// 清空列表
			onClear() {
				state.searchValue = '';
				state.users = null;
			},
			// 返回
			onBack() {
				uni.navigateBack({ delta: 1 });
			}
		};

		onShow(() => {
			methods.getContactsData();
		});

		return {
			...toRefs(state),
			...methods,
			...components
		};
	}
});
