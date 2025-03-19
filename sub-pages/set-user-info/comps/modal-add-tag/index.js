import { defineComponent, reactive, ref, toRefs } from 'vue';

export default defineComponent({
	setup() {
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
			},
		});

		const components = {
			modalRef: ref(null),
            fromRef: ref(null)
		};

		const methods = {
			open() {
				components.modalRef.value.open();
			},
			onConfirm() {}
		};

		return {
			...toRefs(state),
			...components,
			...methods
		};
	}
});
