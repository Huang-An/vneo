// 根据名称获取路由配置
import { routes } from './routes'

// 根据名称 获取路由
export const getRouteByName = (name: string) => {
  return routes.find(route => route.name === name)
}

// 根据路径 获取路由
export const getRouteByPath = (path: string) => {
  path = path.split('?')[0]

  return routes.find(route => route.path === path || `/${route.path}` === path)
}

// 根据路径 判断是否是白名单
export const isWhiteByPath = (path: string) => {
  const route = getRouteByPath(path)

  return route && route.meta && route.meta.isWhite
}

// 根据路径 判断是否是登录页
export const isLoginByPath = (path: string) => {
  const route = getRouteByPath(path)

  return route && route.meta && route.meta.isLogin
}

// 处理参数路径
export const foramtPathByParams = (path: string, params: Record<string, any> = {}) => {
  let param = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')

  return param ? `/${path}?${param}` : `/${path}`
}
