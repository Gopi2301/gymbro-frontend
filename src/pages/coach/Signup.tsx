import { Button } from "@/components/ui/button";
import {useForm, Controller} from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import type { CoachSignupFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { coachSignupSchema } from "@/schemas/auth";

const CoachSignup = () => {
  const navigate = useNavigate();
  const form = useForm<CoachSignupFormData>({
    resolver: zodResolver(coachSignupSchema),
    defaultValues: {
      fullname: "",
      work_email: "",
      password: "",
      confirmPassword: "",
      gym_name: "",
      members: "",
      gym_address: "",
    }
  })
  const onSubmit = async (data: CoachSignupFormData) => {
    // call api to create coach
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/coach/signup`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gymAddress:data.gym_address,
        gymName:data.gym_name,
        members:data.members,
        name:data.fullname,
        password:data.password,
        work_email:data.work_email,
        role:"coach"
      })
    })
    const result = await response.json();
    console.log(result);
    if(response.ok){
      navigate("/sign-in");
    }
  }
  return (
    <div className="bg-background-dark h-full w-full">
      {/* header */}
      <header className="container py-6">
        <div className="flex flex-row justify-between items-center px-12">
          {/* logo */}
          <img src="/logo.svg" alt="" className="w-16 h-16" />
          <Button
            className="auth-btn-primary w-16"
            onClick={() => navigate("/sign-in")}
          >
            Login
          </Button>
        </div>
      </header>
      {/* main */}
      <main className="container py-6">
        {/* title */}
        <div className="">
          <h1 className="">Create Your Admin Account</h1>
          <p className="text-lg text-gray-300">
            Unlock tools to manage your members, trainers, and workout plans
          </p>
        </div>
        {/* auth forms */}
        <div className="mt-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend className="text-lg font-bold text-white">
                  Admin Details
                </FieldLegend>
                <FieldGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel className="text-input-label" htmlFor="fullname">
                        Full Name
                      </FieldLabel>
                      <Input
                        id="fullname"
                        type="text"
                        placeholder="Enter your full name"
                        className="auth-input"
                        {...form.register("fullname")}
                      />
                      <FieldError className="text-input-error">
                        {form.formState.errors.fullname?.message}
                      </FieldError>
                    </Field>
                    <Field>
                        <FieldLabel className="text-input-label" htmlFor="work_email">
                            Work Email
                        </FieldLabel>
                        <Input id="work_email" type="email" placeholder="Enter your work email" className="auth-input" {...form.register("work_email")}/>
                        <FieldError className="text-input-error">
                            {form.formState.errors.work_email?.message}
                        </FieldError>
                    </Field>
                    <Field>
                        <FieldLabel className="text-input-label" htmlFor="password">
                            Password
                        </FieldLabel>
                        <Input id="password" type="password" placeholder="Enter your password" className="auth-input" {...form.register("password")}/>
                        <FieldError className="text-input-error">
                            {form.formState.errors.password?.message}
                        </FieldError>
                    </Field>
                    <Field>
                        <FieldLabel className="text-input-label" htmlFor="confirm_password">
                            Confirm Password
                        </FieldLabel>
                        <Input id="confirm_password" type="password" placeholder="Confirm your password" className="auth-input" {...form.register("confirmPassword")}/>
                        <FieldError className="text-input-error">
                            {form.formState.errors.confirmPassword?.message}
                        </FieldError>
                    </Field>
                  </div>
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldLegend className="text-lg font-bold text-white">
                  Gym Details
                </FieldLegend>
                <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel className="text-input-label" htmlFor="gym_name">
                                Gym Name
                            </FieldLabel>
                        <Input id="gym_name" type="text" className="auth-input" placeholder="Enter your gym name" {...form.register("gym_name")} />
                        <FieldError className="text-input-error">
                            {form.formState.errors.gym_name?.message}
                        </FieldError>
                    </Field>
                    <Field>
                        <FieldLabel className="text-input-label" htmlFor="members">
                            Number of Members
                        </FieldLabel>
                        <Controller
                          control={form.control}
                          name="members"
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger id="members" className="auth-input">
                                <SelectValue placeholder="Select a range" />
                              </SelectTrigger>
                              <SelectContent className="auth-select-dropdown">
                                <SelectItem value="1-10" className="auth-select-item">
                                  1-10
                                </SelectItem>
                                <SelectItem value="11-20" className="auth-select-item">
                                  11-20
                                </SelectItem>
                                <SelectItem value="21-30" className="auth-select-item">
                                  21-30
                                </SelectItem>
                                <SelectItem value="31-40" className="auth-select-item">
                                  31-40
                                </SelectItem>
                                <SelectItem value="41-50" className="auth-select-item">
                                  41-50
                                </SelectItem>
                                <SelectItem value="51-60" className="auth-select-item">
                                  51-60
                                </SelectItem>
                                <SelectItem value="61-70" className="auth-select-item">
                                  61-70
                                </SelectItem>
                                <SelectItem value="71-80" className="auth-select-item">
                                  71-80
                                </SelectItem>
                                <SelectItem value="81-90" className="auth-select-item">
                                  81-90
                                </SelectItem>
                                <SelectItem value="91-100" className="auth-select-item">
                                  91-100
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FieldError className="text-input-error">
                            {form.formState.errors.members?.message}
                        </FieldError>
                    </Field>
                    </div>  
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldLabel htmlFor="gym_address" className="text-input-label" >
                    Gym Address
                </FieldLabel>
                <Input type="text" placeholder="Enter your gym address" className="auth-input" {...form.register("gym_address")}/>
                <FieldError className="text-input-error">
                    {form.formState.errors.gym_address?.message}
                </FieldError>
              </FieldSet>
              <Field>
                <Button type="submit" className="auth-btn-primary w-16" onClick={form.handleSubmit(onSubmit)}>
                    Sign Up
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CoachSignup;
