<script setup lang="ts">
import { ref, watch } from 'vue'
import { TodoControllerApi, type TodosDto } from '../generated-api'

const api = new TodoControllerApi()
const input = ref('')
const todoResponse = ref<TodosDto[]>([])

async function search(query: string) {
  todoResponse.value = await api.searchForTodoLists(query).then(response => {
    return response.data
  })
}

watch(input, newVal => {
  search(newVal)
})
</script>

<template>
  <div>
    <input v-model="input" type="text" />
    <br />
    <span v-if="todoResponse.length">{{ todoResponse }}</span>
  </div>
</template>
