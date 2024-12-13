import { z } from "zod";

const schema = z.object({
    name: z
      .string()
      .min(1, { message: "Category's Name is required" })
      .max(100, { message: "Name must not be exceed 100 characters" })
      .refine((value) => isNaN(Number(value)), {
        message: "Name must not be a number",
      }),
  });

  type FormValue = z.infer<typeof schema>;

export { schema };
export type { FormValue };
