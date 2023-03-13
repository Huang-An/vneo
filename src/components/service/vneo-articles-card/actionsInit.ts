import { remove } from '@/api/articles'
import { reactive, computed } from 'vue'
import { showModal, showActionSheet } from '@tarojs/taro'
import { useUserStoreWithOut } from '@/store/modules/user'

import type { Ref } from 'vue'
import type { Data } from './type'

export default (currentData: Ref<Data>, emits: Function) => {
  const store = useUserStoreWithOut()

  const actions = reactive([
    {
      name: '删除',

      // 显示权限
      power: (data: Data) => store.getUserId && store.getUserId === data.createUserById,

      // 操作方法
      method: async (params: Data, emits: Function) => {
        const { confirm } = await showModal({
          title: '删除文章',
          content: '删除之后无法恢复，是否删除？'
        })

        if (!confirm) return

        // 调用删除
        const { data } = await remove({ _id: params._id })

        // 删除成功 触发回调
        data && emits('remove', data)
      }
    }
  ])

  // 可对文章进行的操作列表
  const actionList = computed(() => actions.filter(item => item.power(currentData.value)))

  // 打开操作栏
  const openActionSheet = async () => {
    const { tapIndex } = await showActionSheet({
      itemList: actionList.value.map(item => item.name)
    })

    // 执行操作
    await actionList.value[tapIndex].method(currentData.value, emits)
  }

  return {
    actionList,
    openActionSheet
  }
}
