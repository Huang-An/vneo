<template>
  <vneo-scroll ref="scrollRef" :load="load" is-refresh-by-show>
    <template #default="{ item }: { item: ArticlesList.ListItem }">
      <vneo-articles-card :data="item" :is-show-footer="false" @remove="remove(item)" />
    </template>
  </vneo-scroll>
</template>

<script setup lang="ts">
import VneoArticlesCard from '@/components/service/vneo-articles-card/index.vue'

import { ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { listByLikeOrCollect } from '@/api/articles'
import { useDidShow, setNavigationBarTitle } from '@tarojs/taro'

import type { ArticlesList } from '@/api/articles/type'
import type { PageConfig } from '@/components/common/vneo-scroll/type'

const store = useAppStore()
const scrollRef = ref<any>(null)

const load = async (pageConfig: PageConfig) => await listByLikeOrCollect({ ...pageConfig, search: { type: 1 } })

const remove = (data: ArticlesList.ListItem) => scrollRef.value.updateRecord('remove', data)

// 设置标题
useDidShow(() => !store.isCheck && setNavigationBarTitle({ title: '我的收藏' }))
</script>
