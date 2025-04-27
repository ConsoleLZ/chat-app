import { defineComponent, reactive, toRefs } from 'vue';
import { postUploadImagesStore, postAddExpressionStore, getExpressionStore } from '@/store/index';

export default defineComponent({
	setup() {
		const state = reactive({
			imgList: []
		});

		const methods = {
			getData() {
				getExpressionStore
					.get({
						userId: uni.getStorageSync('userInfo').id
					})
					.then(res => {
						const data = res.data;
						state.imgList = data?.data
                        console.log(state.imgList)
					});
			},
			async afterRead(e) {
				const fileList = e.file;
				try {
					uni.showLoading({
						title: '上传中...',
						mask: true
					});
					fileList.forEach(async item => {
						const res = await postUploadImagesStore.uploadFile(item.url, 'file');
						const url = JSON.parse(res.data).url;
						await postAddExpressionStore.post({
							userId: uni.getStorageSync('userInfo').id,
							url
						});
					});
					uni.showToast({
						title: '上传成功',
						icon: 'success'
					});
					uni.hideLoading();

                    setTimeout(()=>{
                        methods.getData()
                    }, 1000)
				} catch (error) {
					uni.showToast({
						title: '上传出错了',
						icon: 'error'
					});
				}
			}
		};

        methods.getData()
		return {
			...toRefs(state),
			...methods
		};
	}
});
