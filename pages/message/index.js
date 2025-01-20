import { defineComponent, reactive, toRefs } from 'vue';
import NavbarComp from '@/components/navbar/index.vue';
import { getContactsStore } from '@/store/index.js';

export default defineComponent({
	components: {
		NavbarComp
	},
	setup() {
		const state = reactive({
			messageList: []
		});

		const methods = {
			formateMessages(arr, message) {
				const index = arr.findIndex(item => {
					if (item.senderId === message.senderId || item.senderId === message.receiverId) {
						return true;
					}
				});
				if (index !== -1) {
					arr[index] = message;
				} else {
					arr.push(message);
				}

				return arr;
			},
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
						const contacts = res.data.contacts
						const messages = uni.getStorageSync('messages');
						const arr = []
						Object.keys(messages).forEach(key => {
							methods.formateMessages(arr, messages[key]);
						});

						console.log(arr)
						console.log(contacts)

						arr.forEach(messageItem=>{
							contacts.forEach(contact=>{
								if(messageItem.receiverId === contact.contactUserId || messageItem.senderId === contact.contactUserId){
									state.messageList.push({
										...contact,
										content: messageItem.content
									})
								}
							})
						})

						console.log(state.messageList)
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

		methods.getContactsData()

		return {
			...toRefs(state)
		};
	}
});
