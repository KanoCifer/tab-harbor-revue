<script
  setup
  lang="ts"
>
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 12,
});
</script>

<template>
  <svg
    viewBox="0 0 16 16"
    fill="none"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <path
      d="M13.5 4.5L6.5 11.5L3 8"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
