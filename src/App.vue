<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useTabsStore, useDeferredStore, useTodosStore, useThemeStore, useSettingsStore } from '@/stores'
import AppLayout from '@/components/layout/AppLayout.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'

const tabsStore = useTabsStore()
const deferredStore = useDeferredStore()
const todosStore = useTodosStore()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()

onMounted(async () => {
  // 加载设置
  settingsStore.loadSettings()
  
  // 首先获取当前标签页
  await Promise.all([
    tabsStore.fetchTabs(),
    deferredStore.load(),
    todosStore.load(),
  ])
  
  // 开始监听标签页变化
  tabsStore.startListening()
})

onUnmounted(() => {
  // 组件卸载时停止监听
  tabsStore.stopListening()
})
</script>

<template>
  <AppLayout>
    <Dashboard />
  </AppLayout>
</template>
