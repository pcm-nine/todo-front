import {
  TodoListControllerApi,
  CompanyControllerApi,
  PersonControllerApi,
} from '../generated-api';

export const todoApi = new TodoListControllerApi();
export const companyApi = new CompanyControllerApi();
export const personApi = new PersonControllerApi();
