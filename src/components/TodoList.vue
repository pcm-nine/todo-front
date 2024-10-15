<script setup lang="ts">
import { TodoControllerApi, type TodosDto } from '../generated-api'

const api = new TodoControllerApi()

const todos: TodosDto[] = await api.allTodos().then(response => {
  return response.data
})
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.uuid">
      {{ todo.title }}
    </li>
  </ul>
</template>
