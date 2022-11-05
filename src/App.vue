<script setup lang="ts">
import SearchableCourses from "./components/SearchableCourses.vue";
import Spinner from "./components/Spinner.vue";
import TheLinks from "./components/TheLinks.vue";
import { useFetchCourses } from "./composites/useFetchCoures";

const { allCourses, isLoading, errorMessage } = useFetchCourses();
const clearCustom = (window as any)._moodle__clearCustom as () => void;
</script>

<template>
  <div class="max-w-md md:mx-auto mx-2 min-h-screen">
    <div class="md:my-12 my-4">
      <h1 class="md:text-2xl text-xl dark:text-gray-50">Moodle Kurse</h1>
      <TheLinks />
    </div>
    <p v-if="errorMessage" class="text-red-500 dark:text-red-300">
      {{ errorMessage }}
      <button @click="clearCustom" class="text-blue-400 hover:underline">
        Löschen
      </button>
    </p>
    <div v-else>
      <SearchableCourses
        v-if="!isLoading && allCourses"
        :initCourses="allCourses"
      />
      <Spinner class="mx-auto" v-else />
    </div>
  </div>
</template>
