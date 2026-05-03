<script
  setup
  lang="ts"
>
withDefaults(defineProps<{
  direction?: 'up' | 'down'
  size?: number
}>(), {
  direction: 'down',
  size: 16,
});
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <path
      v-if="direction === 'up'"
      d="M18 15l-6-6-6 6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-else
      d="M6 9l6 6 6-6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
