import {defineComponent, reactive, toRefs, ref} from 'vue'
import { faceList } from '@/sub-pages/chat-message/constants.js';
import { onLoad } from '@dcloudio/uni-app';

export default defineComponent({
    setup() {
        const state = reactive({
			messages: [],
			inputText: '',
			scrollTop: 9999,
			loading: false,
            title: null
		});

        const constants = {
			faceList
		};

        const components = {
			popupRef: ref(null)
		};

        const methods = {
            sendMessage(){
                console.log(state.inputText)
            },
            goBack() {
				uni.navigateBack();
			},
            // 打开表情包弹窗
			openFace() {
				components.popupRef.value.open();
			},
			// 选择表情
			selectFace(item) {
				state.inputText += item;
				components.popupRef.value.close();
			},
        }

        onLoad(options=>{
            const info = JSON.parse(options.info)

            state.title = info.name
        })

        return {
            ...methods,
            ...toRefs(state),
            ...components,
            ...constants
        }
    }
})