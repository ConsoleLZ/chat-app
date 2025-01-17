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

        const methods = {
            // 跳转到聊天页
            onJumpChat(){
                uni.navigateTo({
                    url: `/sub-pages/chat-message/index?userInfo=${JSON.stringify(state.userInfo)}`
                })
            }
        }

        onLoad((options)=>{
            state.userInfo = JSON.parse(options.userInfo)
        })

        return {
            ...toRefs(state),
            ...methods
        }
    }
})