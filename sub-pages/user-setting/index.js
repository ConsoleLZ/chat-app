import { defineComponent, reactive, toRefs, ref } from 'vue';
import { postDeleteContactStore } from '@/store/index';
import { onLoad } from '@dcloudio/uni-app';
import {groupSelectActions} from './constants'

export default defineComponent({
	setup() {
		const state = reactive({
			contactUserId: null,
			groupingName: null,
			formState: {
				remarks: null, // 备注
				grouping: null // 分组
			}
		});

		const components = {
			modalRef: ref(null),
			groupSelectRef: ref(null),
		};

		const constants = {
			groupSelectActions
		}

		const methods = {
			// 保存
			onSave(){
				console.log(state.formState)
			},
			onDel() {
				components.modalRef.value.open();
			},
			// 确认删除联系人
			onConfirmDel() {
				const postData = {
					userId: uni.getStorageSync('userInfo').id,
					contactUserId: state.contactUserId
				};
				postDeleteContactStore.post(postData).then(res => {
					const data = res.data;
					if (data.ok) {
						uni.switchTab({
							url: '/pages/contact-list/index'
						});
					} else {
						uni.showToast({
							title: '删除失败',
							icon: 'error'
						});
					}
				});
			},
			// 显示分组
			showGroupSelect(){
				components.groupSelectRef.value.open()
			},
			// 选择分组
			onGroupSelect(e){
				state.formState.grouping = e.key
				state.groupingName = e.name
			}
		};

		onLoad(options => {
			state.contactUserId = options.contactUserId;
		});

		return {
			...toRefs(state),
			...methods,
			...components,
			...constants
		};
	}
});
