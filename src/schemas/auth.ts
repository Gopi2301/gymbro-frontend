import { z } from "zod";

export const signinSchema = z.object({
  email: z.email({
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
  })
  .min(4,{
    message:"Full name must be at least 4 characters long"
  })
  .max(100,{
    message:"Full name must be at most 100 characters long"
  })
  ,
  email: z.email({
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
export const coachSignupSchema = z.object({
  fullname: z.string({
    message: "Full name is required"
  })
  .min(4,{
    message:"Full name must be at least 4 characters long"
  })
  .max(100,{
    message:"Full name must be at most 100 characters long"
  }),
  work_email: z.email({
    message: "Email is required"
  }),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string({
    message: "Confirm Password is required"
  }).min(8, {
    message: "Confirm Password must be at least 8 characters long"
  }),
  gym_name: z.string()
  .min(4, {
    message: "Gym name is required"
  })
  .max(100, {
    message: "Gym name must be at most 100 characters long"
  }),
  members: z.string()
  .min(1, {
    message: "Members is required"
  })
  .max(100, {
    message: "Members must be at most 100 characters long"
  }),
  gym_address: z.string().min(1, {
    message: "Gym address is required"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type CoachSignupFormData = z.infer<typeof coachSignupSchema>;
