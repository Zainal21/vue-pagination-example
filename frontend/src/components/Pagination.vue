<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  total: Number,
  page: Number,
  perPage: Number,
  changePage: Function,
});

const prevPage = () => {
  if (props.page > 1) {
    props.changePage(props.page - 1);
  }
};

const nextPage = () => {
  const totalPages = Math.ceil(props.total / props.perPage);
  if (props.page < totalPages) {
    props.changePage(props.page + 1);
  }
};
const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= Math.ceil(props.total / props.perPage)) {
    props.changePage(pageNumber);
  }
};
</script>

<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        @click="prevPage"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a
      >
      <a
        href="#"
        @click="nextPage"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a
      >
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          {{ (page - 1) * perPage + 1 }} to
          {{ Math.min(page * perPage, total) }} of {{ total }} results
        </p>
      </div>
      <div>
        <!-- Pagination links -->
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            @click="prevPage"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>

          <!-- Render page links based on total, page, and perPage -->
          <div v-for="pageNumber in Math.ceil(total / perPage)">
            <a
              :key="pageNumber"
              :class="[
                'cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold',
                {
                  'text-gray-800 bg-gray-100': pageNumber === page,
                  'text-gray-900': pageNumber !== page,
                },
                'ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
              ]"
              @click.prevent="goToPage(pageNumber)"
            >
              {{ pageNumber }}
            </a>
          </div>

          <a
            href="#"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
