import { z } from "zod";

const courseGroupSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Group's Name is required" })
      .max(40, { message: "Name must not be exceed 40 characters" })
      .refine((value) => isNaN(Number(value)), {
        message: "Name must not be a number",
      }),
  });

  type CourseGroupFormValue = z.infer<typeof courseGroupSchema>;

export { courseGroupSchema };
export type { CourseGroupFormValue };