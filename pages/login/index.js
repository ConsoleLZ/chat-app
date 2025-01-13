import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			isPasswordType: true
		});

		const methods = {
			onChangePasswordType(){
				state.isPasswordType = !state.isPasswordType
			}
		}

		return {
			...methods,
			...toRefs(state)
		};
	}
});
