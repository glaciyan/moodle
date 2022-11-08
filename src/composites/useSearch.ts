import type Fuse from "fuse.js";
import { computed, isProxy, ref, unref, watch, watchEffect } from "vue";
import type { Ref } from "vue";
import { throttledWatch } from "@vueuse/core";
import type { Course } from "../types/Course";

export function useSearch(data: Ref<Course[]>) {
  let fuse: Fuse<Course>;

  const search = ref("");
  const emptySearch = computed(() => search.value.length === 0);

  const courses = ref<Course[]>(data.value);

  const noResults = computed(() => courses.value.length === 0);

  watch(data, (newData) => {
    courses.value = newData;
    search.value = "";
  });

  throttledWatch(
    search,
    async (value) => {
      if (value.length === 0) {
        courses.value = data.value;
        return;
      }

      if (!fuse) {
        const Fuse = (await import("fuse.js")).default;
        fuse = new Fuse(data.value, {
          keys: [
            "name",
            {
              name: "meta.tags",
              weight: 2,
            },
          ],
          includeScore: true,
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
