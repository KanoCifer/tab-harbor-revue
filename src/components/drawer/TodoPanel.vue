<script
  setup
  lang="ts"
>
import { computed, ref, nextTick } from 'vue';
import { useTodosStore } from '@/stores';
import TodoItem from './TodoItem.vue';
import SearchInput from './SearchInput.vue';
import NewTodo from '@/components/drawer/comp/NewTodo.vue';
import { VueDraggable } from 'vue-draggable-plus';

const todosStore = useTodosStore();

const searchQuery = ref('');
const isDragging = ref(false);

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  // 显示所有 todo，包括已完成的
  const allItems = todosStore.items.filter(i => !i.dismissed);

  if (!query) return allItems;
  return allItems.filter(i =>
    i.title.toLowerCase().includes(query) || i.description.toLowerCase().includes(query)
  );
});

async function handleAddTodo(title: string, description?: string) {
  if (!title.trim()) return;
  await todosStore.add(title.trim(), description?.trim() || '');
}

function onDragStart() {
  isDragging.value = true;
}

async function onDragEnd() {
  await todosStore.save();
}

function onModelUpdate() {
  // 数据更新后立即禁用动画，避免二次动画
  nextTick(() => {
    isDragging.value = false;
  });
}
</script>

<template>
  <div class="todo-panel">
    <SearchInput
      v-model="searchQuery"
      placeholder="Search todos..."
    />
    <NewTodo @submit="handleAddTodo" />
    <div
      v-if="filteredItems.length === 0"
      class="empty-state"
    >
      <p>No todos yet.</p>
      <p class="empty-hint">Click the button above to add your first todo.</p>
    </div>
    <VueDraggable
      v-else
      v-model="todosStore.items"
      :animation="150"
      :force-fallback="false"
      target=".items-list"
      class="items-list-wrapper"
      @start="onDragStart"
      @end="onDragEnd"
      @update:model-value="onModelUpdate"
    >
      <TransitionGroup
        :name="!isDragging ? 'todo-list' : undefined"
        tag="div"
        class="items-list"
      >
        <TodoItem
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
        />
      </TransitionGroup>
    </VueDraggable>
  </div>
</template>

<style
  scoped
  lang="scss"
>
.todo-panel {
  display:        flex;
  flex-direction: column;
  gap:            var(--space-4);
}

.empty-state {
  padding:    var(--space-8);
  text-align: center;
  color:      var(--theme-c-text-muted);
}

.empty-hint {
  font-size: 0.875rem;
}

.items-list-wrapper {
  min-height: 0;
}

.items-list {
  display:        flex;
  flex-direction: column;
  gap:            var(--space-2);
}

// Transition Group 动画
.todo-list-move,
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all var(--transition-base);
}

.todo-list-enter-from {
  transform: translateY(-20px);
  opacity:   0;
}

.todo-list-leave-to {
  transform: translateX(100%);
  opacity:   0;
}

.todo-list-leave-active {
  position: absolute;
}
</style>
