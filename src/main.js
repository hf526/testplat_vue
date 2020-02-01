import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/global.css'
// 导入图表样式
import './assets/font/font_pnifwcrj0uc/iconfont.css'
// 导入请求库axios
import { axios, post, get } from '@/configs/http'
import apilist from './configs/apiconfig'

// 必须使用这个进行注册
Vue.prototype.$http = axios
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.config.productionTip = false
// 注册时路由对象
Vue.prototype.$apilist = apilist

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
