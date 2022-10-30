<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import Course from "./components/Course.vue";
import { useSearch } from "./composites/useSearch";
import { computed, onMounted, ref } from "vue";
import { Course as CourseType } from "./types/Course";

const kurse = ref<{ name: string; id: number }[] | null>(null);
const isLoading = ref(false);

onMounted(async () => {
  const result = await fetch("kurse.json");
  if (result.ok) {
    kurse.value = (await result.json()) as CourseType[];
  }

  isLoading.value = false;
});

const { search, emptySearch, filteredKurse, noResults } = useSearch(kurse);

const goTo = () => {
  if (filteredKurse.value?.[0]) {
    window.location.href = `https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${filteredKurse.value[0].item.id}`;
  } else if (kurse.value !== null) {
    window.location.href = `https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${kurse.value[0].id}`;
  }
};
</script>

<template>
  <div class="max-w-md md:mx-auto mx-2">
    <div class="md:my-12 my-4">
      <h1 class="md:text-2xl text-xl">Moodle Kurse</h1>
      <div>
        <a
          class="text-blue-400 hover:underline fous:underline mr-2"
          href="https://github.com/glaciyan/moodle"
          >source</a
        >
        <a
          class="text-blue-400 hover:underline fous:underline"
          href="https://glaciyan.cc"
          >glaciyan.cc</a
        >
      </div>
    </div>
    <SearchBar v-model="search" @keydown.enter="goTo" />
    <div class="min-h-screen">
      <div v-if="!isLoading">
        <div v-if="emptySearch">
          <Course v-for="kurs of kurse" :course="kurs" />
        </div>
        <div v-else>
          <p v-if="noResults">Keine Ergebnisse</p>
          <div v-else>
            <TransitionGroup>
              <Course
                v-for="kurs of filteredKurse"
                :course="kurs.item"
                :key="kurs.item.id"
              />
            </TransitionGroup>
          </div>
        </div>
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
