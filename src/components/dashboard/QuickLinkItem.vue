<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { getFaviconUrl, getInitial, getRandomColor } from '@/utils/helpers';
import QuickLinkFrame from '@/components/dashboard/QuickLinkFrame.vue';
import type { QuickLink } from '@/types';

const props = defineProps<{
  link: QuickLink;
}>();

const emit = defineEmits<{
  click: [url: string];
  edit: [link: QuickLink];
}>();

const imageError = ref(false);

function handleClick() {
  emit('click', props.link.url);
}

function handleEdit() {
  emit('edit', props.link);
}

function handleImageError() {
  imageError.value = true;
}
</script>

<template>
  <QuickLinkFrame
    :title="link.title"
    @click_icon="handleClick"
    @edit_link="handleEdit"
  >
    <div v-if="!imageError">
      <img
        :src="getFaviconUrl(link.url)"
        :alt="link.title"
        class="link-favicon"
        @error="handleImageError"
      />
    </div>
    <div v-else>
      <div
        class="link-avatar"
        :style="{ backgroundColor: getRandomColor(link.url) }"
      >
        {{ getInitial(link.title) }}
      </div>
    </div>
  </QuickLinkFrame>
</template>

<style
  scoped
  lang="scss"
>
.link-favicon {
  width:      28px;
  height:     28px;
  object-fit: contain;
}

.link-avatar {
  font-family:     var(--font-display);
  font-size:       0.875rem;
  font-weight:     600;
  display:         flex;
  align-items:     center;
  justify-content: center;
  width:           28px;
  height:          28px;
  text-transform:  uppercase;
  color:           white;
  border-radius:   50%;
}
</style>
