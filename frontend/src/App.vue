<script setup>
import AppLayout from "./layouts/AppLayout.vue";
import Pagination from "./components/Pagination.vue";
import List from "./components/List.vue";
import { getUsers } from "./utils/api";
import { onMounted, ref } from "vue";

const term = ref("");

const paginationState = ref({
  data: [],
  total: 0,
  page: 1,
  perPage: 10,
});

function fetchUsers(page, term = "") {
  getUsers(page, term).then((response) => {
    const { data, current_page, total, per_page } = response.data;
    paginationState.value = {
      data: data,
      total: total,
      page: current_page,
      perPage: per_page,
    };
  });
}

function handleSearch() {
  fetchUsers(paginationState.value.page, term.value);
}

function changePage(page) {
  fetchUsers(page);
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <AppLayout>
    <div class="container mx-auto">
      <div class="my-3">
        <label
          for="term"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Search Your Name</label
        >
        <div class="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="term"
            id="term"
            v-model="term"
            class="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Input your name"
            :onKeyup="handleSearch"
          />
        </div>
      </div>
      <div class="list-container">
        <List :peoples="paginationState.data" />
      </div>
    </div>
    <div v-if="paginationState.total > paginationState.perPage">
      <Pagination
        :total="paginationState.total"
        :page="paginationState.page"
        :perPage="paginationState.perPage"
        v-model:page="paginationState.page"
        :changePage="changePage"
      />
    </div>
  </AppLayout>
</template>
