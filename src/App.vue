<script setup lang="ts">
import { ref } from 'vue';
import Searchbar from './components/TheSearchbar.vue';
import TodoList from './components/TodoList.vue';
import TheCompanyList from './components/TheCompanyList.vue';
import ThePersonList from './components/ThePersonList.vue';

const searchString = ref('');
</script>

<template>
  <main>
    <Searchbar
      :search-string="searchString"
      @update:search-string="(newVal) => (searchString = newVal)"
    />
    <Suspense class="wrapper">
      <div class="search-results">
        <TheCompanyList :search-string="searchString" />
        <ThePersonList :search-string="searchString" />
        <TodoList :search-string="searchString" />
      </div>
    </Suspense>
  </main>
</template>

<style scoped lang="css">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-results {
  display: flex;
}
</style>
