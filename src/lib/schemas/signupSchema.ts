import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10).max(15).optional(),
  role: z.enum(["STUDENT", "TEACHER"]),
  instituteName: z.string().min(2).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
