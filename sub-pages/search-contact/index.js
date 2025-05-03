import { defineComponent, ref, reactive, toRefs } from 'vue';
import {
	getSearchUsersStore,
	getContactsStore,
	postApplicationStore,
	getSearchGroupsStore,
	postApplicationGroupStore
} from '@/store/index.js';
import ToastComp from '@/components/toast/index.vue';

export default defineComponent({
	components: {
		ToastComp
	},
	setup() {
		const state = reactive({
			searchValue: '',
			users: null, // 搜索到的用户
			contactUserIdList: [], // 已经添加的联系人id
			userId: null, // 登录用户的id
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
			groups: null // 搜索到的群聊
		});
		const components = {
			toastRef: ref(null)
		};

		const methods = {
			// 申请添加为联系人
			onApplicationAdd(contactUserId) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				const userInfo = uni.getStorageSync('userInfo');
				postApplicationStore
					.post({
						contactUserId,
						userId: userInfo.id,
						name: userInfo.name,
						avatar: userInfo.avatar
					})
					.then(res => {
						const ok = res.data.ok;
						if (ok) {
							components.toastRef.value.show({
								type: 'success',
								message: '申请成功'
							});
						} else {
							components.toastRef.value.show({
								type: 'warning',
								message: res.data.message
							});
						}
					})
					.catch(() => {
						components.toastRef.value.show({
							type: 'error',
							message: '服务器错误'
						});
					})
					.finally(() => {
						uni.hideLoading();
					});
			},
			// 搜索用户
			onConfirmSearch() {
				if (state.searchValue === '') {
					return;
				}
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				const userInfo = uni.getStorageSync('userInfo');
				state.userId = userInfo.id;
				const promiseUsers = getSearchUsersStore.get({
					searchValue: state.searchValue
				});
				const promiseContacts = getContactsStore.get({
					userId: userInfo.id
				});

				const promiseGroups = getSearchGroupsStore.get({
					searchValue: state.searchValue
				});

				Promise.all([promiseUsers, promiseContacts, promiseGroups])
					.then(res => {
						const contacts = res[1].data.contacts;
						state.users = res[0].data?.users;
						state.groups = res[2].data?.data;
						console.log(state.groups);
						contacts &&
							contacts.forEach(item => {
								state.contactUserIdList.push(item.contactUserId);
							});
					})
					.catch(err => {
						console.log(err);
						components.toastRef.value.show({
							type: 'error',
							message: '服务器错误'
						});
					})
					.finally(() => {
						uni.hideLoading();
					});
			},
			// 申请进群
			onApplicationGroup(id) {
				const userInfo = uni.getStorageSync('userInfo');
				const postData = {
					userId: userInfo.id,
					groupId: id,
					name: userInfo.name,
					avatar: userInfo.avatar
				};
				postApplicationGroupStore
					.post(postData)
					.then(res => {
						const data = res.data;
						if (data.ok) {
							components.toastRef.value.show({
								type: 'success',
								message: '申请成功'
							});
						} else {
							components.toastRef.value.show({
								type: 'error',
								message: '申请失败'
							});
						}
					})
					.catch(() => {
						components.toastRef.value.show({
							type: 'error',
							message: '服务器错误'
						});
					});
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

		return {
			...toRefs(state),
			...methods,
			...components
		};
	}
});
