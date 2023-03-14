<template>
  <div class="vneo-articles-detail">
    <!-- 用户信息 -->
    <div class="vneo-articles-detail__user">
      <!-- 用户头像 -->
      <image :src="avatar" mode="aspectFill" class="vneo-articles-detail__user--avatar" />

      <!-- 用户信息 -->
      <div class="vneo-articles-detail__user--userinfo">
        <div class="vneo-articles-detail__user--username">{{ userName }}</div>

        <div class="vneo-articles-detail__user--date">{{ format(currentData.createDate) }}</div>
      </div>
    </div>

    <!-- body -->
    <div class="vneo-articles-detail__body">
      <!-- 标题 -->
      <div class="vneo-articles-detail__body--title">{{ currentData.title }}</div>

      <!-- 内容 -->
      <div class="vneo-articles-detail__body--content">{{ currentData.content }}</div>

      <!-- 图片列表 -->
      <div
        v-for="(item, index) in currentData.imageList"
        :key="index"
        :src="item"
        class="vneo-articles-detail__body--image"
        @click.stop="openImagePreview(item)"
      >
        <image :src="item" mode="aspectFill" />
      </div>
    </div>

    <!-- footer -->
    <div class="vneo-articles-detail__footer">
      <!-- 收藏 -->
      <div class="vneo-articles-detail__footer--item" @click.stop="likeCollectHandler(1, isCollect)">
        <nut-icon :class="isCollect ? 'is-active' : ''" :name="isCollect ? 'star-fill-n' : 'star-n'" />

        <span class="text">{{ collectCount || '' }}</span>
      </div>

      <!-- 点赞 -->
      <div class="vneo-articles-detail__footer--item" @click.stop="likeCollectHandler(2, isLike)">
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
import operateInit from '../details-common/operateInit'

import { ref, watch } from 'vue'
import { format } from '@/common/helper'

import type { PropType } from 'vue'
import type { Data } from '../details-common/type'

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<Data>
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
const { openImagePreview } = imageInit(currentData)

// operate init
const { isCollect, collectCount, isLike, likeCount, likeCollectHandler } = operateInit(currentData)
</script>
