import {defineComponent, reactive, toRefs, ref, nextTick} from 'vue'
import { faceList } from '@/sub-pages/chat-message/constants.js';
import { onLoad } from '@dcloudio/uni-app';
import { sendGroupMessage, createMessage } from '@/utils/socketService';

export default defineComponent({
    setup() {
        const state = reactive({
			messages: [],
			inputText: '',
            memberIds: null,
			scrollTop: 9999,
			loading: false,
            title: null,
            groupId: null
		});

        const constants = {
			faceList
		};

        const components = {
			popupRef: ref(null)
		};

        const methods = {
            sendMessage(){
                const userInfo = uni.getStorageSync('userInfo');
                if(state.inputText.trim()){
                    const message = createMessage(
                        userInfo.id,
                        state.memberIds,
                        state.inputText,
                        userInfo
                    );
                    
                    sendGroupMessage(state.groupId, state.memberIds, state.inputText, userInfo)

                    const messages = uni.getStorageSync('groupMessages') || [];
                    messages.push({
                        ...message,
                        groupId: state.groupId
                    })
                    state.messages = messages

					uni.setStorageSync('groupMessages', messages);
                    state.inputText = ''
                }
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
            state.groupId = info.id
            state.title = info.name
            state.memberIds = info.memberIds

            // 初始化加载消息
            const messages = uni.getStorageSync('groupMessages') || [];
            state.messages = messages
        })

        // 监听发送过来的消息
		uni.$on('groupMessage', function (data) {
			state.messages.push(data);

			nextTick(() => {
				state.scrollTop += 1;
			});
		});

        return {
            ...methods,
            ...toRefs(state),
            ...components,
            ...constants
        }
    }
})