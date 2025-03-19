import { defineComponent, reactive, toRefs, ref } from 'vue';
import { getUserInfoStore } from '@/store/index.js';
import ModalAddTagComp from './comps/modal-add-tag/index.vue'

export default defineComponent({
	components: {
		ModalAddTagComp
	},
	setup() {
		const state = reactive({
            loading: false,
			formState: {
				userInfo: {
                    avatar: null,
					name: null,
					signature: null,
					tags: null
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
		}

		const methods = {
			getData() {
                state.loading = true
				const userId = uni.getStorageSync('userInfo').id;

				getUserInfoStore.get({ userId }).then(res => {
					const userInfo = res.data.info[0];
					
                    const tags = userInfo.tags?.map(item=>{
                        return {
                            show: true,
                            title: item
                        }
                    })
                    state.formState.userInfo.name = userInfo.name
                    state.formState.userInfo.avatar = userInfo.avatar
                    state.formState.userInfo.signature = userInfo.signature
                    state.formState.userInfo.tags = tags
				}).finally(()=>{
                    state.loading = false
                })
			},
			// 添加标签
			onAddTag(){
				components.modalAddTagRef.value.open()
			},
			// 删除标签
            closeTag(index){
                state.formState.userInfo.tags.splice(index, 1)
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
