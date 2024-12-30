import App from './App.uvue'

import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
export function main(app: IApp) {
    definePageRoutes();
    defineAppConfig();
    
    (createApp()['app'] as VueApp).mount(app, GenUniApp());
}

export class UniAppConfig extends io.dcloud.uniapp.appframe.AppConfig {
    override name: string = "chat-app"
    override appid: string = "__UNI__3FAEF30"
    override versionName: string = "1.0.0"
    override versionCode: string = "100"
    override uniCompilerVersion: string = "4.36"
    
    constructor() { super() }
}

import GenPagesLoginIndexClass from './pages/login/index.uvue?type=page'
import GenPagesIndexIndexClass from './pages/index/index.uvue?type=page'
function definePageRoutes() {
__uniRoutes.push({ path: "pages/login/index", component: GenPagesLoginIndexClass, meta: { isQuit: true } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","登录"],["navigationBarBackgroundColor","#165af7"],["navigationBarTextStyle","#ffffff"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/index", component: GenPagesIndexIndexClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","uni-app x"]]) } as UniPageRoute)
}
const __uniTabBar: Map<string, any | null> | null = null
const __uniLaunchPage: Map<string, any | null> = utsMapOf([["url","pages/login/index"],["style",utsMapOf([["navigationBarTitleText","登录"],["navigationBarBackgroundColor","#165af7"],["navigationBarTextStyle","#ffffff"]])]])
function defineAppConfig(){
  __uniConfig.entryPagePath = '/pages/login/index'
  __uniConfig.globalStyle = utsMapOf([["navigationBarTextStyle","black"],["navigationBarTitleText","聊天App"],["navigationBarBackgroundColor","#F8F8F8"],["backgroundColor","#F8F8F8"]])
  __uniConfig.getTabBarConfig = ():Map<string, any> | null =>  null
  __uniConfig.tabBar = __uniConfig.getTabBarConfig()
  __uniConfig.conditionUrl = ''
  __uniConfig.uniIdRouter = utsMapOf()
  
  __uniConfig.ready = true
}
