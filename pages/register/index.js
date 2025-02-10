import { defineComponent, reactive, toRefs, ref } from 'vue';
import { postRegisterStore } from '@/store/index.js';
import ToastComp from '@/components/toast/index.vue'

export default defineComponent({
	components: {
		ToastComp
	},
	setup() {
		const state = reactive({
			isPasswordType: true,
			account: '',
			password: '',
			name: '',
			isLoading: false
		});

		const components = {
			toastRef: ref(null)
		};

		const methods = {
			onChangePasswordType() {
				state.isPasswordType = !state.isPasswordType;
			},
			// 注册
			onRegister() {
				if (state.account === '' || state.password === '' || state.name === '') {
					return;
				}
				state.isLoading = true;
				postRegisterStore
					.post({
						name: state.name,
						account: state.account,
						password: state.password
					})
					.then(res => {
						const ok = res.data.ok;
						if (ok) {
							components.toastRef.value.show({
								type: 'success',
								message: '注册成功',
								complete() {
									uni.navigateTo({ url: '/pages/login/index' });
								}
							});
						} else {
							components.toastRef.value.show({
								type: 'error',
								message: '注册失败,请联系管理'
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
			}
		};

		return {
			...components,
			...toRefs(state),
			...methods
		};
	}
});
