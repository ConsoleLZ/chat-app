import {
	defineComponent,
	reactive,
	toRefs,
	ref
} from 'vue';
import {
	postLoginStore
} from '@/store/index.js'

export default defineComponent({
	setup() {
		const state = reactive({
			isPasswordType: true,
			account: '',
			password: '',
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
					return
				}
				state.isLoading = true
				postLoginStore.post({
					account: state.account,
					password: state.password
				}).then(res => {
					console.log(res)
				}).catch(() => {
					components.toastRef.value.show({
						type: 'error',
						title: '提示',
						message: '服务器错误'
					});
				}).finally(() => {
					state.isLoading = false
				})
			}
		};

		return {
			...methods,
			...components,
			...toRefs(state)
		};
	}
});