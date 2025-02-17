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
				const data = value.map(item=>JSON.parse(item))
				emit('update:modelValue', data);
				emit('change')
			}
		};

		return {
			...methods
		};
	}
});
