import { defineComponent, ref, reactive, toRefs } from 'vue';
import { getSearchUsersStore, getContactsStore } from '@/store/index.js';

export default defineComponent({
	setup() {
        const state = reactive({
            searchValue: '',
            users: null
        })
		const components = {
			toastRef: ref(null)
		};

		const methods = {
			// 搜索用户
			onConfirmSearch() {
                if(state.searchValue === ''){
                    return
                }
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				const userInfo = uni.getStorageSync('userInfo');
				const promiseUsers = getSearchUsersStore.get({
					searchValue: state.searchValue
				});
				const promiseContacts = getContactsStore.get({
					userId: userInfo.id
				});

				Promise.all([promiseUsers, promiseContacts])
					.then(res => {
                        state.users = res[0].data?.users
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

		return {
            ...toRefs(state),
			...methods,
			...components
		};
	}
});
