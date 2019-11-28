import Vue from 'vue'
import { Button, Form, FormItem, Input, Menu, MenuItem, Submenu, Message, Container, Footer, Header, Aside, Main } from 'element-ui'

Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}
Vue.use(Message)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
// Vue.prototype.$message = Message
