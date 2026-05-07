<script setup lang="ts">
import { BookmarkIcon, CloseIcon } from '@/components/icons';
import { useDeferredStore, useTabsStore } from '@/stores';
import type { Tab } from '@/types';
import { ref } from 'vue';

const props = defineProps<{
  tab: Tab
}>();

const tabsStore = useTabsStore();
const deferredStore = useDeferredStore();

const showActions = ref(false);

async function focus() {
  await tabsStore.focusTab(props.tab.id);
}

async function close(e?: Event) {
  e?.stopPropagation();
  await tabsStore.closeTab(props.tab.id);
}

async function save(e?: Event) {
  e?.stopPropagation();
  console.log('Saving tab:', props.tab.title, props.tab.url);
  const item = await deferredStore.add(props.tab.url, props.tab.title);
  console.log('Saved item:', item);
  console.log('Current items:', deferredStore.items);
  await tabsStore.closeTab(props.tab.id);
}
</script>

<template>
  <div
    class="page-chip"
    :class="{ 'page-chip--active': tab.active }"
    @click="focus"
    @mouseenter="showActions = true"
    @mouseleave="showActions = false"
  >
    <img
      v-if="tab.favIconUrl"
      :src="tab.favIconUrl"
      class="page-chip-favicon"
      alt=""
    />
    <svg 
    v-else
    t="1778148840309" class="page-chip-favicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3645" width="200" height="200"><path d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512" fill="#FBBC05" p-id="3646"></path><path d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88" fill="#EA4335" p-id="3647"></path><path d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776" fill="#34A853" p-id="3648"></path><path d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667" fill="#4285F4" p-id="3649"></path></svg>
    <span class="page-chip-title">{{ tab.title || 'Untitled' }}</span>
    <div class="page-chip-actions" :class="{ 'page-chip-actions--visible': showActions }">
      <button class="page-chip-action" title="Save for later" @click="save">
        <BookmarkIcon :size="16" />
      </button>
      <button class="page-chip-action page-chip-action--danger" title="Close" @click="close">
        <CloseIcon :size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-chip {
  position:    relative;
  display:     flex;
  align-items: center;
  margin:      0 24px;
  padding:     var(--space-3) var(--space-4);
  cursor:      pointer;
  transition:  background-color var(--transition-fast);
  border:      none;
  background:  transparent;
  gap:         var(--space-3);
  border-radius: var(--radius-md);

  // 标签页之间的间隔线
  &::before {
    position:   absolute;
    top:        0;
    right:      0;
    left:       0;
    height:     1px;
    content:    '';
    background: var(--theme-c-active-bg);
  }
}

.page-chip:hover {
  background: var(--theme-c-active-bg);
}

.page-chip--active {
  .page-chip-title {
    font-weight: 600;
    color:       var(--theme-c-accent);
  }
}

.page-chip-favicon {
  flex-shrink:   0;
  width:         16px;
  height:        16px;
  border-radius: 3px;
}

.page-chip-title {
  font-size:     0.9375rem;
  overflow:      hidden;
  flex:          1;
  white-space:   nowrap;
  text-overflow: ellipsis;
  color:         var(--theme-c-text);
}

.page-chip-actions {
  display:     flex;
  flex-shrink: 0;
  margin-left: auto;
  transition:  opacity var(--transition-fast);
  opacity:     0.8;
  gap:         var(--space-1);

  &--visible {
    opacity: 1;
  }
}

.page-chip-action {
  display:         flex;
  align-items:     center;
  justify-content: center;
  width:           28px;
  height:          28px;
  transition:      all var(--transition-fast);
  color:           var(--theme-c-text-muted);
  border-radius:   9999px;
}

.page-chip-action:hover {
  color:      var(--theme-c-text);
  background: var(--theme-c-card-bg-2);
}

.page-chip-action--danger:hover {
  color:      var(--theme-c-danger);
  background: color-mix(in srgb, var(--theme-c-danger) 25%, transparent);
}

.page-chip-action svg {
  width:  16px;
  height: 16px;
}
</style>
