<script setup lang="ts">
import { Course } from "../types/Course";

defineProps<{
  course: Course;
}>();

const randomDarkRingColor = () => {
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  return `--tw-ring-color: rgb(${random(random(30, 200), 200)},${random(
    100,
    random(150, 255)
  )},${random(100, 255)})`;
};

const getHref = (course: Course) =>
  course.meta.link ??
  `https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${course.meta.moodleId}`;
</script>

<template>
  <a
    class="block ring-0 mt-3 px-6 py-4 rounded-lg transition-shadow bg-slate-50 dark:bg-neutral-800 shadow hover:ring-2 w-full"
    :style="randomDarkRingColor()"
    :href="getHref(course)"
  >
    <p class="dark:text-neutral-200">{{ course.name }}</p>
    <p v-if="course.meta.moodleId" class="text-slate-400 dark:text-neutral-500">id: {{ course.meta.moodleId }}</p>
    <p v-if="course.meta.link" class="text-slate-400 dark:text-neutral-500">{{ course.meta.link}}</p>
  </a>
</template>
