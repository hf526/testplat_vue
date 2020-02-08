import login from '../page/login/login'
import home from '../page/home/home'
import addsql from '../page/addsql'
import charge from '../page/charge'
import user from '../page/user/user'
import UserPermissions from '../page/user/UserPermissions'
import project from '../page/ProjectManage/project'
import model from '../page/ProjectManage/model'
import webcome from '../page/webcome'
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
    redirect: '/home/webcome',
    children: [
      {
        path: '/home/webcome',
        component: webcome
      },
      {
        path: '/home/addsql',
        component: addsql
      },
      {
        path: '/home/charge',
        component: charge
      },
      {
        path: '/home/user',
        component: user
      },
      {
        path: '/home/UserPermissions',
        component: UserPermissions
      },
      {
        path: '/home/project',
        component: project
      },
      {
        path: '/home/model',
        component: model
      }
    ]
  }
]

export default routes
