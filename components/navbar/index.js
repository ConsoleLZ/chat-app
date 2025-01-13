import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
	props: {
		title: {
			type: String,
			default: null
		}
	},
	setup() {
		const state = reactive({
			
		});

		const methods = {
			
		};

		return {
			...methods,
			...toRefs(state)
		};
	}
});
