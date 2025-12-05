import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signinSchema,
  signupSchema,
  type SigninFormData,
  type SignupFormData,
} from "@/schemas/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";

const AuthForm = ({ title }: { title: string }) => {
  const isSignup = title === "signup";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<SigninFormData | SignupFormData>({
    resolver: zodResolver(title === "signin" ? signinSchema : signupSchema),
    defaultValues: isSignup
      ? {
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
          password: "",
        },
  });

  const type = isSignup ? "Sign Up" : "Sign In";

  const handleSignup = async (values: SignupFormData) => {
    const { email, password, confirmPassword, fullname } = values;
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Call backend signup endpoint
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name: fullname,
            role: "user",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess(true);
      form.reset();
    } catch (error: unknown) {
      console.error("Signup error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred during signup"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignin = async (values: SigninFormData) => {
    const { email, password } = values;
    setIsLoading(true);
    setError(null);

    try {
      // Call backend signin endpoint
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"
        }/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log(data.data.session);
      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Store the access token
      const user = data.data.user;
      const access_token = data.data.session.access_token;
      const refresh_token = data.data.session.refresh_token;
      // Set the token in localStorage or cookies
      // localStorage.setItem('access_token', access_token);
      console.log(access_token, refresh_token);
      // Update Redux store with user data
      dispatch(
        login({
          id: user.id,
          email: user.email,
          fullName: user.name,
          token: access_token,
          role: user.role,
          refreshToken: refresh_token,
        })
      );

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Signin error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred during sign in"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (values: SignupFormData | SigninFormData) => {
    if (title === "signup") {
      handleSignup(values as SignupFormData);
    } else {
      handleSignin(values as SigninFormData);
    }
  };
  return (
    <>
      {success && type === "Sign Up" ? (
        <Card className="bg-background dark:bg-background-dark border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Thank you for signing up!
            </CardTitle>
            <CardDescription className="text-white">
              Check your email to confirm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-gray-500">
              You've successfully signed up. Please check your email to confirm
              your account before signing in.
            </p>
          </CardContent>
        </Card>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <Card className="bg-background dark:bg-background-dark border-none">
            <CardContent>
              {title === "signup" && (
                <FieldGroup className="gap-1">
                  <FieldLabel className="text-white">Full Name</FieldLabel>
                  <Input
                    className="auth-input"
                    type="text"
                    {...form.register("fullname")}
                  />
                  <FieldError>
                    {
                      (form.formState.errors as FieldErrors<SignupFormData>)
                        ?.fullname?.message
                    }
                  </FieldError>
                </FieldGroup>
              )}

              <FieldGroup className="gap-1">
                <FieldLabel className="text-white">
                  {title === "signup" ? "Email Address" : "Email"}
                </FieldLabel>
                <Input
                  className="auth-input"
                  type="email"
                  {...form.register("email")}
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </FieldGroup>
              <FieldGroup className="gap-1">
                <FieldLabel className="text-white">Password</FieldLabel>

                <Input
                  className="auth-input"
                  type="password"
                  {...form.register("password")}
                />
                <FieldError>
                  {form.formState.errors.password?.message}
                </FieldError>
              </FieldGroup>
              {title === "signup" && (
                <FieldGroup className="gap-1">
                  <FieldLabel className="text-white">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    className="auth-input"
                    type="password"
                    {...form.register("confirmPassword")}
                  />
                  <FieldError>
                    {
                      (form.formState.errors as FieldErrors<SignupFormData>)
                        .confirmPassword?.message
                    }
                  </FieldError>
                </FieldGroup>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <>{error && <p className="text-red-500">{error}</p>}</>
              <Button className="auth-btn-primary mt-4" type="submit">
                {isLoading ? (
                  <>
                    <Spinner />
                  </>
                ) : (
                  <>{type}</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </>
  );
};

export default AuthForm;
