export type Course = {
  name: string;
  meta: ({ moodleId?: number, link?: string }) & { tags?: string[] };
};
