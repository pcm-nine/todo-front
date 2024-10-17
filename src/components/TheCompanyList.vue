<script setup lang="ts">
import { companyApi } from '@/services/services';
import { type CompanyDto } from '../generated-api';
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

const allCompanies = ref<CompanyDto[]>([]);

const companyList = ref<CompanyDto[]>();
const chosenCompany = ref<CompanyDto>({ id: '' });
const showModal = ref(false);

allCompanies.value = await companyApi.getAllCompanies().then((res) => res.data);

function showCompany(id: string) {
  showModal.value = true;
  chosenCompany.value =
    companyList.value?.find((company) => company.id === id) ?? {};
}

watch(
  () => props.searchString,
  async (newVal) => {
    if (newVal.length > 2) {
      companyList.value = await companyApi
        .searchForCompanies(props.searchString)
        .then((res) => res.data);
    } else if (newVal.length === 0) {
      companyList.value = [];
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
        v-for="company in companyList"
        :key="company.id"
        class="todo-list"
        @click="showCompany(company.id ?? '')"
      >
        <span>{{ company.name }}</span>
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
