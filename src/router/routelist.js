import Login from '../components/Login'
import home from '../components/home'

const routes = [
  {
    path: '/',
    component: Login,
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: home
  }
]

export default routes
