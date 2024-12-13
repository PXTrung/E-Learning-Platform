import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const editProfileSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "First Name is required" })
        .max(50, { message: "First Name must not exceed 50 characters" }),

    lastName: z
        .string()
        .min(1, { message: "First Name is required" })
        .max(50, { message: "First Name must not exceed 50 characters" }),

    dateOfBirth: z
        .string()
        .optional()
        .refine((value) => {
            if(!value) return true;
            const parsedDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - parsedDate.getFullYear();
            return age >= 10;
    }    , { message: "User must be at least 10 years old" }),

    phoneNumber: z
        .string()
        .optional(),

    avatarFile: z
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
    
    backgroundFile: z
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
});

type EditProfileFormValue = z.infer<typeof editProfileSchema>

export {editProfileSchema};
export type {EditProfileFormValue};

