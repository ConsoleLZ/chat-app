import { defineComponent, reactive, toRefs } from 'vue';
 
export default defineComponent({
  setup() {
    const state = reactive({
      data: null
    });
    
    const methods = {
        onDel(){}
    }

    return {
      ...toRefs(state),
      ...methods
    };
  }
});
 