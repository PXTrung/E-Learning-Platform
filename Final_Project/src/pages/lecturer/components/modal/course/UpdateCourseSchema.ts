import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const updateCourseSchema = z.object({
    thumbnailFile: z
    .instanceof(FileList)
    .optional()
    .refine(
        (files) => {
          // If no files are uploaded, pass validation (since it's optional)
          if (!files || files.length === 0) return true;
    
          const fileType = files[0]?.type;
          // Ensure fileType is a string before checking
          return typeof fileType === "string" && ACCEPTED_IMAGE_TYPES.includes(fileType);
        },
        {
          message: ".jpg, .jpeg, .png files are accepted.",
        }
      )
      .refine(
        (files) => {
          // If no files are uploaded, pass validation
          if (!files || files.length === 0) return true;
    
          const fileSize = files[0]?.size;
          // Ensure fileSize is a number before checking
          return typeof fileSize === "number" && fileSize <= MAX_FILE_SIZE;
        },
        {
          message: `File size must not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
        }
      ),
  
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must not exceed 100 characters" }),

  price: z.string().refine((value) => !value.includes("-"), {
    message: "Price must be positive",
  }),

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

type UpdateCourseFormValue = z.infer<typeof updateCourseSchema>;

export { updateCourseSchema };
export type { UpdateCourseFormValue };