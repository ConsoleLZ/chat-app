import { defineComponent, ref, reactive, toRefs } from 'vue';
import { getSearchUsersStore, getContactsStore } from '@/store/index.js';

export default defineComponent({
	setup() {
        const state = reactive({
            searchValue: '',
            users: null, // 搜索到的用户
            contactUserIdList: [], // 已经添加的联系人id
            userId: null // 登录用户的id
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
                state.userId = userInfo.id
				const promiseUsers = getSearchUsersStore.get({
					searchValue: state.searchValue
				});
				const promiseContacts = getContactsStore.get({
					userId: userInfo.id
				});

				Promise.all([promiseUsers, promiseContacts])
					.then(res => {
                        const contacts = res[1].data.contacts
                        state.users = res[0].data?.users
                        contacts.forEach(item=>{
                            state.contactUserIdList.push(item.contactUserId)
                        })
                        console.log(state.contactUserIdList)
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
