<script
  setup
  lang="ts"
>
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 18,
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
      d="M12 5v14M5 12h14"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
