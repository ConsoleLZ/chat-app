import { defineComponent, toRefs, reactive, ref } from 'vue';
import { getContactsStore, postCreateGroupStore } from '@/store/index.js';
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
				name: null, // 群聊名称
				ownerId: uni.getStorageSync('userInfo').id // 创建者id
			},
			rules: {
				name: {
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
				postCreateGroupStore.post(state.formState).then(res=>{
					console.log(res)
				})
			},
			onCreate() {
				state.formState.name = null;
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
