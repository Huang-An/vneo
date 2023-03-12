import { loginInquiry } from '@/common/helper'
import { routes, createTabbarList } from './routes'
import { useUserStoreWithOut } from '@/store/modules/user'
import { NO_PERMISSION_INFO, PRIVATE_INFO } from '@/constant'
import { redirectTo, switchTab, navigateTo } from '@tarojs/taro'
import {
  getRouteByName,
  getRouteByPath,
  isWhiteByPath,
  isLoginByPath,
  isPrivateByPath,
  foramtPathByParams
} from './helper'

export { routes, createTabbarList }

export { getRouteByName, getRouteByPath, isWhiteByPath, isLoginByPath, isPrivateByPath }

// 路由跳转
export const go = async (
  name: string,
  type: 'redirectTo' | 'switchTab' | 'navigateTo' = 'navigateTo',
  option?: Omit<Taro.navigateTo.Option, 'url'> & { params?: Record<string, any> }
) => {
  const route = getRouteByName(name)
  const store = useUserStoreWithOut()

  if (!route) return

  // 不允许访问未开放页面
  if (isPrivateByPath(route.path)) {
    throw new Error(JSON.stringify(PRIVATE_INFO))
  }

  // 如果未登录，并且不是白名单，提示先登录
  if (!store.getUserId && !isWhiteByPath(route.path)) {
    loginInquiry()

    throw new Error(JSON.stringify(NO_PERMISSION_INFO))
  }

  const url = foramtPathByParams(route.path, option && option.params ? option.params : {})

  if (type === 'navigateTo') {
    navigateTo({ url, ...option })
  } else if (type === 'redirectTo') {
    redirectTo({ url, ...option })
  } else if (type === 'switchTab') {
    switchTab({ url, ...option })
  }
}
