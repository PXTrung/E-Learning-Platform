import { z } from "zod";

const registerSchema = z.object({
  firstName: z
    .string()
    .max(50, "First name must be 50 characters or less")
    .min(1, "First Name is required"),
  lastName: z
    .string()
    .max(50, "Last name must be 50 characters or less")
    .min(1, "Last Name is required"),
  email: z
    .string()
    .email("Must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
}).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  )

type RegisterFormValue = z.infer<typeof registerSchema>;

export type { RegisterFormValue };
export  {registerSchema};