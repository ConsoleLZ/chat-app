import { defineComponent, reactive, toRefs, ref } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			data: null
		});

		const components = {
			modalRef: ref(null)
		};

		const methods = {
			onDel() {
        components.modalRef.value.open()
      },
      // 确认删除联系人
      onConfirmDel(){

      }
		};

		return {
			...toRefs(state),
			...methods,
			...components
		};
	}
});
