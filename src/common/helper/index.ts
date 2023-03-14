import { go } from '@/common/route'
import { showModal } from '@tarojs/taro'

export * from './day'
export * from './storage'

// 控制只展示一个 登录询问
let isLoginInquiry = false

// 登录询问
export const loginInquiry = async (cancelCallback?: Function) => {
  if (isLoginInquiry) return

  isLoginInquiry = true

  try {
    const { confirm } = await showModal({ title: '登录后进行操作' })

    if (confirm) {
      go('login')
      return
    }

    cancelCallback && cancelCallback()
  } finally {
    isLoginInquiry = false
  }
}
