import login from '../components/login'
import home from '../components/home'
import addsql from '../page/addsql'
import charge from '../page/charge'

const routes = [
  // 主页路由,直接重定向到登陆页
  {
    path: '/',
    component: login,
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  // 登陆后的主页面
  {
    path: '/home',
    component: home,
    children: [
      {
        path: '/home/addsql',
        component: addsql
      },
      {
        path: '/home/charge',
        component: charge
      }
    ]
  }
]

export default routes
