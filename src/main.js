import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/global.css'
// 导入图表样式
import './assets/font/font_uz6o0eiave/iconfont.css'
// 导入请求库axios
import axios from 'axios'

axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/238069'
// 必须使用这个进行注册
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
