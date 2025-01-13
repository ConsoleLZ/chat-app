import { defineComponent, reactive, toRefs, ref } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			isPasswordType: true,
			account: '',
			password: ''
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
				if(state.account === '' || state.password === ''){
					components.toastRef.value.show({
						type: 'warning',
						title: '提示',
						message: '账号或者密码不能为空'
					});
					return
				}
				console.log(state.account, state.password);
			}
		};

		return {
			...methods,
			...components,
			...toRefs(state)
		};
	}
});
