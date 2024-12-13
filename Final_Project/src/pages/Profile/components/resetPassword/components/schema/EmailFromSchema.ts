import { z } from "zod";

const EmailFromSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email address"),
})


export  {EmailFromSchema};