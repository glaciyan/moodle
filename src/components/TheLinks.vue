<script setup lang="ts">
import { onMounted, ref } from "vue";

const theme = ref<string | null>();

onMounted(() => {
  theme.value = localStorage.getItem("theme");
});

const switchTheme = () => {
  switch (theme.value) {
    case null:
      theme.value = "dark";
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      break;

    case "dark":
      theme.value = "light";
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      break;

    case "light":
      theme.value = null;
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      break;

    default:
      break;
  }
};
</script>

<template>
  <div>
    <a
      class="text-blue-400 hover:underline focus:underline mr-2"
      href="https://github.com/glaciyan/moodle"
    >
      source
    </a>
    <a
      class="text-blue-400 hover:underline focus:underline mr-2"
      href="https://glaciyan.cc"
    >
      glaciyan.cc
    </a>
    <a
      class="text-blue-400 hover:underline focus:underline cursor-pointer"
      @click="switchTheme"
    >
      {{ theme === null ? "os theme" : theme === "dark" ? "dark" : "light" }}
    </a>
  </div>
</template>
