import {defineComponent, ref} from 'vue'

export default defineComponent({
    setup() {
        const components = {
			toastRef: ref(null)
		};
        const methods = {
            show(config){
                components.toastRef.value.show({
                    type: 'default',
                    title: '提示',
                    duration: 1000,
                    message: '空',
                    position: 'top',
                    ...config
                });
            }
        }

        return {
            ...methods,
            ...components
        }
    }
})