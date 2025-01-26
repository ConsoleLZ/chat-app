import {defineComponent} from 'vue'

export default defineComponent({
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    setup() {
        const methods = {
            // 跳转到用户详情页
			onJumpUserDetail(userInfo) {
				uni.navigateTo({
					url: `/sub-pages/user-detail/index?userInfo=${JSON.stringify(userInfo)}`
				});
			},
        }

        return {
            ...methods
        }
    }
})