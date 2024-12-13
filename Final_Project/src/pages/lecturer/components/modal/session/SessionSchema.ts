import { z } from "zod";

const sessionSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Session's Name is required" })
      .max(100, { message: "Name must not be exceed 100 characters" })
      .refine((value) => isNaN(Number(value)), {
        message: "Name must not be a number",
      }),
  });

  type SessionFormValue = z.infer<typeof sessionSchema>;

export { sessionSchema };
export type { SessionFormValue };