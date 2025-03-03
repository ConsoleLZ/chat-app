import { defineComponent, reactive, toRefs } from 'vue';
import { getUserInfoStore } from '@/store/index.js';

export default defineComponent({
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
                    console.log(tags)
				}).finally(()=>{
                    state.loading = false
                })
			},
            closeTag(index){
                state.formState.userInfo.tags.splice(index, 1)
            }
		};

		methods.getData();

		return {
			...toRefs(state),
            ...methods
		};
	}
});
