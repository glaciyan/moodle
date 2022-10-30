<script setup lang="ts">
import kurse from "./assets/kurse.json";
import SearchBar from "./components/SearchBar.vue";
import Course from "./components/Course.vue";
import { useSearch } from "./composites/useSearch";

const { search, emptySearch, filteredKurse, noResults } = useSearch();
const goTo = () => {
  if (filteredKurse.value?.[0]) {
    window.location.href = `https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${filteredKurse.value[0].item.id}`;
  } else {
    window.location.href = `https://moodle.htwg-konstanz.de/moodle/course/view.php?id=${kurse[0].id}`;
  }
};
</script>

<template>
  <div class="max-w-md md:mx-auto mx-2">
    <div class="md:my-12 my-4"><h1 class="md:text-2xl text-xl">Moodle Kurse</h1></div>
    <SearchBar v-model="search" @keydown.enter="goTo" />
    <div v-if="emptySearch">
      <Course v-for="kurs of kurse" :course="kurs" />
    </div>
    <div v-else>
      <p v-if="noResults">Keine Ergebnisse</p>
      <div v-else>
        <Course v-for="kurs of filteredKurse" :course="kurs.item" />
      </div>
    </div>
    <div class="my-6">
      <a class="text-blue-400 hover:underline fous:underline mr-2" href="https://github.com/glaciyan/moodle">github</a>
      <a class="text-blue-400 hover:underline fous:underline" href="https://glaciyan.cc">glaciyan.cc</a>
    </div>
  </div>
</template>
