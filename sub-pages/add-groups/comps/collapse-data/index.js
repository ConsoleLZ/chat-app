import {defineComponent} from 'vue'

export default defineComponent({
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        console.log(props.data)
    }
})