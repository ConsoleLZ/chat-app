import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			content: '',
			fileList: []
		});

		const methods = {
			afterRead(e) {
				const fileList = e.file.map(item => {
					return {
						...item,
						status: 'uploading',
						message: '上传中'
					};
				});
                fileList.forEach(item => {
                  state.fileList.push(item)  
                })
			}
		};

		return {
			...toRefs(state),
			...methods
		};
	}
});
