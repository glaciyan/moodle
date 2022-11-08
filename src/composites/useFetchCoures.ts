import { onMounted, ref } from "vue";
import { Course, Course as CourseType } from "../types/Course";
import { z } from "zod";

const CourseSchema = z
  .object({
    name: z.string(),
    meta: z.union([
      z.object({
        moodleId: z.number(),
      }),
      z.object({
        link: z.string().url(),
      }),
    ]).and(z.object({
      tags: z.string().array().optional()
    })),
  })
  .array();

export function useFetchCourses() {
  const allCourses = ref<Course[] | null>(null);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  onMounted(async () => {
    const customCourseList = localStorage.getItem("custom_course_list");

    if (customCourseList) {
      try {
        const imported = JSON.parse(customCourseList);
        const moodleIdParsed = await CourseSchema.parseAsync(imported);
        allCourses.value = moodleIdParsed;
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
          const parsed = await CourseSchema.parseAsync(await result.json());
          allCourses.value = parsed;
        } else {
          throw result.statusText;
        }
      } catch (error) {
        console.error(error);
        errorMessage.value =
          "Eigener Link konnte nicht geladen werden. Schaue in der Konsole nach was schiefgelaufen ist.";
      }
    }

    isLoading.value = false;
  });

  return { allCourses, isLoading, errorMessage };
}
