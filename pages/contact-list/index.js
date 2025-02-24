import { defineComponent, reactive, toRefs, ref } from 'vue';
import NavbarComp from '@/components/navbar/index.vue';
import { getContactsStore, getGroupsStore } from '@/store/index.js';
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app';
import CollapseDataComp from './comps/collapse-data/index.vue';
import ToastComp from '@/components/toast/index.vue';

export default defineComponent({
	components: {
		NavbarComp,
		CollapseDataComp,
		ToastComp
	},
	setup() {
		const state = reactive({
			tabsIndex: 0, // tabs的索引
			tabList: [
				{
					name: '分类'
				},
				{
					name: '群聊'
				}
			],
			classifyContactsData: null, // 分类的联系人数据
			groupsData: null, // 群聊数据
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight
		});

		const components = {
			toastRef: ref(null),
			collapseRef: ref(null)
		};

		const methods = {
			onChangeTabs(value) {
				state.tabsIndex = value.index;
			},
			// 跳转到新朋友页面
			onJumpNew() {
				uni.navigateTo({
					url: '/sub-pages/new-contacts/index'
				});
			},
			// 获取数据
			getData() {
				uni.showLoading({
					title: '加载中'
				});
				const userInfo = uni.getStorageSync('userInfo');

				const promiseContacts = getContactsStore.get({
					userId: userInfo.id
				});
				const promiseGroups = getGroupsStore.get({
					userId: userInfo.id
				}); 

				Promise.all([promiseContacts, promiseGroups])
					.then(res => {
						const contactsData = res[0].data;
						const groupsData = res[1].data;

						state.groupsData = groupsData.data?.map(item=>{
							return {
								id: item.groupId,
								name: item.groupName,
								avatar: item.groupAvatar,
								memberIds: item.memberIds,
								ownerId: item.ownerId,
							}
						})
						state.classifyContactsData = contactsData.classifyContacts;
					})
					.catch((error) => {
						console.log(error)
						components.toastRef.value.show({
							type: 'error',
							message: '服务器错误'
						});
					})
					.finally(() => {
						uni.hideLoading();
						uni.stopPullDownRefresh();
						components.collapseRef.value.init();
					});
			}
		};

		onPullDownRefresh(() => {
			methods.getData();
		});

		onShow(() => {
			methods.getData();
		});

		return {
			...components,
			...methods,
			...toRefs(state)
		};
	}
});
