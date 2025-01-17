import {defineComponent} from 'vue'

export default defineComponent({
    props: {
        userInfo: {
            type: Object,
            default: {}
        }
    }
})