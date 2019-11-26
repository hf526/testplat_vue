import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}
Vue.use(Message)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
