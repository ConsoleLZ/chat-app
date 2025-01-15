import {
	defineComponent,
	reactive,
	ref,
	toRefs
} from 'vue'
import {
	getApplicationStore
} from '@/store/index.js'
import { onShow } from '@dcloudio/uni-app'

export default defineComponent({
	setup() {
		const state = reactive({
			dataList: null
		})

		const components = {
			toastRef: ref(null)
		};

		const methods = {
			// 获取数据
			getData() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				getApplicationStore.get({
					contactUserId: uni.getStorageSync('userInfo').id
				}).then(res => {
					state.dataList = res.data.users
				}).catch(() => {
					components.toastRef.value.show({
						type: 'error',
						title: '提示',
						message: '服务器错误'
					});
				}).finally(()=>{
					uni.hideLoading()
				})
			}
		}
		
		onShow(()=>{
			methods.getData()
		})
		
		return {
			...toRefs(state),
			...methods
		}
	}
})