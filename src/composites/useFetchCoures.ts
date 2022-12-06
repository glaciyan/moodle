import { onMounted, ref } from "vue";
import { Course } from "../types/Course";
import { z } from "zod";

const CourseSchema = z
  .object({
    name: z.string(),
    meta: z.union([
      z.object({
        moodleId: z.number()
      }),
      z.object({
        link: z.string().url()
      })
    ]).and(z.object({
      tags: z.string().array().optional()
    }))
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
        allCourses.value = await CourseSchema.parseAsync(imported);
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
          allCourses.value = await CourseSchema.parseAsync(await result.json());
        } else {
          // noinspection ExceptionCaughtLocallyJS
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
