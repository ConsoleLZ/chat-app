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

				state.fileList.forEach(async (item, index) => {
					const result = await postUploadImagesStore.uploadFile(item.url, 'file');
					const data = JSON.parse(result.data);
					state.fileList.splice(
						index,
						1,
						Object.assign(item, {
							status: 'success',
							message: '',
							url: data.url
						})
					);
				});
			},
			onPublish() {
				if (!state.content) {
					uni.showToast({
						title: '请输入内容',
						icon: 'error'
					});
					return;
				}
				const imgList = state.fileList.map(item => item.url);
				console.log(imgList);
				const userId = uni.getStorageSync('userInfo').id;
				const postData = {
					userId,
					content: state.content,
					imgList
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
