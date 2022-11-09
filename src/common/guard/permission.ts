import { useUserStoreWithOut } from '@/store/modules/user'
import { isWhiteByPath, isLoginByPath, redirectToByName, switchTabByName } from '@/common/route'

export const setupPermissionGuard = (path: string) => {
  const store = useUserStoreWithOut()

  if (!store.getUserId && !isWhiteByPath(path)) {
    redirectToByName('login')

    return
  }

  if (store.getUserId && isLoginByPath(path)) {
    switchTabByName('home')
  }
}
