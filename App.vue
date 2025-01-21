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
					const userInfo = uni.getStorageSync('userInfo')
					// 初始化并连接到服务器
					const socket = initSocket(userInfo);

					// 监听服务器消息
					listenPrivateMessage(data => {
						// 使用对象存储消息，以createTime作为key
						const messages = uni.getStorageSync('messages') === '' ? {} : uni.getStorageSync('messages');
						// 检查消息是否已存在
						if (!messages[data.createTime]) {
							console.log(data)
							data.isView = false
							messages[data.createTime] = data;
							uni.$emit('privateMessage', data);
							uni.setStorageSync('messages', messages);
						}
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
