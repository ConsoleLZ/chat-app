import { defineComponent, reactive, toRefs } from 'vue';
import { getMomentsDetailStore } from '@/store/index';
import { onLoad } from '@dcloudio/uni-app';
import dayjs from 'dayjs';

export default defineComponent({
	setup() {
		const state = reactive({
			id: null,
			data: null
		});

		const methods = {
			getData() {
				const userId = uni.getStorageSync('userInfo').id;
				getMomentsDetailStore.get({ id: state.id }).then(res => {
					const detail = res.data.detail
					const data = {
						...detail,
						thumbsIcon: detail.thumbs?.some(thumb => thumb.userId == userId)
							? '/static/moments/2.png'
							: '/static/moments/1.png',
						hasThmbs: detail.thumbs?.some(thumb => thumb.userId == userId),
						thumbsText: detail.thumbs?.map(item => item.name)
					};
					state.data = data;
				});
			}
		};

		onLoad(options => {
			state.id = options.id;
			methods.getData();
		});

		return {
			dayjs,
			...toRefs(state)
		};
	}
});
