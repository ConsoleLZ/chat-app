import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		data: {
			type: Array,
			default: []
		},
		modelValue: {
			type: Array,
			default: []
		}
	},
	emits: ['update:modelValue', 'change'],
	setup(_props, { emit }) {
		const methods = {
			onChange(value) {
				emit('update:modelValue', value);
				emit('change')
			}
		};

		return {
			...methods
		};
	}
});
