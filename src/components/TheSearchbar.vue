<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  searchString: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:searchString']);

const input = ref(props.searchString);

watch(input, (newVal) => {
  emit('update:searchString', newVal);
});
</script>

<template>
  <input v-model="input" type="text" class="searchbar" />
</template>

<style scoped lang="css">
.searchbar {
  width: 400px;
  height: 30px;
  margin-bottom: 20px;
}
</style>
