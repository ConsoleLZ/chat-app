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
open class GenComponentsFuiInputFuiInput : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onCreated(fun() {
            setTimeout(fun(){
                val value = this.getStringVal(this.value);
                val modelValue = this.getStringVal(this.modelValue);
                if (value != "") {
                    this.`val` = value;
                } else if (modelValue != "") {
                    this.`val` = modelValue;
                }
                val isForm = this.getParent("fui-form");
                if (isForm) {
                    val form = this.fuiForm as ComponentPublicInstance;
                    (form.`$data`["formChildren"] as UTSArray<ComponentPublicInstance>).push(this as ComponentPublicInstance);
                }
            }
            , 50);
        }
        , __ins);
        onMounted(fun() {
            this.`$nextTick`(fun(){
                setTimeout(fun(){
                    this.setFocusOrBlur(this.focus);
                }
                , 300);
            }
            );
        }
        , __ins);
        this.`$watch`(fun(): Any? {
            return this.focus;
        }
        , fun(kVal: Boolean) {
            this.`$nextTick`(fun(){
                setTimeout(fun(){
                    this.setFocusOrBlur(kVal);
                }
                , 50);
            }
            );
        }
        );
        this.`$watch`(fun(): Any? {
            return this.modelValue;
        }
        , fun() {
            this.`val` = this.getStringVal(this.modelValue);
        }
        );
        this.`$watch`(fun(): Any? {
            return this.value;
        }
        , fun() {
            this.`val` = this.getStringVal(this.value);
        }
        );
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this;
        val _cache = this.`$`.renderCache;
        return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
            "fui-input__wrap",
            utsMapOf("fui-input__border-uvue" to _ctx.inputBorder, "fui-input__border-color" to (_ctx.inputBorder && _ctx.borderColor == ""), "fui-input__disabled-styl" to (_ctx.disabled && _ctx.disabledStyle))
        )), "style" to normalizeStyle(_ctx.getStyle), "onClick" to _ctx.fieldClick), utsArrayOf(
            if (isTrue(_ctx.borderTop && !_ctx.inputBorder)) {
                createElementVNode("view", utsMapOf("key" to 0, "style" to normalizeStyle(utsMapOf("background" to _ctx.borderColor, "left" to ("" + _ctx.topLeft + "rpx"), "right" to ("" + _ctx.topRight + "rpx"))), "class" to normalizeClass(utsArrayOf(
                    "fui-input__border-top",
                    utsMapOf("fui-input__background" to (_ctx.borderColor == ""))
                ))), null, 6);
            } else {
                createCommentVNode("v-if", true);
            }
            ,
            if (isTrue(_ctx.required)) {
                createElementVNode("view", utsMapOf("key" to 1, "class" to "fui-input__required"), utsArrayOf(
                    createElementVNode("text", utsMapOf("style" to normalizeStyle(_ctx.getRequiredColor), "class" to normalizeClass(utsArrayOf(
                        "fui-input__asterisk-text",
                        utsMapOf("fui-input__asterisk-color" to (_ctx.requiredColor == ""))
                    ))), "*", 6)
                ));
            } else {
                createCommentVNode("v-if", true);
            }
            ,
            if (_ctx.label != "") {
                createElementVNode("view", utsMapOf("key" to 2, "class" to "fui-input__label", "style" to normalizeStyle(utsMapOf("minWidth" to ("" + _ctx.labelWidth + "rpx")))), utsArrayOf(
                    createElementVNode("text", utsMapOf("class" to normalizeClass(utsMapOf("fui-input__label-size" to (_ctx.labelSize == 0))), "style" to normalizeStyle(_ctx.getLabelStyl)), toDisplayString(_ctx.label), 7)
                ), 4);
            } else {
                createCommentVNode("v-if", true);
            }
            ,
            renderSlot(_ctx.`$slots`, "left"),
            createElementVNode("input", utsMapOf("ref" to _ctx.refId, "class" to normalizeClass(utsArrayOf(
                "fui-input__self",
                utsMapOf("fui-input__disabled" to _ctx.disabled, "fui-input__size" to (_ctx.size == 0))
            )), "style" to normalizeStyle(utsMapOf("fontSize" to ("" + _ctx.size + "rpx"), "color" to _ctx.color, "textAlign" to _ctx.textAlign)), "placeholder-class" to "fui-input__placeholder", "type" to _ctx.type, "name" to _ctx.name, "value" to _ctx.`val`, "placeholder" to _ctx.placeholder, "password" to (_ctx.password || _ctx.type == "password"), "placeholder-style" to _ctx.placeholderStyle, "disabled" to (_ctx.disabled || _ctx.readonly), "cursor-spacing" to _ctx.cursorSpacing, "maxlength" to _ctx.maxlength, "confirm-type" to _ctx.confirmType, "confirm-hold" to _ctx.confirmHold, "cursor" to _ctx.cursor, "selection-start" to _ctx.selectionStart, "selection-end" to _ctx.selectionEnd, "adjust-position" to _ctx.adjustPosition, "onFocus" to _ctx.onFocus, "onBlur" to _ctx.onBlur, "onInput" to _ctx.onInput, "onConfirm" to _ctx.onConfirm, "onKeyboardheightchange" to _ctx.onKeyboardheightchange), null, 46, utsArrayOf(
                "type",
                "name",
                "value",
                "placeholder",
                "password",
                "placeholder-style",
                "disabled",
                "cursor-spacing",
                "maxlength",
                "confirm-type",
                "confirm-hold",
                "cursor",
                "selection-start",
                "selection-end",
                "adjust-position",
                "onFocus",
                "onBlur",
                "onInput",
                "onConfirm",
                "onKeyboardheightchange"
            )),
            if (isTrue(_ctx.clearable && _ctx.`val` != "")) {
                createElementVNode("view", utsMapOf("key" to 3, "class" to "fui-input__clear-wrap", "style" to normalizeStyle(utsMapOf("background" to _ctx.clearColor)), "onClick" to withModifiers(_ctx.onClear, utsArrayOf(
                    "stop"
                ))), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "fui-input__clear"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "fui-input__clear-a"))
                    )),
                    createElementVNode("view", utsMapOf("class" to "fui-input__clear"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "fui-input__clear-b"))
                    ))
                ), 12, utsArrayOf(
                    "onClick"
                ));
            } else {
                createCommentVNode("v-if", true);
            }
            ,
            renderSlot(_ctx.`$slots`, "default"),
            if (isTrue(_ctx.borderBottom && !_ctx.inputBorder)) {
                createElementVNode("view", utsMapOf("key" to 4, "style" to normalizeStyle(_ctx.getBtnLineStyl), "class" to normalizeClass(utsArrayOf(
                    "fui-input__border-bottom",
                    utsMapOf("fui-input__background" to (_ctx.borderColor == ""))
                ))), null, 6);
            } else {
                createCommentVNode("v-if", true);
            }
        ), 14, utsArrayOf(
            "onClick"
        ));
    }
    open var required: Boolean by `$props`;
    open var requiredColor: String by `$props`;
    open var label: String by `$props`;
    open var labelSize: Number by `$props`;
    open var labelColor: String by `$props`;
    open var labelWidth: Number by `$props`;
    open var clearable: Boolean by `$props`;
    open var clearColor: String by `$props`;
    open var focus: Boolean by `$props`;
    open var placeholder: String by `$props`;
    open var placeholderStyle: String by `$props`;
    open var name: String by `$props`;
    open var value: Any by `$props`;
    open var modelValue: Any by `$props`;
    open var type: String by `$props`;
    open var password: Boolean by `$props`;
    open var disabled: Boolean by `$props`;
    open var disabledStyle: Boolean by `$props`;
    open var readonly: Boolean by `$props`;
    open var maxlength: Number by `$props`;
    open var min: Number by `$props`;
    open var max: Number by `$props`;
    open var cursorSpacing: Number by `$props`;
    open var cursorColor: String by `$props`;
    open var confirmType: String by `$props`;
    open var confirmHold: Boolean by `$props`;
    open var cursor: Number by `$props`;
    open var selectionStart: Number by `$props`;
    open var selectionEnd: Number by `$props`;
    open var adjustPosition: Boolean by `$props`;
    open var size: Number by `$props`;
    open var color: String by `$props`;
    open var inputBorder: Boolean by `$props`;
    open var isFillet: Boolean by `$props`;
    open var radius: Number by `$props`;
    open var borderTop: Boolean by `$props`;
    open var topLeft: Number by `$props`;
    open var topRight: Number by `$props`;
    open var borderBottom: Boolean by `$props`;
    open var bottomLeft: Number by `$props`;
    open var bottomRight: Number by `$props`;
    open var borderColor: String by `$props`;
    open var trim: Boolean by `$props`;
    open var textAlign: String by `$props`;
    open var padding: String by `$props`;
    open var backgroundColor: String by `$props`;
    open var marginTop: Number by `$props`;
    open var refId: Any? by `$data`;
    open var `val`: String by `$data`;
    open var fuiForm: ComponentPublicInstance? by `$data`;
    open var valueType: Number by `$data`;
    open var getStyle: Any by `$data`;
    open var getBorderRadius: String by `$data`;
    open var getBtnLineStyl: Any by `$data`;
    open var getRequiredColor: Any by `$data`;
    open var getLabelStyl: Any by `$data`;
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        val refInputId = "fui_input_" + parseInt(Math.ceil(Math.random() * 10e5).toString(), 36);
        return utsMapOf("refId" to refInputId, "val" to "", "fuiForm" to null as ComponentPublicInstance?, "valueType" to 1, "getStyle" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map();
            mp.set("padding", this.padding);
            mp.set("background", this.backgroundColor);
            mp.set("margin-top", "" + this.marginTop + "rpx");
            mp.set("border-radius", if (this.isFillet) {
                "120px";
            } else {
                "" + this.radius + "rpx";
            }
            );
            if (this.inputBorder && this.borderColor != "") {
                mp.set("border-color", this.borderColor);
            }
            return mp;
        }
        ), "getBorderRadius" to computed<String>(fun(): String {
            var radius = "" + this.radius * 2 + "rpx";
            if (this.isFillet) {
                radius = "240px";
            }
            return radius;
        }
        ), "getBtnLineStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map();
            if (this.borderColor != "") {
                mp.set("background", this.borderColor);
            }
            mp.set("left", "0");
            mp.set("right", "" + this.bottomRight + "rpx");
            return mp;
        }
        ), "getRequiredColor" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map();
            if (this.requiredColor != "") {
                mp.set("color", this.requiredColor);
            }
            return mp;
        }
        ), "getLabelStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map();
            if (this.labelColor != "") {
                mp.set("color", this.labelColor);
            }
            if (this.labelSize != 0) {
                mp.set("fontSize", "" + this.labelSize + "rpx");
                mp.set("lineHeight", "" + this.labelSize + "rpx");
            }
            return mp;
        }
        ));
    }
    override fun `$initMethods`() {
        this.getStringVal = fun(kVal: Any): String {
            var str: String;
            if (UTSAndroid.`typeof`( kVal) == "string") {
                str = kVal as String;
            } else if (UTSAndroid.`typeof`( kVal) == "number") {
                str = (kVal as Number).toString();
            } else {
                str = kVal.toString();
            }
            return str;
        }
        ;
        this.setFocusOrBlur = fun(focus: Boolean) {
            if (focus) {
                (this.`$refs`[this.refId] as UniElement).focus();
            } else {
                (this.`$refs`[this.refId] as UniElement).blur();
            }
        }
        ;
        this.isSafeInteger = fun(num: Number): Boolean {
            return num >= -9007199254740991 && num <= 9007199254740991;
        }
        ;
        this.onInput = fun(event: UniInputEvent) {
            var value = event.detail.value;
            if (this.trim) {
                value = this.trimStr(value);
            }
            this.`val` = value;
            var currentVal = parseFloat(value);
            if ((this.type == "digit" || this.type == "number") && !isNaN(currentVal) && this.isSafeInteger(currentVal)) {
                val min = this.min;
                val max = this.max;
                if (min != -1 && currentVal < min) {
                    currentVal = min;
                } else if (max != -1 && max < currentVal) {
                    currentVal = max;
                }
                value = currentVal.toString();
            }
            this.`$nextTick`(fun(){
                if (event.detail.value != "") {
                    this.`val` = value;
                }
            }
            );
            val inputValue = if (event.detail.value != "") {
                value;
            } else {
                "";
            }
            ;
            this.`$emit`("input", inputValue);
            this.`$emit`("update:modelValue", inputValue);
        }
        ;
        this.onFocus = fun(event: UniInputFocusEvent) {
            this.`$emit`("focus", event);
        }
        ;
        this.onBlur = fun(event: UniInputBlurEvent) {
            this.`$emit`("blur", event);
        }
        ;
        this.onConfirm = fun(event: UniInputConfirmEvent) {
            this.`$emit`("confirm", event);
        }
        ;
        this.onClear = fun() {
            if (this.disabled && !this.readonly) {
                return;
            }
            this.setFocusOrBlur(false);
            this.`val` = "";
            this.`$emit`("input", "");
            this.`$emit`("update:modelValue", "");
        }
        ;
        this.fieldClick = fun() {
            this.`$emit`("onclick", this.name);
        }
        ;
        this.onKeyboardheightchange = fun(e: UniInputKeyboardHeightChangeEvent) {
            this.`$emit`("keyboardheightchange", e);
        }
        ;
        this.trimStr = fun(str: String): String {
            return str.replace(UTSRegExp("^\\s+|\\s+\$", "g"), "");
        }
        ;
        this.getParent = fun(name: String): Boolean {
            if (this.`$parent` == null) {
                return false;
            }
            var parent = this.`$parent` as ComponentPublicInstance;
            var parentName = parent.`$options`["name"];
            while(parentName != name){
                if (parent.`$parent` == null) {
                    return false;
                }
                parent = parent.`$parent` as ComponentPublicInstance;
                if (parent.`$options`["name"] == "") {
                    return false;
                }
                parentName = parent.`$options`["name"];
            }
            this.fuiForm = parent;
            return true;
        }
        ;
        this.reset = fun() {
            this.setFocusOrBlur(false);
            this.`val` = "";
            this.`$emit`("input", "");
            this.`$emit`("update:modelValue", "");
        }
        ;
        this.getSubmitValue = fun(): String {
            return this.`val`;
        }
        ;
    }
    open lateinit var getStringVal: (kVal: Any) -> String;
    open lateinit var setFocusOrBlur: (focus: Boolean) -> Unit;
    open lateinit var isSafeInteger: (num: Number) -> Boolean;
    open lateinit var onInput: (event: UniInputEvent) -> Unit;
    open lateinit var onFocus: (event: UniInputFocusEvent) -> Unit;
    open lateinit var onBlur: (event: UniInputBlurEvent) -> Unit;
    open lateinit var onConfirm: (event: UniInputConfirmEvent) -> Unit;
    open lateinit var onClear: () -> Unit;
    open lateinit var fieldClick: () -> Unit;
    open lateinit var onKeyboardheightchange: (e: UniInputKeyboardHeightChangeEvent) -> Unit;
    open lateinit var trimStr: (str: String) -> String;
    open lateinit var getParent: (name: String) -> Boolean;
    open lateinit var reset: () -> Unit;
    open lateinit var getSubmitValue: () -> String;
    companion object {
        var name = "fui-input";
        val styles: Map<String, Map<String, Map<String, Any>>>
            get() {
                return normalizeCssStyles(utsArrayOf(
                    styles0
                ));
            }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("tips" to padStyleMapOf(utsMapOf("fontSize" to "26rpx", "color" to "#666666")), "fui-input__wrap" to padStyleMapOf(utsMapOf("width" to "100%", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "position" to "relative", "boxSizing" to "border-box", "overflow" to "visible")), "fui-input__border-uvue" to padStyleMapOf(utsMapOf("borderWidth" to 0.5, "borderStyle" to "solid")), "fui-input__border-color" to padStyleMapOf(utsMapOf("!borderColor" to "#EEEEEE")), "fui-input__background" to padStyleMapOf(utsMapOf("!backgroundImage" to "none", "!backgroundColor" to "#EEEEEE")), "fui-input__border-top" to padStyleMapOf(utsMapOf("position" to "absolute", "top" to 0, "height" to 1, "transform" to "scaleY(0.5)", "transformOrigin" to "0 0", "zIndex" to 1, "pointerEvents" to "none")), "fui-input__border-bottom" to padStyleMapOf(utsMapOf("position" to "absolute", "bottom" to 0, "height" to 1, "transform" to "scaleY(0.5)", "transformOrigin" to "0 100%", "zIndex" to 1, "pointerEvents" to "none")), "fui-input__required" to padStyleMapOf(utsMapOf("position" to "absolute", "left" to "12rpx", "height" to "100%", "display" to "flex", "alignItems" to "center", "justifyContent" to "center")), "fui-input__asterisk-text" to padStyleMapOf(utsMapOf("fontSize" to "32rpx", "height" to "32rpx", "lineHeight" to "32rpx")), "fui-input__asterisk-color" to padStyleMapOf(utsMapOf("!color" to "#FF2B2B")), "fui-input__label" to padStyleMapOf(utsMapOf("paddingRight" to "12rpx", "flexShrink" to 0)), "fui-input__label-size" to padStyleMapOf(utsMapOf("!fontSize" to "32rpx", "!lineHeight" to "32rpx")), "fui-input__self" to padStyleMapOf(utsMapOf("flex" to 1, "paddingRight" to "12rpx", "overflow" to "visible", "backgroundColor" to "rgba(0,0,0,0)", "boxSizing" to "border-box")), "fui-input__size" to padStyleMapOf(utsMapOf("!fontSize" to "32rpx")), "fui-input__clear-wrap" to padStyleMapOf(utsMapOf("width" to "32rpx", "height" to "32rpx", "transform" to "rotate(45deg) scale(1.1)", "position" to "relative", "flexShrink" to 0, "borderRadius" to "32rpx")), "fui-input__clear" to padStyleMapOf(utsMapOf("width" to "32rpx", "height" to "32rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "position" to "absolute", "left" to 0, "top" to 0, "transform" to "scale(0.5)")), "fui-input__clear-a" to padStyleMapOf(utsMapOf("width" to "32rpx", "borderWidth" to "2rpx", "borderStyle" to "solid", "borderColor" to "#ffffff", "backgroundColor" to "#ffffff", "boxSizing" to "border-box")), "fui-input__clear-b" to padStyleMapOf(utsMapOf("height" to "32rpx", "borderWidth" to "2rpx", "borderStyle" to "solid", "borderColor" to "#ffffff", "backgroundColor" to "#ffffff", "boxSizing" to "border-box")), "fui-input__placeholder" to padStyleMapOf(utsMapOf("color" to "#CCCCCC", "overflow" to "visible")), "fui-input__disabled" to padStyleMapOf(utsMapOf("pointerEvents" to "none")), "fui-input__disabled-styl" to padStyleMapOf(utsMapOf("opacity" to 0.6)));
            }
        var inheritAttrs = true;
        var inject: Map<String, Map<String, Any?>> = utsMapOf();
        var emits: Map<String, Any?> = utsMapOf("input" to null, "update:modelValue" to null, "focus" to null, "blur" to null, "confirm" to null, "onclick" to null, "keyboardheightchange" to null);
        var props = normalizePropsOptions(utsMapOf("required" to utsMapOf("type" to "Boolean", "default" to false), "requiredColor" to utsMapOf("type" to "String", "default" to ""), "label" to utsMapOf("type" to "String", "default" to ""), "labelSize" to utsMapOf("type" to "Number", "default" to 0), "labelColor" to utsMapOf("type" to "String", "default" to "#333"), "labelWidth" to utsMapOf("type" to "Number", "default" to 140), "clearable" to utsMapOf("type" to "Boolean", "default" to false), "clearColor" to utsMapOf("type" to "String", "default" to "#CCCCCC"), "focus" to utsMapOf("type" to "Boolean", "default" to false), "placeholder" to utsMapOf("type" to "String", "default" to ""), "placeholderStyle" to utsMapOf("type" to "String", "default" to ""), "name" to utsMapOf("type" to "String", "default" to ""), "value" to utsMapOf("type" to utsArrayOf(
            "Object",
            "String",
            "Number"
        ), "default" to ""), "modelValue" to utsMapOf("type" to utsArrayOf(
            "Object",
            "String",
            "Number"
        ), "default" to ""), "type" to utsMapOf("type" to "String", "default" to "text"), "password" to utsMapOf("type" to "Boolean", "default" to false), "disabled" to utsMapOf("type" to "Boolean", "default" to false), "disabledStyle" to utsMapOf("type" to "Boolean", "default" to false), "readonly" to utsMapOf("type" to "Boolean", "default" to false), "maxlength" to utsMapOf("type" to "Number", "default" to 140), "min" to utsMapOf("type" to "Number", "default" to -1), "max" to utsMapOf("type" to "Number", "default" to -1), "cursorSpacing" to utsMapOf("type" to "Number", "default" to 0), "cursorColor" to utsMapOf("type" to "String", "default" to ""), "confirmType" to utsMapOf("type" to "String", "default" to "done"), "confirmHold" to utsMapOf("type" to "Boolean", "default" to false), "cursor" to utsMapOf("type" to "Number", "default" to -1), "selectionStart" to utsMapOf("type" to "Number", "default" to -1), "selectionEnd" to utsMapOf("type" to "Number", "default" to -1), "adjustPosition" to utsMapOf("type" to "Boolean", "default" to true), "size" to utsMapOf("type" to "Number", "default" to 0), "color" to utsMapOf("type" to "String", "default" to "#333"), "inputBorder" to utsMapOf("type" to "Boolean", "default" to false), "isFillet" to utsMapOf("type" to "Boolean", "default" to false), "radius" to utsMapOf("type" to "Number", "default" to 0), "borderTop" to utsMapOf("type" to "Boolean", "default" to false), "topLeft" to utsMapOf("type" to "Number", "default" to 0), "topRight" to utsMapOf("type" to "Number", "default" to 0), "borderBottom" to utsMapOf("type" to "Boolean", "default" to true), "bottomLeft" to utsMapOf("type" to "Number", "default" to 32), "bottomRight" to utsMapOf("type" to "Number", "default" to 0), "borderColor" to utsMapOf("type" to "String", "default" to ""), "trim" to utsMapOf("type" to "Boolean", "default" to true), "textAlign" to utsMapOf("type" to "String", "default" to "left"), "padding" to utsMapOf("type" to "String", "default" to "28rpx 32rpx"), "backgroundColor" to utsMapOf("type" to "String", "default" to "#FFFFFF"), "marginTop" to utsMapOf("type" to "Number", "default" to 0)));
        var propsNeedCastKeys = utsArrayOf(
            "required",
            "requiredColor",
            "label",
            "labelSize",
            "labelColor",
            "labelWidth",
            "clearable",
            "clearColor",
            "focus",
            "placeholder",
            "placeholderStyle",
            "name",
            "value",
            "modelValue",
            "type",
            "password",
            "disabled",
            "disabledStyle",
            "readonly",
            "maxlength",
            "min",
            "max",
            "cursorSpacing",
            "cursorColor",
            "confirmType",
            "confirmHold",
            "cursor",
            "selectionStart",
            "selectionEnd",
            "adjustPosition",
            "size",
            "color",
            "inputBorder",
            "isFillet",
            "radius",
            "borderTop",
            "topLeft",
            "topRight",
            "borderBottom",
            "bottomLeft",
            "bottomRight",
            "borderColor",
            "trim",
            "textAlign",
            "padding",
            "backgroundColor",
            "marginTop"
        );
        var components: Map<String, CreateVueComponent> = utsMapOf();
    }
}
