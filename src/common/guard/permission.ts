import { loginInquiry } from '@/common/helper'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { isWhiteByPath, isLoginByPath } from '@/common/route'

export const setupPermissionGuard = (path: string) => {
  const appStore = useAppStoreWithOut()
  const userStore = useUserStoreWithOut()

  // 如果未登录，并且访问不是白名单，询问登录，返回首页
  if (!userStore.getUserId && !isWhiteByPath(path)) {
    loginInquiry(() => appStore.goHome())
    return
  }

  // 如果已登录，并且访问登录页，返回首页
  if (userStore.getUserId && isLoginByPath(path)) {
    appStore.goHome()
  }
}
