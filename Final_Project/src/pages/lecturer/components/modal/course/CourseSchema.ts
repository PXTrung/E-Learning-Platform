import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const courseSchema = z.object({
    thumbnailFile: z
    .instanceof(FileList)
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png files are accepted."
      ).refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `File size must not exceed 100MB.`),
  
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must not exceed 100 characters" }),

  price: z.preprocess((a) => parseInt(z.string().parse(a),10),
  z.number().positive({ message: "Price must be a positive value" }), z.number().nonnegative({ message: "Price is required" })),

  categoryId: z
    .string()
    .min(1, { message: "Category is required" }),

  level: z
    .string()
    .min(1, { message: "Level is required" }),

  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must not exceed 1000 characters" }),
});

type CourseFormValue = z.infer<typeof courseSchema>;

export { courseSchema };
export type { CourseFormValue };