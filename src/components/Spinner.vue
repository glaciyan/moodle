<script setup lang="ts">
import { onMounted, ref } from "vue";

const show = ref(false);

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 700);
});
</script>

<template>
  <div v-if="show" class="w-6 h-6">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="animate-spin text-black dark:text-white"
    >
      <circle
        cx="12"
        cy="12"
        r="7"
        stroke="currentColor"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M19 12C19 13.1383 18.7224 14.2594 18.1913 15.2662C17.6601 16.273 16.8915 17.1351 15.952 17.7777C15.0124 18.4204 13.9304 18.8242 12.7995 18.9542C11.6687 19.0842 10.5232 18.9365 9.46231 18.5238C8.40145 18.1111 7.45723 17.446 6.71148 16.586C5.96573 15.726 5.44096 14.6972 5.18263 13.5886C4.92431 12.48 4.94024 11.3251 5.22903 10.224C5.51783 9.12299 6.07078 8.10898 6.83996 7.26988"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
