<script setup lang="ts">
import SearchableCourses from "./components/SearchableCourses.vue";
import TheLinks from "./components/TheLinks.vue";
import Spinner from "./components/Spinner.vue";
import { useFetchCourses } from "./composites/useFetchCoures";
import { ref } from "vue";

const { allCourses, isLoading, errorMessage } = useFetchCourses();
const clearCustom = (window as any)._moodle__clearCustom as () => void;

const test = () => {
  allCourses.value = [
    {
      name: "Test",
      id: 1,
    },
  ];
};
</script>

<template>
  <div class="max-w-md md:mx-auto mx-2 min-h-screen">
    <div class="md:my-12 my-4">
      <h1 class="md:text-2xl text-xl dark:text-gray-50">Moodle Kurse</h1>
      <TheLinks />
      <button class="dark:text-white" @click="test">Set test</button>
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
