<script setup lang="ts">
import CourseLink from "./CourseLink.vue";
import SearchBar from "./SearchBar.vue";

import { useSearch } from "../composites/useSearch";
import type { Course as CourseType } from "../types/Course";

const props = defineProps<{ initCourses: CourseType[] }>();

const { search, courses } = useSearch(props.initCourses);

const goTo = () => {
  if (courses.value[0]?.meta.moodleId) {
    window.location.href = `https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${courses.value[0].meta.moodleId}`;
  } else if (courses.value[0]?.meta.link) {
    window.location.href = courses.value[0]?.meta.link;
  }
};
</script>

<template>
  <div>
    <SearchBar v-model="search" @keydown.enter="goTo" />
    <div class="min-h-screen">
      <div class="relative">
        <TransitionGroup>
          <CourseLink
            v-for="course of courses"
            :course="course"
            :key="course.meta.moodleId ?? course.meta.link"
          />
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
