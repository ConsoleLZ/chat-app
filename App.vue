<script>
import { postVerifiedStore } from '@/store/index.js';
import { initSocket, connectSocket } from '@/utils/socketService.js';

export default {
	onLaunch: function () {
		console.log('App Launch');
	},
	onShow: function () {
		console.log('页面路由拦截');
		// 初始化并连接到服务器
		initSocket();
		connectSocket();

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
