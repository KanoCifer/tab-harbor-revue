<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import type { GroupedTabs } from '@/types';
import PageChip from './PageChip.vue';

const props = defineProps<{
  group: GroupedTabs
}>();

const tabs = computed(() => props.group.tabs);

// 移除 www. 前缀用于显示
const displayDomain = computed(() => {
  return props.group.domain.replace(/^www\./, '');
});
</script>

<template>
  <div
    :id="`group-${group.domain}`"
    class="mission-card"
  >
    <div class="mission-card-header">
      <div class="mission-card-title">
        <img
          v-if="group.tabs[0]?.favIconUrl"
          :src="group.tabs[0].favIconUrl"
          class="mission-card-favicon"
          alt=""
        />
        <span class="mission-card-domain">{{ displayDomain }}</span>
      </div>
    </div>
    <div class="mission-card-tabs">
      <PageChip
        v-for="tab in tabs"
        :key="tab.id"
        :tab="tab"
      />
    </div>
  </div>
</template>

<style
  scoped
  lang="scss"
>
.mission-card {
  position:        relative;
  padding:         var(--space-2);
  padding-bottom:  var(--space-3);
  border:          none;
  border-radius:   var(--radius-lg);
  background:      color-mix(in srgb, var(--theme-c-card-bg-2) 80%, transparent);
  backdrop-filter: blur(2px);
}

.mission-card-header {
  display:       flex;
  align-items:   center;
  margin-bottom: var(--space-2);
  padding:       var(--space-3) var(--space-4);
}

.mission-card-title {
  display:     flex;
  align-items: center;
  gap:         var(--space-2);
}

.mission-card-favicon {
  width:         18px;
  height:        18px;
  border-radius: 4px;
}

.mission-card-domain {
  font-family: var(--font-body);
  font-size:   0.9375rem;
  font-weight: 600;
  color:       var(--theme-c-text);
}

.mission-card-tabs {
  display:        flex;
  flex-direction: column;
}
</style>
