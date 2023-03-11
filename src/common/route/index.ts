import { loginInquiry } from '@/common/helper'
import { NO_PERMISSION_INFO } from '@/constant'
import { routes, createTabbarList } from './routes'
import { useUserStoreWithOut } from '@/store/modules/user'
import { redirectTo, switchTab, navigateTo } from '@tarojs/taro'
import { getRouteByName, getRouteByPath, isWhiteByPath, isLoginByPath, foramtPathByParams } from './helper'

export { routes, createTabbarList }

export { getRouteByName, getRouteByPath, isWhiteByPath, isLoginByPath }

// 路由跳转
export const go = async (
  name: string,
  type: 'redirectTo' | 'switchTab' | 'navigateTo' = 'navigateTo',
  option?: Omit<Taro.navigateTo.Option, 'url'> & { params?: Record<string, any> }
) => {
  const route = getRouteByName(name)
  const store = useUserStoreWithOut()

  if (!route) return

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
