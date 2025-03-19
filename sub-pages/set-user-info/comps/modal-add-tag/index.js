import { defineComponent, reactive, ref, toRefs } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			formState: {
				title: null
			}
		});

		const components = {
			modalRef: ref(null)
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
