import axios from 'axios'
import QS from 'qs'
// import statuscode from './status_code'

// 创建一个axios实例
let server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求url
  timeout: 3000, // 超时处理
  withCredentials: false // 是否跨域
})
axios.defaults.withCredentials = true
// 添加一个请求拦截器
server.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些操作，比如请求头携带内容
  config.headers.authorization = window.sessionStorage.getItem('token')
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  return config
}, function (error) {
  // Do something with request error
  return error
})

// 添加一个响应拦截器
server.interceptors.response.use(function (res) {
  // 根据返回的状态码来返回响应数据
  if (res.data.code === 401) {
    alert('暂无权限，请重新登录!')
    window.location.href = '/login'
    return false
  } else if (res.data.code !== 200) {
    this.$message.error('未知错误')
  }
  return res
}, function (error) {
  switch (error && error.response && error.response.status) {
    case 400:
      error.message = '请求错误'
      break
    case 401:
      error.message = '未授权，请登录'
      break
    case 403:
      error.message = '拒绝访问'
      break
    case 404:
      error.message = '未找到访问地址'
      break
    case 408:
      error.message = '请求超时'
      break
    case 500:
      error.message = '服务器内部错误'
      break
    case 501:
      error.message = '服务未实现'
      break
    case 502:
      error.message = '网关错误'
      break
    case 503:
      error.message = '服务不可用'
      break
    case 504:
      error.message = '网关超时'
      break
    case 505:
      error.message = 'HTTP版本不受支持'
      break
    default:
      error.message = '未知错误'
      break
  }
  // Do something with response error
  return error
})

export function get (url, params) {
  return new Promise((resolve, reject) => {
    server.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        this.$message.error(err.data)
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    server.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        this.$message.error(err.data)
        reject(err.data)
      })
  })
}

export default server
