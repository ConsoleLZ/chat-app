@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER")
package uni.UNI3FAEF30;
import io.dcloud.uniapp.*;
import io.dcloud.uniapp.extapi.*;
import io.dcloud.uniapp.framework.*;
import io.dcloud.uniapp.runtime.*;
import io.dcloud.uniapp.vue.*;
import io.dcloud.uniapp.vue.shared.*;
import io.dcloud.unicloud.*;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import io.dcloud.uts.Set;
import io.dcloud.uts.UTSAndroid;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
open class GenPagesLoginIndex : BasePage {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _cache = this.`$`.renderCache;
        val _component_fui_input_comp = resolveComponent("fui-input-comp");
        return createElementVNode(Fragment, null, utsArrayOf(
            createElementVNode("view", utsMapOf("class" to "top"), utsArrayOf(
                createElementVNode("image", utsMapOf("class" to "logo", "src" to "/static/logo.png")),
                createElementVNode("text", utsMapOf("class" to "tips"), "一款简约风格的聊天应用")
            )),
            createElementVNode("view", utsMapOf("class" to "bottom"), utsArrayOf(
                createVNode(_component_fui_input_comp, utsMapOf("label" to "账号", "placeholder" to "请输入账号")),
                createVNode(_component_fui_input_comp, utsMapOf("marginTop" to 35, "password" to true, "label" to "密码", "placeholder" to "请输入密码")),
                createElementVNode("view", utsMapOf("class" to "login-btn"), utsArrayOf(
                    createElementVNode("text", utsMapOf("class" to "text"), "登录")
                )),
                createElementVNode("view", utsMapOf("class" to "register"), utsArrayOf(
                    createElementVNode("text", utsMapOf("class" to "tips"), utsArrayOf(
                        "没有账号？",
                        createElementVNode("text", utsMapOf("class" to "register-text"), "去注册")
                    ))
                ))
            ))
        ), 64);
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>>
            get() {
                return normalizeCssStyles(utsArrayOf(
                    styles0
                ), utsArrayOf(
                    GenApp.styles
                ));
            }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("tips" to padStyleMapOf(utsMapOf("fontSize" to "26rpx", "color" to "#666666")), "top" to padStyleMapOf(utsMapOf("height" to "400rpx", "display" to "flex", "justifyContent" to "center", "alignItems" to "center")), "logo" to padStyleMapOf(utsMapOf("width" to "200rpx", "height" to "200rpx", "borderRadius" to "200rpx")), "bottom" to padStyleMapOf(utsMapOf("marginTop" to "100rpx")), "login-btn" to padStyleMapOf(utsMapOf("width" to "80%", "height" to "90rpx", "borderRadius" to "10rpx", "backgroundColor" to "#165af7", "marginTop" to "200rpx", "marginRight" to "auto", "marginBottom" to 0, "marginLeft" to "auto", "display" to "flex", "justifyContent" to "center", "alignItems" to "center")), "text" to utsMapOf(".login-btn " to utsMapOf("color" to "#ffffff")), "register" to padStyleMapOf(utsMapOf("display" to "flex", "alignItems" to "center", "marginTop" to "80rpx")), "register-text" to padStyleMapOf(utsMapOf("fontSize" to "26rpx", "color" to "#4062f9")));
            }
        var inheritAttrs = true;
        var inject: Map<String, Map<String, Any?>> = utsMapOf();
        var emits: Map<String, Any?> = utsMapOf();
        var props = normalizePropsOptions(utsMapOf());
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf();
        var components: Map<String, CreateVueComponent> = utsMapOf("FuiInputComp" to GenComponentsFuiInputFuiInputClass);
    }
}
