import { defineComponent, reactive, toRefs, ref } from 'vue';
import NavbarComp from '@/components/navbar/index.vue';
import { getContactsStore } from '@/store/index.js';
import { onPullDownRefresh } from '@dcloudio/uni-app'

export default defineComponent({
	components: {
		NavbarComp
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
			classifyContactsData: null // 分类的联系人数据
		});

		const components = {
			toastRef: ref(null),
			collapseRef: ref(null),
		};

		const methods = {
			onChangeTabs(value) {
				state.tabsIndex = value.index;
			},
			// 跳转到新朋友页面
			onJumpNew(){
				uni.navigateTo({
					url: '/sub-pages/new-contacts/index'
				})
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
						state.classifyContactsData = res.data.classifyContacts
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
                        uni.stopPullDownRefresh()
						components.collapseRef.value.init()
					});
			}
		};

        onPullDownRefresh(()=>{
            methods.getContactsData()
        })

		methods.getContactsData()
	
		return {
			...components,
			...methods,
			...toRefs(state)
		};
	}
});
