import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			data: null
		});

		return {
			...toRefs(state)
		};
	}
});
