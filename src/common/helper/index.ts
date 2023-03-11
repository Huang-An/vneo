import { go } from '@/common/route'
import { showModal } from '@tarojs/taro'

export * from './day'
export * from './storage'

// 登录询问
export const loginInquiry = async (cancelCallback?: Function) => {
  const { confirm } = await showModal({ title: '登录后进行操作' })

  if (confirm) {
    go('login')
    return
  }

  cancelCallback && cancelCallback()
}
