import { defineComponent, reactive, toRefs } from 'vue';
import NavbarComp from '@/components/navbar/index.vue';
import { getContactsStore, getGroupsStore } from '@/store/index.js';
import { onShow } from '@dcloudio/uni-app';

export default defineComponent({
	components: {
		NavbarComp
	},
	setup() {
		const state = reactive({
			messageList: [], // 单聊消息
			messageGroupList: [], //群聊消息
			contacts: null,
			groups: null,
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight
		});

		const methods = {
			// 跳转到聊天页
			onJumpChat(item) {
				uni.navigateTo({
					url: `/sub-pages/chat-message/index?userId=${item.contactUserId}`
				});
			},

			formateMessages(arr, message) {
				const index = arr.findIndex(item => {
					if (
						(message.senderId === item.senderId && message.receiverId === item.receiverId) ||
						(message.senderId === item.receiverId && message.receiverId === item.senderId)
					) {
						return true;
					} else {
						return false;
					}
				});
				if (index !== -1) {
					arr[index] = message;
				} else {
					arr.push(message);
				}

				return arr;
			},
			// 单聊消息回显
			setMessageList() {
				const userInfo = uni.getStorageSync('userInfo');
				const currentUserId = userInfo.id;

				// 计算未读消息数量
				const counts = {};
				const messages = uni.getStorageSync('messages') || {};

				Object.values(messages)?.forEach(message => {
					if (!message.isView && message.receiverId === currentUserId) {
						const contactId = message.senderId;
						counts[contactId] = (counts[contactId] || 0) + 1;
					}
				});

				const arr = [];

				Object.keys(messages)?.forEach(key => {
					methods.formateMessages(arr, messages[key]);
				});

				arr.forEach(messageItem => {
					state.contacts?.forEach(contact => {
						if (
							messageItem.receiverId === contact.contactUserId ||
							messageItem.senderId === contact.contactUserId
						) {
							state.messageList.push({
								...contact,
								content: messageItem.content,
								createTime: messageItem.createTime,
								unreadCount: counts[contact.contactUserId] || 0
							});
						}
					});
				});
			},
			// 群聊消息回显
			setMessageGroupList() {
				const groupMap = {}; // 用于存储每个 groupId 对应的最早消息
				const groupMessages = uni.getStorageSync('groupMessages') || [];
				groupMessages.forEach(message => {
					const { groupId, createTime } = message;
					// 如果当前 groupId 不存在，或当前消息时间更早，则更新
					if (!groupMap[groupId] || createTime > groupMap[groupId].createTime) {
						const groupInfo = state.groups.find(item => item.groupId === message.groupId);
						message.avatar = groupInfo.avatar;
						message.name = groupInfo.groupName;
						groupMap[groupId] = message;
					}
				});

				state.messageGroupList = Object.values(groupMap);
				console.log(Object.values(groupMap));
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
					.catch(error => {})
					.finally(() => {
						uni.hideLoading();
					});
			},
			// 获取群聊数据
			getGroupsData() {
				const userInfo = uni.getStorageSync('userInfo');
				getGroupsStore
					.get({
						userId: userInfo.id
					})
					.then(res => {
						state.groups = res.data?.data || [];
						methods.setMessageGroupList();
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
			methods.getGroupsData();
		});

		return {
			...toRefs(state),
			...methods
		};
	}
});
