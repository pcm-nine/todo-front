<script setup lang="ts">
import { todoApi } from '@/services/services';
import { type TodoListDto } from '../generated-api';
import { defineAsyncComponent, ref, watch } from 'vue';

const BaseModal = defineAsyncComponent(
  () => import('@/components/BaseModal.vue')
);
const props = defineProps({
  searchString: {
    type: String,
    default: '',
  },
});

const todoLists = ref<TodoListDto[]>([]);
const chosenTodoList = ref<TodoListDto>({ id: '' });
const showModal = ref(false);

function showTodoList(id: string) {
  showModal.value = true;
  chosenTodoList.value = todoLists.value.find((list) => list.id === id) ?? {
    id: '',
  };
}

watch(
  () => props.searchString,
  async (newVal) => {
    if (newVal.length > 2) {
      todoLists.value = await todoApi
        .searchForTodoLists(props.searchString)
        .then((res) => res.data);
    } else if (newVal.length === 0) {
      todoLists.value = [];
      showModal.value = false;
    }
  }
);
</script>

<template>
  <div>
    <h1>Todo-lists</h1>
    <ul>
      <li
        v-for="list in todoLists"
        :key="list.id"
        class="todo-list"
        @click="showTodoList(list.id ?? '')"
      >
        <span>{{ list.title }}</span>
      </li>
    </ul>
    <BaseModal v-if="showModal" @close="showModal = false">
      {{ chosenTodoList.title }}
      <div v-if="chosenTodoList.todoList?.length">
        <span>Tasks:</span>
        <ul>
          <li v-for="task in chosenTodoList.todoList" :key="task.id">
            {{ task.title }}
          </li>
        </ul>
      </div>
    </BaseModal>
  </div>
</template>

<style scoped lang="css">
.todo-list {
  cursor: pointer;
}
</style>
