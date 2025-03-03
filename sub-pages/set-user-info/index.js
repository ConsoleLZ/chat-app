import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
    setup(){
        const state = reactive({
            formState: {
                userInfo: {
                    name: null
                }
            },
            rules: {
                'userInfo.name': {
                    type: 'string',
                    required: true,
                    message: '昵称不能为空',
                    trigger: ['change']
                }
            },
        })

        return {
            ...toRefs(state)
        }
    }
})