<template>
  <vneo-scroll ref="scrollRef" :load="load" is-refresh-by-show height="100vh">
    <template #default="{ item }: { item: ArticlesList.ListItem }">
      <vneo-articles-card :data="item" @remove="remove(item)" />
    </template>
  </vneo-scroll>
</template>

<script setup lang="ts">
import VneoArticlesCard from '@/components/service/vneo-articles-card/index.vue'

import { ref } from 'vue'
import { list } from '@/api/articles'
import { useAppStore } from '@/store/modules/app'
import { useDidShow, setNavigationBarTitle } from '@tarojs/taro'

import type { ArticlesList } from '@/api/articles/type'
import type { PageConfig } from '@/components/common/vneo-scroll/type'

const store = useAppStore()
const scrollRef = ref<any>(null)

const load = async (pageConfig: PageConfig) => {
  return await list({
    ...pageConfig,
    search: {
      type: 1,
      isPersonal: true
    }
  })
}

const remove = (data: ArticlesList.ListItem) => scrollRef.value.updateRecord('remove', data)

// 设置标题
useDidShow(() => !store.isCheck && setNavigationBarTitle({ title: '我的文章' }))
</script>
