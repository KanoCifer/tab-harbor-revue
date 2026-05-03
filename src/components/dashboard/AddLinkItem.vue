<script setup lang="ts">
import QuickLinkFrame from '@/components/dashboard/QuickLinkFrame.vue';
import { AddIcon } from '@/components/icons';

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
      <AddIcon :size="28" />
    </div>
  </QuickLinkFrame>
</template>

<style scoped lang="scss">
.add-icon {
  color: var(--theme-c-text-muted);
}
</style>