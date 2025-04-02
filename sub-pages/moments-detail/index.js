import { defineComponent, reactive, toRefs } from 'vue';
import { getMomentsDetailStore, postUpdateMomentsStore } from '@/store/index';
import { onLoad } from '@dcloudio/uni-app';
import dayjs from 'dayjs';

export default defineComponent({
	setup() {
		const state = reactive({
			id: null,
			data: null,
			value: null
		});

		const methods = {
			getData() {
				const userId = uni.getStorageSync('userInfo').id;
				getMomentsDetailStore.get({ id: state.id }).then(res => {
					const detail = res.data.detail;
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
			},
			// 点赞
			async onThumbsUp(id, thumbs, thumbsIcon, hasThmbs) {
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
				await postUpdateMomentsStore.post(postData);
				methods.getData();
			},
			// 评论
			onConfirm() {
				const userInfo = uni.getStorageSync('userInfo');
				if (!state.data.comments) {
					state.data.comments = [];
				}
				state.data.comments.push({
					userId: userInfo.id,
					name: userInfo.name,
					value: state.value
				});
				postUpdateMomentsStore
					.post({
						id: state.data.id,
						comments: state.data.comments
					})
					.then(res => {
						methods.getData();
					})
					.finally(() => {
						state.value = null;
					});
			}
		};

		onLoad(options => {
			state.id = options.id;
			methods.getData();
		});

		return {
			dayjs,
			...toRefs(state),
			...methods
		};
	}
});
