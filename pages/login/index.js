import { defineComponent, reactive, toRefs, ref } from 'vue';
import { postLoginStore } from '@/store/index.js';
import { initSocket, getSocket } from '@/utils/socketService.js';
import { listenMessage } from '@/utils/utils.js';
import ToastComp from '@/components/toast/index.vue'

export default defineComponent({
	components: {
		ToastComp
	},
	setup() {
		const state = reactive({
			isPasswordType: true,
			account: 'admin',
			password: '123456',
			isLoading: false
		});

		const components = {
			toastRef: ref(null)
		};

		const methods = {
			onChangePasswordType() {
				state.isPasswordType = !state.isPasswordType;
			},
			// 登录
			onLogin() {
				if (state.account === '' || state.password === '') {
					components.toastRef.value.show({
						type: 'warning',
						title: '提示',
						message: '账号或者密码不能为空'
					});
					return;
				}
				state.isLoading = true;
				postLoginStore
					.post({
						account: state.account,
						password: state.password
					})
					.then(res => {
						const ok = res.data?.ok;
						if (ok) {
							uni.setStorageSync('token', res.data?.token);
							uni.setStorageSync('userInfo', res.data?.userInfo);
							components.toastRef.value.show({
								type: 'success',
								message: '登录成功',
								complete() {
									if (!getSocket()) {
										initSocket(res.data?.userInfo);
										// 监听服务器消息
										listenMessage().private1();
									}
									uni.switchTab({ url: '/pages/message/index' });
								}
							});
						} else {
							components.toastRef.value.show({
								type: 'error',
								message: '账号或者密码错误'
							});
						}
					})
					.catch(() => {
						components.toastRef.value.show({
							type: 'error',
							message: '服务器错误'
						});
					})
					.finally(() => {
						state.isLoading = false;
					});
			},
			// 去注册
			onRegister() {
				uni.navigateTo({ url: '/pages/register/index' });
			}
		};

		return {
			...methods,
			...components,
			...toRefs(state)
		};
	}
});
