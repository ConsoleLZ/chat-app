import { defineComponent, reactive, toRefs } from 'vue';
import { getMomentsStore, postUpdateMomentsStore } from '@/store/index.js';
import dayjs from 'dayjs';
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
		};

		const methods = {
			getData() {
				const userId = uni.getStorageSync('userInfo').id;
				getMomentsStore.get({ userId }).then(res => {
					const data = res.data;
					state.list = data?.data.map(item => {
						return {
							...item,
							thumbsIcon: item.thumbs?.some(thumb => thumb.userId == userId)
								? '/static/moments/2.png'
								: '/static/moments/1.png',
							hasThmbs: item.thumbs?.some(thumb => thumb.userId == userId),
							thumbsText: item.thumbs.map(item=>item.name)
						};
					});
					console.log(state.list);
				});
			},
			// 点赞
			onThumbsUp(id, thumbs, thumbsIcon, hasThmbs) {
				if (hasThmbs) {
					return;
				}
				thumbsIcon = '/static/moments/2.png';
				if (!thumbs) {
					thumbs = [];
				}
				const userInfo = uni.getStorageSync('userInfo');
				thumbs.push({
					userId: userInfo.id,
					name: userInfo.name
				});
				const postData = {
					id,
					thumbs
				};
				postUpdateMomentsStore.post(postData);
			}
		};

		methods.getData();

		return {
			...toRefs(state),
			...constants,
			...methods
		};
	}
});
