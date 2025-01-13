import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		title: {
			type: String,
			default: null
		}
	},
	setup() {
		const methods = {
			// 显示弹框
			async onShowDialog() {
				// await uni.hideTabBar();
				const dialogElement = uni.getElementById('dialog');
				const dialogBoxElement = uni.getElementById('dialog-box');
				dialogElement.style.setProperty('display', 'flex');
				dialogBoxElement.style.setProperty('transform', 'scale(1)');
			},
			// 关闭弹框
			async onCloseDialog() {
				// await uni.showTabBar();
				const dialogElement = uni.getElementById('dialog');
				const dialogBoxElement = uni.getElementById('dialog-box');
				dialogBoxElement.style.setProperty('transform', 'scale(0)');
				setTimeout(() => {
					dialogElement.style.setProperty('display', 'none');
				}, 200);
			},
			// 添加好友
			onAdd() {
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages-pack/add-friend/index'
					});
				}, 200);
			}
		};

        return {
            ...methods
        }
	}
});
