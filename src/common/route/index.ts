import { routes, createTabbarList } from './routes'
import { redirectTo, switchTab, navigateTo } from '@tarojs/taro'

export { routes, createTabbarList }

// 根据名称获取路由配置
export const getRouteByName = (name: string) => {
  return routes.find(route => route.name === name)
}

// 根据路径获取路由配置
export const getRouteByPath = (path: string) => {
  return routes.find(route => route.path === path || `/${route.path}` === path)
}

// 判断路径是否是白名单
export const isWhiteByPath = (path: string) => {
  const route = getRouteByPath(path)

  return route && route.meta && route.meta.isWhite
}

export const isLoginByPath = (path: string) => {
  const route = getRouteByPath(path)

  return route && route.meta && route.meta.isLogin
}

export const redirectToByName = (name: string) => {
  const route = getRouteByName(name)

  route && redirectTo({ url: `/${route.path}` })
}

export const switchTabByName = (name: string) => {
  const route = getRouteByName(name)

  route && switchTab({ url: `/${route.path}` })
}

export const navigateToByName = (name: string, option?: Omit<Taro.navigateTo.Option, 'url'>) => {
  const route = getRouteByName(name)

  route && navigateTo({ url: `/${route.path}`, ...option })
}
