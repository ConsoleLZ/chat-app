import { defineComponent, reactive, ref, toRefs } from 'vue';

export default defineComponent({
	setup(props, { emit }) {
		const state = reactive({
			formState: {
				title: null
			},
			rules: {
				title: {
					type: 'string',
					required: true,
					message: '请填写标签名称',
					trigger: ['change']
				}
			}
		});

		const components = {
			modalRef: ref(null),
			fromRef: ref(null)
		};

		const methods = {
			open() {
                state.formState.title = null;
				components.modalRef.value.open();
			},
			async onConfirm() {
				components.fromRef.value
					.validate()
					.then(() => {
						emit('confirmTag', state.formState.title);
                        components.modalRef.value.close();
					})
					.catch(() => {
						components.modalRef.value.closeLoading();
					});
			}
		};

		return {
			...toRefs(state),
			...components,
			...methods
		};
	}
});
