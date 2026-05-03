<script setup lang="ts">

import QuickLinkFrame from '@/components/dashboard/QuickLinkFrame.vue';

const emit = defineEmits<{
  click: [],
}>();
</script>

<template>
  <QuickLinkFrame
    title="Add Link"
    hide_title
    is_add
    @click_icon="emit('click')"
  >
    <div class="add-icon">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M12 5v14M5 12h14"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </QuickLinkFrame>
</template>

<style scoped lang="scss">
.add-icon {
  color: var(--theme-c-text-muted);
}
</style>