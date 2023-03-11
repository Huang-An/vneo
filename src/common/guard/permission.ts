import { loginInquiry } from '@/common/helper'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { isWhiteByPath, isLoginByPath } from '@/common/route'

export const setupPermissionGuard = (path: string) => {
  const appStore = useAppStoreWithOut()
  const userStore = useUserStoreWithOut()

  if (!userStore.getUserId && !isWhiteByPath(path)) {
    loginInquiry(() => {
      appStore.goHome()
    })

    return
  }

  if (userStore.getUserId && isLoginByPath(path)) {
    appStore.goHome()
  }
}
