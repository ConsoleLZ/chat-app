import FuiInputComp from '@/components/fui-input/fui-input.uvue'

const __sfc__ = defineComponent({
	components: {
		FuiInputComp
	}
})
export default __sfc__
function GenPagesLoginIndexRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_fui_input_comp = resolveComponent("fui-input-comp")

  return createElementVNode(Fragment, null, [
    createElementVNode("view", utsMapOf({ class: "top" }), [
      createElementVNode("image", utsMapOf({
        class: "logo",
        src: "/static/logo.png"
      })),
      createElementVNode("text", utsMapOf({ class: "tips" }), "一款简约风格的聊天应用")
    ]),
    createElementVNode("view", utsMapOf({ class: "bottom" }), [
      createVNode(_component_fui_input_comp, utsMapOf({
        label: "账号",
        placeholder: "请输入账号"
      })),
      createVNode(_component_fui_input_comp, utsMapOf({
        marginTop: 35,
        password: true,
        label: "密码",
        placeholder: "请输入密码"
      })),
      createElementVNode("view", utsMapOf({ class: "login-btn" }), [
        createElementVNode("text", utsMapOf({ class: "text" }), "登录")
      ]),
      createElementVNode("view", utsMapOf({ class: "register" }), [
        createElementVNode("text", utsMapOf({ class: "tips" }), [
          "没有账号？",
          createElementVNode("text", utsMapOf({ class: "register-text" }), "去注册")
        ])
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */)
}
const GenPagesLoginIndexStyles = [utsMapOf([["tips", padStyleMapOf(utsMapOf([["fontSize", "26rpx"], ["color", "#666666"]]))], ["top", padStyleMapOf(utsMapOf([["height", "400rpx"], ["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"]]))], ["logo", padStyleMapOf(utsMapOf([["width", "200rpx"], ["height", "200rpx"], ["borderRadius", "200rpx"]]))], ["bottom", padStyleMapOf(utsMapOf([["marginTop", "100rpx"]]))], ["login-btn", padStyleMapOf(utsMapOf([["width", "80%"], ["height", "90rpx"], ["borderRadius", "10rpx"], ["backgroundColor", "#165af7"], ["marginTop", "200rpx"], ["marginRight", "auto"], ["marginBottom", 0], ["marginLeft", "auto"], ["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"]]))], ["text", utsMapOf([[".login-btn ", utsMapOf([["color", "#ffffff"]])]])], ["register", padStyleMapOf(utsMapOf([["display", "flex"], ["alignItems", "center"], ["marginTop", "80rpx"]]))], ["register-text", padStyleMapOf(utsMapOf([["fontSize", "26rpx"], ["color", "#4062f9"]]))]])]
