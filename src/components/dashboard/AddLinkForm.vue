<script setup lang="ts">
import { ref } from 'vue';
import ModalForm from '@/components/common/ModalForm.vue';

const emit = defineEmits<{
  submit: [title: string, url: string]
  cancel: []
}>();

const showForm = ref(false);
const title = ref('');
const url = ref('');

function openForm() {
  showForm.value = true;
  title.value = '';
  url.value = '';
}

function handleSubmit() {
  if (title.value && url.value) {
    emit('submit', title.value, url.value);
    showForm.value = false;
  }
}

function handleCancel() {
  emit('cancel');
  showForm.value = false;
}

defineExpose({ openForm });
</script>

<template>
  <ModalForm
    v-model="showForm"
    title="Add New Link"
    @close="handleCancel"
  >
    <form class="modal-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="e.g., GitHub"
          class="form-input"
          required
          autofocus
        />
      </div>
      <div class="form-group">
        <label>Url</label>
        <input
          v-model="url"
          type="url"
          placeholder="https://example.com"
          class="form-input"
          required
        />
      </div>
    </form>
    
    <template #actions>
      <button type="button" class="modal-btn modal-btn--cancel" @click="handleCancel">
        Cancel
      </button>
      <button type="submit" class="modal-btn modal-btn--save" @click="handleSubmit">
        Add Link
      </button>
    </template>
  </ModalForm>
</template>

<style scoped lang="scss">
.modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-group {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: var(--space-2);

  label {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 500;
    align-self: center;
    cursor: default;
    color: var(--theme-c-text-muted);
  }
}

.form-input {
  font-size: 0.9375rem;
  padding: var(--space-2);
  padding-right: var(--space-3);
  padding-left: var(--space-3);
  transition: all var(--transition-fast);
  color: var(--theme-c-text);
  border: 1px solid transparent;
  border-radius: 9999px;
  outline: none;
  background: var(--theme-c-card-bg);

  &:hover {
    border-color: var(--theme-c-accent);
  }

  &:focus {
    border-color: var(--theme-c-accent);
  }
}
</style>
