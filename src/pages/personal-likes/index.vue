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
import { listByLikeOrCollect } from '@/api/articles'

import type { ArticlesList } from '@/api/articles/type'
import type { PageConfig } from '@/components/common/vneo-scroll/type'

const scrollRef = ref<any>(null)

const load = async (pageConfig: PageConfig) => await listByLikeOrCollect({ ...pageConfig, search: { type: 2 } })

const remove = (data: ArticlesList.ListItem) => scrollRef.value.updateRecord('remove', data)
</script>
