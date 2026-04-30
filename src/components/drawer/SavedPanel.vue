<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useDeferredStore } from '@/stores'
import DeferredItem from './DeferredItem.vue'
import SearchInput from './SearchInput.vue'
import { VueDraggable } from 'vue-draggable-plus'

const deferredStore = useDeferredStore()

const searchQuery = ref('')
const isDragging = ref(false)

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const activeItems = deferredStore.activeItems()
  
  if (!query) return activeItems
  return activeItems.filter(i =>
    i.title.toLowerCase().includes(query) || i.url.toLowerCase().includes(query)
  )
})

function onDragStart() {
  isDragging.value = true
}

async function onDragEnd() {
  await deferredStore.save()
}

function onModelUpdate() {
  // 数据更新后立即禁用动画，避免二次动画
  nextTick(() => {
    isDragging.value = false
  })
}
</script>

<template>
  <div class="saved-panel">
    <SearchInput v-model="searchQuery" placeholder="Search saved pages..." />
    <div v-if="filteredItems.length === 0" class="empty-state">
      <p>No saved pages yet.</p>
      <p class="empty-hint">Click the bookmark icon on any tab to save it.</p>
    </div>
    <VueDraggable
      v-else
      v-model="deferredStore.items"
      :animation="150"
      :force-fallback="false"
      target=".items-list"
      class="items-list-wrapper"
      @start="onDragStart"
      @end="onDragEnd"
      @update:model-value="onModelUpdate"
    >
      <TransitionGroup
        tag="div"
        class="items-list"
        :name="!isDragging ? 'saved-list' : undefined"
      >
        <DeferredItem
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
        />
      </TransitionGroup>
    </VueDraggable>
  </div>
</template>

<style scoped lang="scss">
.saved-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.empty-state {
  text-align: center;
  padding: var(--space-8);
  color: var(--theme-c-text-muted);
}

.empty-hint {
  font-size: 0.875rem;
}

.items-list-wrapper {
  min-height: 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

// 拖拽过渡动画
.saved-list-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.saved-list-enter-active,
.saved-list-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.saved-list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.saved-list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.saved-list-leave-active {
  position: absolute;
}
</style>
