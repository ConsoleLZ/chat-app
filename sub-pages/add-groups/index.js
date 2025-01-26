import {defineComponent, toRefs, reactive} from 'vue'

export default defineComponent({
    setup() {
        const state = reactive({
			searchValue: '',
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight
		});

        const methods = {
            // 清空列表
			onClear() {
				state.searchValue = '';
				state.users = null;
			},
			// 返回
			onBack() {
				uni.navigateBack({ delta: 1 });
			}
        }

        return {
            ...toRefs(state),
            ...methods
        }
    }
})