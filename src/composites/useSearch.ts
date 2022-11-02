import type Fuse from "fuse.js";
import { computed, isProxy, ref, watch, watchEffect } from "vue";
import type { Ref } from "vue";
import { throttledWatch } from "@vueuse/core";
import type { Course } from "../types/Course";

export function useSearch(data : Course[]) {
  let fuse: Fuse<Course>;

  const search = ref("");
  const emptySearch = computed(() => search.value.length === 0);

  console.log(isProxy(data))

  const courses = ref<Course[]>(data);

  const noResults = computed(() => courses.value.length === 0);

  throttledWatch(
    search,
    async (value) => {
      if (value.length === 0) {
        courses.value = data;
        return;
      }

      if (!fuse) {
        const Fuse = (await import("fuse.js")).default;
        fuse = new Fuse(data, {
          keys: ["name"],
        });
      }

      const result = fuse.search(value);
      console.log(result);

      if (result.length === 0) {
        courses.value = [];
      } else {
        courses.value = result.map((r) => r.item);
      }
    },
    {
      throttle: 300,
    }
  );

  return { search, emptySearch, courses, noResults };
}
