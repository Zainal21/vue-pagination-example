<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li
      v-for="person in peoples"
      :key="person.id"
      class="flex justify-between gap-x-6 py-5"
    >
      <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            {{ person.name }}
          </p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">
            {{ person.email }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  peoples: [],
});
</script>
