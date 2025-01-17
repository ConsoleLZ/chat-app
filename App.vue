<script>
import { postVerifiedStore } from '@/store/index.js';
import { initSocket, listenPrivateMessage } from '@/utils/socketService.js';

export default {
	onLaunch: function () {
		console.log('App Launch');
	},
	onShow: function () {
		console.log('页面路由拦截');
		// 页面路由拦截
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
		postVerifiedStore
			.post({
				token: uni.getStorageSync('token')
			})
			.then(res => {
				const ok = res.data?.ok;
				if (!ok) {
					uni.redirectTo({
						url: '/pages/login/index'
					});
				} else {
					// 初始化并连接到服务器
					const socket = initSocket(uni.getStorageSync('userInfo'));

					// 监听服务器消息
					listenPrivateMessage(data => {
						const messages = uni.getStorageSync('messages') === '' ? [] : uni.getStorageSync('messages')
						messages.push(data)
						uni.setStorageSync('messages', messages)
					});
				}
			})
			.catch(error => {
				uni.showToast({
					title: '服务器错误',
					icon: 'error'
				});
			})
			.finally(() => {
				uni.hideLoading();
			});
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>

<style lang="scss" src="@/utils/utils.scss"></style>
