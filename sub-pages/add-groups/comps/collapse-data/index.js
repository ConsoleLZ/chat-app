import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    setup() {
        const state = reactive({
            checkboxValue: []
        })

        const methods = {
            onCreate(){
                console.log(state.checkboxValue)
            }
        }

        return {
            ...toRefs(state),
            ...methods
        }
    }
})