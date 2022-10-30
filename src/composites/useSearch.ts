import {computed, Ref, ref, watch} from "vue";
import Fuse from "fuse.js";
import { Course } from "../types/Course";

export function useSearch(data: Ref<Course[] | null>) {
    const search = ref("");
    const emptySearch = computed(() => search.value.length === 0);

    let fuse: Fuse<Course>;

    const filteredKurse = ref<Fuse.FuseResult<Course>[] | null>(null);
    const noResults = ref(false);

    watch(search, async (value) => {
        if (value === "") {
            filteredKurse.value = null;
        }

        if (!fuse && data.value) {
            const Fuse = (await import("fuse.js")).default;
            fuse = new Fuse(data.value, {
                keys: ["name"],
            });
        }

        const result = fuse.search(value);

        if (result.length === 0) {
            filteredKurse.value = [];
            noResults.value = true;
        } else {
            filteredKurse.value = result;
            noResults.value = false;
        }
    });

    return {search, emptySearch, filteredKurse, noResults};
}
