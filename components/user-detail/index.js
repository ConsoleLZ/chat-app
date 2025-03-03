import { defineComponent, reactive, toRefs } from 'vue';
import { getUserInfoStore } from '@/store/index.js';

export default defineComponent({
	props: {
		userId: {
			type: String,
			default: null
		}
	},
	setup(props) {
		const state = reactive({
			userInfo: null
		})

		const methods = {
			getData() {
				const userId = props.userId || uni.getStorageSync('userInfo').id;

				getUserInfoStore.get({ userId }).then(res => {
					state.userInfo = res.data.info[0]
					console.log(state.userInfo)
				});
			}
		};

		methods.getData();

		return {
			...toRefs(state)
		}
	}
});
