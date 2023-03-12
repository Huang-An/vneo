<template>
  <vneo-scroll ref="scrollRef" :load="load" height="calc(100vh - 204rpx)">
    <template #default="{ item }: { item: ArticlesList.ListItem }">
      <vneo-articles-card :data="item" @remove="remove(item)" />
    </template>
  </vneo-scroll>
</template>

<script setup lang="ts">
import VneoArticlesCard from '@/components/service/vneo-articles-card/index.vue'

import { ref } from 'vue'
import { list } from '@/api/articles'
import { eventCenter } from '@tarojs/taro'

import type { ArticlesList } from '@/api/articles/type'
import type { PageConfig } from '@/components/common/vneo-scroll/type'

const scrollRef = ref<any>(null)

const load = async (pageConfig: PageConfig) => {
  return await list({
    ...pageConfig,
    search: {
      type: 1,
      isPersonal: false
    }
  })
}

const remove = (data: ArticlesList.ListItem) => scrollRef.value.updateRecord('remove', data)

// 监听 广场文章发布成功 事件
eventCenter.on('articles-create-by-square', () => {
  scrollRef.value && scrollRef.value.onRefresh()
})
</script>
