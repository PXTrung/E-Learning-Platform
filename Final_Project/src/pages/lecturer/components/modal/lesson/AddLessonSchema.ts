import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB in bytes
const ACCEPTED_VIDEO_TYPES = ["video/mov", "video/mp4", "video/mkv"];

const addLessonSchema = z.object({
  
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must not exceed 100 characters" }),


  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must not exceed 1000 characters" }),

    videoFile: z
    .instanceof(FileList)
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
        (files) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
        ".mp4, .mov, .mkv files are accepted."
      ).refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `File size must not exceed 100MB.`),
});

type AddLessonFormValue = z.infer<typeof addLessonSchema>;

export { addLessonSchema };
export type { AddLessonFormValue };