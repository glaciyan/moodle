import { onMounted, ref } from "vue";
import { Course as CourseType } from "../types/Course";
import { z } from "zod";

const CourseSchema = z.object({
  name: z.string(),
  id: z.number(),
});

const CourseListSchema = z.array(CourseSchema);

export function useFetchCourses() {
  const allCourses = ref<{ name: string; id: number }[] | null>(null);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  onMounted(async () => {
    const customCourseList = localStorage.getItem("custom_course_list");

    if (customCourseList) {
      try {
        const imported = JSON.parse(customCourseList);
        const parsed = await CourseListSchema.parseAsync(imported);
        allCourses.value = parsed;
      } catch (error) {
        console.error(error);
        errorMessage.value =
          "Eigenene Kurs Liste konnte nicht gelesen werden. Schaue in der Konsole nach was schiefgelaufen ist.";
      }
    } else {
      try {
        const result = await fetch(
          localStorage.getItem("custom_course_link") ??
            "https://moodle-worker-api.glaciyan.cc"
        );

        if (result.ok) {
          const parsed = await CourseListSchema.parseAsync(await result.json());
          allCourses.value = parsed;
        } else {
          throw result.statusText;
        }
      } catch (error) {
        console.error(error);
        errorMessage.value = "Eigener Link konnte nicht geladen werden. Schaue in der Konsole nach was schiefgelaufen ist.";
      }
    }

    isLoading.value = false;
  });

  return { allCourses, isLoading, errorMessage };
}
