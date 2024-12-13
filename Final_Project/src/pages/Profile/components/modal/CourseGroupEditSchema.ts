import { z } from 'zod';

const courseGroupEditSchema = z.object({
    id: z.string(),
    name: z
      .string()
      .min(1, { message: "Group's Name is required" })
      .max(40, { message: "Name must not be exceed 40 characters" })
      .refine((value) => isNaN(Number(value)), {
        message: "Name must not be a number",
      }),
  });

  type CourseGroupEditFormValue = z.infer<typeof courseGroupEditSchema>;

export default courseGroupEditSchema;
export type { CourseGroupEditFormValue };
