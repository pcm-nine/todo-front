<script lang="ts" setup>
defineProps({
  title: { type: String, default: null },
});

defineEmits(['close']);
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal-wrapper-inner">
      <button class="modal-close-button" @click="$emit('close')">luk</button>
      <h3 class="modal-title" v-if="title">{{ title }}</h3>
      <div class="modal-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
