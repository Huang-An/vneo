import { computed } from 'vue'
import { add, remove } from '@/api/articles-like-collect'
import { useUserStoreWithOut } from '@/store/modules/user'

import type { Ref } from 'vue'
import type { Data, ArticlesLikeCollectType, ArticlesLikeCollectParams } from './type'

export default (currentData: Ref<Data>) => {
  const store = useUserStoreWithOut()

  // 是否收藏
  const isCollect = computed(
    () =>
      !!currentData.value.likeCollectList.filter(item => item.type === 1 && item.createUserById === store.getUserId)
        .length
  )

  // 收藏数量
  const collectCount = computed(() => currentData.value.likeCollectList.filter(item => item.type === 1).length)

  // 是否点赞
  const isLike = computed(
    () =>
      !!currentData.value.likeCollectList.filter(item => item.type === 2 && item.createUserById === store.getUserId)
        .length
  )

  // 点赞数量
  const likeCount = computed(() => currentData.value.likeCollectList.filter(item => item.type === 2).length)

  // 更新 likeCollectList
  const updateLikeCollectList = (params: ArticlesLikeCollectParams, isRemove: boolean) => {
    const { likeCollectList } = currentData.value

    // 移除
    if (isRemove) {
      const index = likeCollectList.findIndex(
        item => item.type === params.type && item.articlesId === params.articlesId
      )

      index !== -1 && likeCollectList.splice(index, 1)

      return
    }

    // 新增
    likeCollectList.push({ ...params, createUserById: store.getUserId } as any)
  }

  // 点赞、收藏
  const likeCollectHandler = async (type: ArticlesLikeCollectType, isRemove: boolean) => {
    const params = {
      type,
      articlesId: currentData.value._id
    }

    isRemove ? await remove(params) : await add(params)

    updateLikeCollectList(params, isRemove)
  }

  return { isCollect, collectCount, isLike, likeCount, likeCollectHandler }
}
