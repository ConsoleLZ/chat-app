import { defineComponent, reactive, toRefs, ref } from 'vue';
import { getUserInfoStore, postUpdateUserInfoStore, postUploadImagesStore } from '@/store/index.js';
import ModalAddTagComp from './comps/modal-add-tag/index.vue';
import ToastComp from '@/components/toast/index.vue';

export default defineComponent({
	components: {
		ModalAddTagComp,
		ToastComp
	},
	setup() {
		const state = reactive({
			loading: false,
			formState: {
				userInfo: {
					userId: null,
					avatar: null,
					name: null,
					signature: null,
					tags: []
				}
			},
			isSelectAvatar: false,
			rules: {
				'userInfo.name': {
					type: 'string',
					required: true,
					message: '昵称不能为空',
					trigger: ['change']
				}
			}
		});

		const components = {
			modalAddTagRef: ref(null),
			toastRef: ref(null)
		};

		const methods = {
			getData() {
				state.loading = true;
				const userId = uni.getStorageSync('userInfo').id;
				state.formState.userInfo.userId = userId;

				getUserInfoStore
					.get({ userId })
					.then(res => {
						const userInfo = res.data.info[0];

						const tags = userInfo.tags?.map(item => {
							return {
								show: true,
								title: item
							};
						});
						state.formState.userInfo.name = userInfo.name;
						state.formState.userInfo.avatar = userInfo.avatar;
						state.formState.userInfo.signature = userInfo.signature;
						state.formState.userInfo.tags = tags;
					})
					.finally(() => {
						state.loading = false;
					});
			},
			// 选择头像
			onChooseAvatar() {
				uni.chooseImage({
					count: 1,
					success(e) {
						state.isSelectAvatar = true;
						state.formState.userInfo.avatar = e.tempFilePaths[0];
					}
				});
			},
			// 添加标签
			onAddTag() {
				components.modalAddTagRef.value.open();
			},
			// 确认标签
			onConfirmTag(value) {
				state.formState.userInfo.tags.push({
					show: true,
					title: value
				});
			},
			// 删除标签
			closeTag(index) {
				state.formState.userInfo.tags.splice(index, 1);
			},
			// 保存
			async onSave() {
				const postData = {
					...state.formState.userInfo,
					tags: JSON.stringify(state.formState.userInfo.tags)
				};

				try {
					// 如果用户修改了头像，应该先上传头像图片
					if (state.isSelectAvatar) {
						const res = await postUploadImagesStore.uploadFile(postData.avatar, 'file');
						const data = JSON.parse(res.data);
						
						postData.avatar = data.url
					}
					console.log(postData)
					await postUpdateUserInfoStore.post(postData);
					components.toastRef.value.show({
						message: '保存成功',
						type: 'success'
					});
				} catch (error) {
					components.toastRef.value.show({
						message: '保存失败',
						type: 'error'
					});
				}
			}
		};

		methods.getData();

		return {
			...toRefs(state),
			...methods,
			...components
		};
	}
});
