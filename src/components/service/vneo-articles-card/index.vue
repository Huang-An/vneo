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
      <div class="vneo-articles-card__footer--item" @click.stop="likeCollectHandler(1, isCollect)">
        <nut-icon :class="isCollect ? 'is-active' : ''" :name="isCollect ? 'star-fill-n' : 'star-n'" />

        <span class="text">{{ collectCount || '' }}</span>
      </div>

      <!-- 点赞 -->
      <div class="vneo-articles-card__footer--item" @click.stop="likeCollectHandler(2, isLike)">
        <nut-icon :class="isLike ? 'is-active' : ''" :name="isLike ? 'heart-fill' : 'heart1'" />
        <span class="text">{{ likeCount || '' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import userInit from '../details-common/userInit'
import imageInit from '../details-common/imageInit'
import actionsInit from '../details-common/actionsInit'
import operateInit from '../details-common/operateInit'

import { ref, watch } from 'vue'
import { go } from '@/common/route'
import { format } from '@/common/helper'

import type { PropType } from 'vue'
import type { Data } from '../details-common/type'

const emits = defineEmits(['remove'])

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<Data>
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

// user int
const { userName, avatar } = userInit(currentData)

// image init
const { imageList, openImagePreview } = imageInit(currentData)

// action init
const { actionList, openActionSheet } = actionsInit(currentData, emits)

// operate init
const { isCollect, collectCount, isLike, likeCount, likeCollectHandler } = operateInit(currentData)

// 打开详情页
const openArticlesDetail = () => {
  go('articles-detail', 'navigateTo', {
    params: {
      articlesId: currentData.value._id
    }
  })
}
</script>
