<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}>()
</script>

<template>
  <button
    class="icon-button"
    :class="[`icon-button--${variant || 'default'}`, `icon-button--${size || 'md'}`]"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  color: var(--theme-c-text-muted);
}

.icon-button--default:hover {
  background: var(--theme-c-border);
  color: var(--theme-c-text);
}

.icon-button--danger:hover {
  background: color-mix(in srgb, var(--theme-c-danger) 15%, transparent);
  color: var(--theme-c-danger);
}

.icon-button--sm {
  width: 28px;
  height: 28px;
}

.icon-button--md {
  width: 36px;
  height: 36px;
}

.icon-button svg {
  width: 18px;
  height: 18px;
}

.icon-button--sm svg {
  width: 16px;
  height: 16px;
}
</style>
