<template>
  <div v-if="currentData.title">
    <vneo-scroll ref="scrollRef" finished-text="暂无更多评论，点击刷新" background-color="#fff" :load="requestComment">
      <template #pre>
        <vneo-articles-details :data="currentData" />

        <div class="vneo-comment__title">
          <div class="vneo-comment__title--text">全部评论：</div>
        </div>
      </template>

      <template #empty>
        <div class="vneo-comment__empty">暂无评论，快去发表吧~</div>
      </template>

      <template #default="{ index, item }">
        <vneo-comment-card :index="index" :data="item" @remove="remove(item)" />
      </template>
    </vneo-scroll>

    <vneo-comment-input :articles-id="currentData._id" />
  </div>

  <vneo-empty v-else />
</template>

<script setup lang="ts">
import './index.scss'

import VneoCommentCard from '@/components/service/vneo-comment-card/index.vue'
import VneoCommentInput from '@/components/service/vneo-comment-input/index.vue'
import VneoArticlesDetails from '@/components/service/vneo-articles-details/index.vue'

import { ref } from 'vue'
import { details } from '@/api/articles'
import { list } from '@/api/articles-comment'
import { useLoad, useShareAppMessage } from '@tarojs/taro'

import type { ArticlesDetails } from '@/api/articles/type'
import type { ArticlesCommentList } from '@/api/articles-comment/type'
import type { PageConfig } from '@/components/common/vneo-scroll/type'

const scrollRef = ref<any>(null)

const currentData = ref<ArticlesDetails.Response>({
  likeCollectList: []
} as any)

// 请求详情
const requestDetails = async (articlesId: string) => {
  if (!articlesId) return

  const { data } = await details({ _id: articlesId })

  currentData.value = data
}

// 请求评论数据
const requestComment = async (pageConfig: PageConfig) => {
  return await list({
    ...pageConfig,
    search: {
      articlesId: currentData.value._id
    }
  })
}

const remove = (data: ArticlesCommentList.ListItem) => scrollRef.value.updateRecord('remove', data)

useLoad(async ({ articlesId }) => {
  currentData.value._id = articlesId

  await requestDetails(articlesId)
})

useShareAppMessage(() => ({
  title: currentData.value.title || ''
}))
</script>
