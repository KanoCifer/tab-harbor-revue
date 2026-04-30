<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import { useTabsStore } from '@/stores';

const tabsStore = useTabsStore();

const tabCount = computed(() => tabsStore.totalTabCount);
</script>

<template>
  <footer class="footer">
    <div class="footer-stats">
      <span class="footer-stat">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
        </svg>
        {{ tabCount }} tabs
      </span>
    </div>
  </footer>
</template>

<style
  scoped
  lang="scss"
>
.footer {
  font-size:       0.8125rem;
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         var(--space-4) var(--space-6);
  color:           var(--theme-c-text-muted);
}

.footer-stats {
  display: flex;
  gap:     var(--space-4);
}

.footer-stat {
  display:     flex;
  align-items: center;
  gap:         var(--space-1);
}

.footer-stat svg {
  width:  16px;
  height: 16px;
}

.footer-info {
  color: var(--theme-c-text-muted);
}
</style>
