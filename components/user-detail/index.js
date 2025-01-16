import {defineComponent} from 'vue'

export default defineComponent({
    setup(){
        const userInfo = uni.getStorageSync('userInfo')
        
        return {
            userInfo
        }
    }
})