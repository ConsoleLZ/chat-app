import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			content: ''
		});

		return {
			...toRefs(state)
		};
	}
});
