import { onMounted, ref } from "vue";
import { Course as CourseType } from "../types/Course";

export function useFetchCourses() {
  const allCourses = ref<{ name: string; id: number }[] | null>(null);
  const isLoading = ref(false);

  onMounted(async () => {
    const result = await fetch("kurse.json");
    if (result.ok) {
      allCourses.value = (await result.json()) as CourseType[];
    }

    isLoading.value = false;
  });
  return { allCourses, isLoading };
}
