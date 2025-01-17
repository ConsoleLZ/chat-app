import {defineComponent, reactive, toRefs} from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import UserDetailComp from '@/components/user-detail/index.vue'

export default defineComponent({
    components: {
		UserDetailComp
	},
    setup(){
        const state = reactive({
            userInfo: {}
        })
        onLoad((options)=>{
            state.userInfo = JSON.parse(options.userInfo)
        })

        return {
            ...toRefs(state)
        }
    }
})