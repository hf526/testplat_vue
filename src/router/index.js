import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../router/routelist'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

// 路由守卫,路由改变会触发
router.beforeEach(async (to, from, next) => {
  // 判断路径不是登陆或者主页就要进行token验证，否则直接跳转登陆
  if (to.path !== '/login' && to.path !== '/') {
    const token = window.sessionStorage.getItem('token')
    await axios.post('/verifytoken', { 'token': token }).then(response => {
      if (response.data.status === 200) {
        next()
      } else {
        next('/login')
      }
    }).catch(function (error) {
      this.$message.error('网络异常或服务器异常，请重试！')
      console.log(error)
    })
  }
  next()
})

// 请求拦截器

export default router
