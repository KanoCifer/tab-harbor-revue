<script
  setup
  lang="ts"
>
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 14,
});
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
</template>
