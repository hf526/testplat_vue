import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../router/routelist'

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
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

// 请求拦截器

export default router
