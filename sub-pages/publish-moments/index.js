import { defineComponent, reactive, toRefs } from 'vue';
import { postAddMomentStore, postUploadImagesStore } from '@/store/index';

export default defineComponent({
	setup() {
		const state = reactive({
			content: null,
			fileList: []
		});

		const methods = {
			afterRead(e) {
				const fileList = e.file.map(item => {
					return {
						...item,
						status: 'uploading',
						message: '上传中'
					};
				});
				fileList.forEach(item => {
					state.fileList.push(item);
				});

				postUploadImagesStore.uploadFile(undefined, undefined, {}, fileList).then(res=>{
					const data = res.data;
					console.log(data);
				})
			},
			onPublish() {
				if (!state.content) {
					uni.showToast({
						title: '请输入内容',
						icon: 'error'
					});
					return;
				}
				const userId = uni.getStorageSync('userInfo').id;
				const postData = {
					userId,
					content: state.content,
					imgList: state.fileList
				};

				postAddMomentStore.post(postData).then(res => {
					const data = res.data;
					if (data.ok) {
						uni.showToast({
							title: '发布成功'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						uni.showToast({
							title: '发布失败',
							icon: 'error'
						});
					}
				});
			}
		};

		return {
			...toRefs(state),
			...methods
		};
	}
});
