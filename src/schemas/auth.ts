import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string({
    message: "Password is required"
  }).min(6, {
    message: "Password must be at least 6 characters long"
  })
});

export const signupSchema = z.object({
  fullname: z.string({
    message: "Full name is required"
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string({
    message: "Confirm Password is required"
  }).min(6, {
    message: "Confirm Password must be at least 6 characters long"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
