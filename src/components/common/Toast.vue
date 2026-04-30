<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  message: string
}>()

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
    emit('close')
  }, 3000)
})
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="toast">
      {{ message }}
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-3) var(--space-6);
  background: var(--theme-c-text);
  color: var(--theme-c-page-bg);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: all var(--transition-base);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(12px);
}
</style>
