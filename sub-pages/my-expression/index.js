import { defineComponent, reactive, toRefs } from 'vue';
import { postUploadImagesStore, postAddExpressionStore } from '@/store/index';

export default defineComponent({
	setup() {
		const state = reactive({});

		const methods = {
			async afterRead(e) {
				const fileList = e.file;
				try {
                    uni.showLoading({
                        title: '上传中...',
                        mask: true
                    })
					fileList.forEach(async (item) => {
						const res =  await postUploadImagesStore.uploadFile(item.url, 'file');
                        const url = JSON.parse(res.data).url
                        await postAddExpressionStore.post({
                            userId: uni.getStorageSync('userInfo').id,
                            url
                        })
					});
                    uni.showToast({
                        title: '上传成功',
                        icon: 'success'
                    });
                    uni.hideLoading()
				} catch (error) {
					uni.showToast({
                        title: '上传出错了',
                        icon: 'error'
                    });
				}
			}
		};

		return {
			...toRefs(state),
			...methods
		};
	}
});
