<script setup lang="ts">
import SearchableCourses from "./components/SearchableCourses.vue";
import TheLinks from "./components/TheLinks.vue";
import Spinner from "./components/Spinner.vue";
import { useFetchCourses } from "./composites/useFetchCoures";

const { allCourses, isLoading } = useFetchCourses();
</script>

<template>
  <div class="max-w-md md:mx-auto mx-2 min-h-screen">
    <div class="md:my-12 my-4">
      <h1 class="md:text-2xl text-xl">Moodle Kurse</h1>
      <TheLinks />
    </div>
    <SearchableCourses v-if="!isLoading && allCourses" :initCourses="allCourses" />
    <Spinner class="mx-auto" v-else/>
  </div>
</template>
