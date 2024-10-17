<script setup lang="ts">
import { personApi } from '@/services/services';
import { type PersonDto } from '../generated-api';
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

const personList = ref<PersonDto[]>();
const chosenPerson = ref<PersonDto>();
const showModal = ref(false);

function showCompany(id: number) {
  showModal.value = true;
  chosenPerson.value = personList.value?.find((person) => person.id === id);
}

watch(
  () => props.searchString,
  async (newVal) => {
    if (newVal.length > 2) {
      personList.value = await personApi
        .searchForPersons(props.searchString)
        .then((res) => res.data);
    } else if (newVal.length === 0) {
      personList.value = [];
      showModal.value = false;
    }
  }
);
</script>

<template>
  <div>
    <h1>Companies</h1>
    <ul>
      <li
        v-for="person in personList"
        :key="person.id"
        class="todo-list"
        @click="showCompany(person.id ?? '')"
      >
        <span>{{ `${person.firstname} ${person.lastname}` }}</span>
      </li>
    </ul>
    <BaseModal v-if="showModal" @close="showModal = false"> </BaseModal>
  </div>
</template>

<style scoped lang="css">
.todo-list {
  cursor: pointer;
}
</style>
