import login from '../page/login/login'
import home from '../page/home/home'
import user from '../page/home/user/user'
import UserPermissions from '../page/home/user/UserPermissions'
import project from '../page/home/ProjectManage/project'
import model from '../page/home/ProjectManage/model'
import ApiManage from '../page/home/ProjectManage/ApiManage/ApiManage'
import webcome from '../page/webcome/webcome'
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
      },
      {
        path: '/home/ApiManage',
        component: ApiManage
      }
    ]
  }
]

export default routes
