import { remove } from '@/api/articles'
import { showModal } from '@tarojs/taro'
import { useUserStoreWithOut } from '@/store/modules/user'

import type { Data } from './type'

export const actions = [
  {
    name: '删除',

    // 显示权限
    power: (data: Data) => {
      const store = useUserStoreWithOut()
      return store.getUserId === data.createUserById
    },

    // 操作方法
    method: async (params: Data, emits: Function) => {
      const { confirm } = await showModal({
        title: '提示',
        content: '删除之后无法恢复，是否删除？'
      })

      if (!confirm) return

      // 调用删除
      const { data } = await remove({ _id: params._id })

      // 删除成功 触发回调
      data && emits('remove', data)
    }
  }
]
