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
			messageList: [],
			contacts: null
		});

		const methods = {
			// 跳转到聊天页
			onJumpChat(item) {
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

			setMessageList() {
				const userInfo = uni.getStorageSync('userInfo');
				const currentUserId = userInfo.id;

				// 计算未读消息数量
				const counts = {};
				const messages = uni.getStorageSync('messages') || {};

				Object.values(messages).forEach(message => {
					if (!message.isView && message.receiverId === currentUserId) {
						const contactId = message.senderId;
						counts[contactId] = (counts[contactId] || 0) + 1;
					}
				});

				const arr = [];

				Object.keys(messages).forEach(key => {
					methods.formateMessages(arr, messages[key]);
				});

				arr.forEach(messageItem => {
					state.contacts.forEach(contact => {
						if (
							messageItem.receiverId === contact.contactUserId ||
							messageItem.senderId === contact.contactUserId
						) {
							state.messageList.push({
								...contact,
								content: messageItem.content,
								unreadCount: counts[contact.contactUserId] || 0
							});
						}
					});
				});
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
						state.contacts = res.data?.contacts;
						methods.setMessageList();
					})
					.catch(error => {
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

		// 监听私聊消息
		uni.$on('privateMessage', data => {
			state.messageList = [];
			const messages = uni.getStorageSync('messages') || {};
			messages[data.createTime] = data;
			uni.setStorageSync('messages', messages);

			methods.setMessageList();
		});

		onShow(() => {
			// 清空并重新获取数据
			state.messageList = [];
			methods.getContactsData();
		});

		return {
			...toRefs(state),
			...methods
		};
	}
});
