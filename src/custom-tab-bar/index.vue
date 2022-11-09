<template>
  <nut-tabbar :visible="store.tabActiveName" size="26px" @tab-switch="tabSwitch">
    <nut-tabbar-item
      v-for="item in tabBarList"
      :key="item.name"
      :name="item.name"
      :tab-title="item.text"
      :icon="store.tabActiveName === item.name ? item.selectedIcon : item.icon"
      class-prefix="icon"
      font-class-name="iconfont"
    />
  </nut-tabbar>
</template>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true
  }
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { createTabbarList } from '@/common/route'
import { useAppStore } from '@/store/modules/app'
import { Tabbar as NutTabbar, TabbarItem as NutTabbarItem } from '@nutui/nutui-taro'

const store = useAppStore()

const tabBarList = ref(createTabbarList())

const tabSwitch = (tab: { name: string }) => store.switchTab(tab.name)
</script>
