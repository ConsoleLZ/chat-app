import {defineComponent, reactive, toRefs} from 'vue'
import NavbarComp from '@/components/navbar/index.vue'

export default defineComponent({
    components: {
        NavbarComp
    },
    setup(){
        const state = reactive({
            tabsIndex: 0, // tabs的索引
            tabList: [
                {
                    name: '用户'
                },
                {
                    name: '群聊'
                }
            ]
        })

        const methods = {
            onChangeTabs(value){
                state.tabsIndex = value.index
            }
        }

        return {
            ...methods,
            ...toRefs(state)
        }
    }
})