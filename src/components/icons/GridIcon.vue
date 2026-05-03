<script
  setup
  lang="ts"
>
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 16,
});
</script>

<template>
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
  </svg>
</template>
