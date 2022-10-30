import {computed, ref, watch} from "vue";
import Fuse from "fuse.js";
import kurse from "../assets/kurse.json";

export function useSearch() {
    const search = ref("");
    const emptySearch = computed(() => search.value.length === 0);

    let fuse: Fuse<typeof kurse[number]>;

    const filteredKurse = ref<Fuse.FuseResult<typeof kurse[number]>[] | null>(null);
    const noResults = ref(false);

    watch(search, async (value) => {
        if (value === "") {
            filteredKurse.value = null;
        }

        if (!fuse) {
            const Fuse = (await import("fuse.js")).default;
            fuse = new Fuse(kurse, {
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
