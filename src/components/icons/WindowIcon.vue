<script
  setup
  lang="ts"
>
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 80,
});
</script>

<template>
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <rect
      x="8"
      y="12"
      width="48"
      height="40"
      rx="4"
    />
    <path d="M8 20h48" />
    <circle
      cx="16"
      cy="16"
      r="2"
      fill="currentColor"
    />
    <circle
      cx="24"
      cy="16"
      r="2"
      fill="currentColor"
    />
    <circle
      cx="32"
      cy="16"
      r="2"
      fill="currentColor"
    />
  </svg>
</template>
