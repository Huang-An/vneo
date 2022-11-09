<template>
  <vneo-scroll :load="load">
    <template #default="{ item }: { item: ListItem }">
      <vneo-square-card :data="item" />
    </template>
  </vneo-scroll>
</template>

<script setup lang="ts">
import VneoSquareCard from '@/components/service/vneo-square-card/index.vue'

import { list } from '@/api/articles'

import type { ListItem } from '@/api/articles/type'
import type { PageConfig } from '@/components/common/vneo-scroll/type'

const load = async (pageConfig: PageConfig) => await list({ ...pageConfig })
</script>
