<template>
  <div class="vneo-articles-card">
    <!-- head -->
    <div class="vneo-articles-card__head">
      <!-- 用户头像 -->
      <image :src="avatar" mode="aspectFill" class="vneo-articles-card__head--avatar" />

      <!-- 用户信息 -->
      <div class="vneo-articles-card__head--user">
        <div class="vneo-articles-card__head--username">{{ userName }}</div>

        <div class="vneo-articles-card__head--date">{{ format(currentData.createDate) }}</div>
      </div>

      <!-- 操作栏 -->
      <div v-if="actionList.length" class="vneo-articles-card__head--actions" @click="openActionSheet">
        <nut-icon name="more-s" />
      </div>
    </div>

    <!-- body -->
    <div class="vneo-articles-card__body" @click="openArticlesDetail">
      <!-- 标题 -->
      <div class="vneo-articles-card__body--title">{{ currentData.title }}</div>

      <!-- 内容 -->
      <div class="vneo-articles-card__body--content">{{ currentData.content }}</div>

      <!-- 图片列表 -->
      <div class="vneo-articles-card__body--images">
        <div
          v-for="(item, index) in imageList"
          :key="index"
          :class="`vneo-image-wrapper vneo-image-wrapper-${imageList.length}`"
          @click.stop="openImagePreview(item)"
        >
          <div class="vneo-image-wrapper__body">
            <image :src="item" mode="aspectFill" class="vneo-image-wrapper__body--content" />
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div v-if="isShowFooter" class="vneo-articles-card__footer">
      <!-- 收藏 -->
      <div class="vneo-articles-card__footer--item" @click.stop="collectHandler">
        <nut-icon :class="isCollect ? 'is-active' : ''" :name="isCollect ? 'star-fill-n' : 'star-n'" />

        <span class="text">{{ collectCount || '' }}</span>
      </div>

      <!-- 点赞 -->
      <div class="vneo-articles-card__footer--item" @click.stop="likeHandler">
        <nut-icon :class="isLike ? 'is-active' : ''" :name="isLike ? 'heart-fill' : 'heart1'" />
        <span class="text">{{ likeCount || '' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { actions } from './actions'
import { format } from '@/common/helper'
import { ref, computed, watch } from 'vue'
import { likeOrCollect } from '@/api/articles'
import { useUserStore } from '@/store/modules/user'
import { previewImage, showActionSheet } from '@tarojs/taro'
import { PRIVATE_USER_NAME, DEFAULT_AVATAR } from '@/constant'

import type { PropType } from 'vue'
import type { Data, ArticlesLikeOrCollectParams } from './type'

const store = useUserStore()

const emits = defineEmits(['remove'])

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<Data>
  },

  // 是否启用匿名
  enablePrivate: {
    type: Boolean,
    default: true
  },

  // 是否显示底部操作
  isShowFooter: {
    type: Boolean,
    default: true
  }
})

let currentData = ref(props.data)

watch(
  () => props.data,
  () => {
    currentData.value = props.data
  }
)

// 用户名称
const userName = computed(() =>
  props.enablePrivate && currentData.value.isPrivate ? PRIVATE_USER_NAME : currentData.value.userName
)

// 头像
const avatar = computed(() =>
  props.enablePrivate && currentData.value.isPrivate ? DEFAULT_AVATAR : currentData.value.avatar
)

// 图片列表
const imageList = computed(() =>
  Array.isArray(currentData.value.imageList) ? currentData.value.imageList.slice(0, 3) : []
)

// 是否收藏
const isCollect = computed(() => {
  const { likeOrCollectList } = currentData.value

  return !!likeOrCollectList.filter(
    item => item.type === 1 && item.status === 1 && item.createUserById === store.getUserId
  ).length
})

// 收藏数量
const collectCount = computed(() => {
  const { likeOrCollectList } = currentData.value

  return likeOrCollectList.filter(item => item.type === 1 && item.status === 1).length
})

// 是否点赞
const isLike = computed(() => {
  const { likeOrCollectList } = currentData.value

  return !!likeOrCollectList.filter(
    item => item.type === 2 && item.status === 1 && item.createUserById === store.getUserId
  ).length
})

// 点赞数量
const likeCount = computed(() => {
  const { likeOrCollectList } = currentData.value

  return likeOrCollectList.filter(item => item.type === 2 && item.status === 1).length
})

// 可对文章进行的操作列表
const actionList = computed(() => actions.filter(item => item.power(currentData.value)))

// 打开图片预览
const openImagePreview = async (current: string) => {
  if (!current) return

  await previewImage({
    current,
    urls: currentData.value.imageList || []
  })
}

// 收藏
const collectHandler = async () => {
  const params = {
    type: 1 as const,
    status: Number(!isCollect.value),
    articlesId: currentData.value._id
  }

  await likeOrCollect(params)
  updateLikeOrCollectList(params)
}

// 点赞
const likeHandler = async () => {
  const params = {
    type: 2 as const,
    status: Number(!isLike.value),
    articlesId: currentData.value._id
  }

  await likeOrCollect(params)
  updateLikeOrCollectList(params)
}

// 更新 likeOrCollectList
const updateLikeOrCollectList = (params: ArticlesLikeOrCollectParams) => {
  const index = currentData.value.likeOrCollectList.findIndex(
    item => item.type === params.type && item.createUserById === store.getUserId
  )

  // 找到 更新
  if (index !== -1) {
    currentData.value.likeOrCollectList[index] = { ...currentData.value.likeOrCollectList[index], ...params }
    return
  }

  // 找不到 push
  currentData.value.likeOrCollectList.push({ ...params, createUserById: store.getUserId } as any)
}

// 打开操作栏
const openActionSheet = async () => {
  const { tapIndex } = await showActionSheet({
    itemList: actionList.value.map(item => item.name)
  })

  // 执行操作
  await actionList.value[tapIndex].method(currentData.value, emits)
}

// 打开详情页
const openArticlesDetail = () => {}
</script>
