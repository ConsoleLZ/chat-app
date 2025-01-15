import { defineComponent, reactive, ref, toRefs } from 'vue';
import { getApplicationStore, postAgreeApplicationStore } from '@/store/index.js';
import { onShow } from '@dcloudio/uni-app';

export default defineComponent({
	setup() {
		const state = reactive({
			dataList: null
		});

		const components = {
			toastRef: ref(null)
		};

		const methods = {
			// 获取数据
			getData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				getApplicationStore
					.get({
						contactUserId: uni.getStorageSync('userInfo').id
					})
					.then(res => {
						state.dataList = res.data.users;
						console.log(state.dataList)
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
					});
			},
			// 同意申请
			onAgree(item) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				const userInfo = uni.getStorageSync('userInfo');
				// 在数据库中增加一条同意方的数据
				const promiseSelf = postAgreeApplicationStore.post({
					contactUserId: item.userId,
					userId: userInfo.id,
					name: item.name,
					avatar: item.avatar,
					isUpdate: false // 是否更新申请表中的字段变为已同意
				});
				// 在数据库中增加一条被同意方的数据
				const promisePassive = postAgreeApplicationStore.post({
					contactUserId: userInfo.id,
					userId: item.userId,
					name: userInfo.name,
					avatar: userInfo.avatar,
					isUpdate: true
				});

				Promise.all([promiseSelf, promisePassive])
					.then(res => {
						console.log(res);
						methods.getData()
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
					});
			}
		};

		onShow(() => {
			methods.getData();
		});

		return {
			...toRefs(state),
			...methods
		};
	}
});
