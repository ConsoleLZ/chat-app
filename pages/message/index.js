import { defineComponent, reactive, toRefs, computed } from 'vue';
import NavbarComp from '@/components/navbar/index.vue';
import { getContactsStore } from '@/store/index.js';
import { onShow } from '@dcloudio/uni-app';

export default defineComponent({
	components: {
		NavbarComp
	},
	setup() {
		const state = reactive({
			messageList: []
		});

		// 计算每个联系人的未读消息数量
		const unreadCounts = computed(() => {
			const counts = {};
			const messages = uni.getStorageSync('messages') || {};
			
			Object.values(messages).forEach(message => {
				if (!message.isView && message.receiverId === state.currentUserId) {
					const contactId = message.senderId;
					counts[contactId] = (counts[contactId] || 0) + 1;
				}
			});
			
			return counts;
		});

		const methods = {
			// 跳转到聊天页
			onJumpChat(item){
				uni.navigateTo({
					url: `/sub-pages/chat-message/index?userInfo=${JSON.stringify(item)}`
				});
			},

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
				state.currentUserId = userInfo.id;
				
				getContactsStore
					.get({
						userId: userInfo.id
					})
					.then(res => {
						const contacts = res.data.contacts;
						const messages = uni.getStorageSync('messages') || {};
						const arr = [];
						
						Object.keys(messages).forEach(key => {
							methods.formateMessages(arr, messages[key]);
						});

						arr.forEach(messageItem => {
							contacts.forEach(contact => {
								if(messageItem.receiverId === contact.contactUserId || 
								   messageItem.senderId === contact.contactUserId) {
									state.messageList.push({
										...contact,
										content: messageItem.content,
										unreadCount: unreadCounts.value[contact.contactUserId] || 0
									});
								}
							});
						});
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

		onShow(()=>{
			state.messageList = []
			methods.getContactsData();
		})

		return {
			...toRefs(state),
			...methods,
			unreadCounts
		};
	}
});
