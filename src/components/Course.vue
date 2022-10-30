<script setup lang="ts">
defineProps<{
  course: { name: string; id: number };
}>();

const randomDarkRingColor = function () {
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  return `--tw-ring-color: rgb(${random(random(30, 200), 200)},${random(
    100,
    random(150, 255)
  )},${random(100, 255)})`;
};
</script>

<template>
  <a
    class="block ring-0 mt-3 px-6 py-4 rounded-lg transition-shadow bg-slate-50 shadow hover:ring-2"
    :style="randomDarkRingColor()"
    :key="course.id"
    :href="`https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${course.id}`"
  >
    <p>{{ course.name }}</p>
    <p class="text-slate-400">id: {{course.id}}</p>
  </a>
</template>
