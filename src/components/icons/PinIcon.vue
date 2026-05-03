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
    <g transform="translate(0, 1.2)">
      <path
        d="M15.293 11.707a1 1 0 01-1.414 0L10 8l-3.879 3.707a1 1 0 01-1.414-1.414l4.586-4.586a1 1 0 011.414 0l4.586 4.586a1 1 0 010 1.414z"
      />
    </g>
  </svg>
</template>
