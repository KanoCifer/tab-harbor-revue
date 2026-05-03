<script
  setup
  lang="ts"
>
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 20,
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
      d="M18 6L6 18M6 6l12 12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
