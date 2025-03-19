import { defineComponent, reactive, toRefs, ref } from 'vue';
import { getUserInfoStore, postUpdateUserInfoStore } from '@/store/index.js';
import ModalAddTagComp from './comps/modal-add-tag/index.vue';

export default defineComponent({
	components: {
		ModalAddTagComp
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
			modalAddTagRef: ref(null)
		};

		const methods = {
			getData() {
				state.loading = true;
				const userId = uni.getStorageSync('userInfo').id;
				state.formState.userInfo.userId = userId

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
			onSave(){
				const postData = {
					...state.formState.userInfo,
					tags: JSON.stringify(state.formState.userInfo.tags)
				}
				console.log(postData)
				postUpdateUserInfoStore.post(postData).then(res=>{
					console.log(res)
				})
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
