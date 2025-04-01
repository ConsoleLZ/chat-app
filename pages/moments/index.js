import { defineComponent, reactive, toRefs } from 'vue';
import { GetMomentsStore } from '@/store/index.js';
import dayjs from 'dayjs'
import NavbarComp from '@/components/navbar/index.vue';

export default defineComponent({
    components: {
		NavbarComp
	},
	setup() {
		const state = reactive({
			list: null
		});

        const constants = {
            dayjs
        }

		const methods = {
			getData() {
				const userId = uni.getStorageSync('userInfo').id;
				GetMomentsStore.get({ userId }).then(res => {
					const data = res.data;
					state.list = data?.data;
				});
			}
		};

        methods.getData();

		return {
			...toRefs(state),
            ...constants
		};
	}
});
