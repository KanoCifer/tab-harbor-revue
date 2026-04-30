<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checked = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  checked.value = val
})

watch(checked, (val) => {
  emit('update:modelValue', val)
})

function toggle() {
  checked.value = !checked.value
}
</script>

<template>
  <button
    class="checkbox"
    :class="{ 'checkbox--checked': checked }"
    type="button"
    role="checkbox"
    :aria-checked="checked"
    @click="toggle"
  >
    <svg v-if="checked" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.5 4.5L6.5 11.5L3 8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<style scoped lang="scss">
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--theme-c-border);
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.checkbox:hover {
  border-color: var(--theme-c-accent);
}

.checkbox--checked {
  background: var(--theme-c-accent);
  border-color: var(--theme-c-accent);
}

.checkbox--checked svg {
  color: white;
}

.checkbox svg {
  width: 12px;
  height: 12px;
}
</style>
