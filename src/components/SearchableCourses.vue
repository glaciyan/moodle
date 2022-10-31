<script setup lang="ts">
import Course from "./Course.vue";
import SearchBar from "./SearchBar.vue";

import { useSearch } from "../composites/useSearch";
import type { Course as CourseType } from "../types/Course";

const props = defineProps<{ initCourses: CourseType[] }>();

const { search, courses } = useSearch(props.initCourses);

const goTo = () => {
  if (courses.value?.[0]) {
    window.location.href = `https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${courses.value[0].id}`;
  } else if (props.initCourses !== null) {
    window.location.href = `https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${props.initCourses[0].id}`;
  }
};
</script>

<template>
  <div>
    <SearchBar v-model="search" @keydown.enter="goTo" />
    <div class="min-h-screen">
      <div class="relative">
        <TransitionGroup>
          <Course v-for="course of courses" :course="course" :key="course.id" />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-leave-active {
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
