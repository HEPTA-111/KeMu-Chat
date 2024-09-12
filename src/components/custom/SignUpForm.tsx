import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ThreeDots } from "react-loader-spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { redirect, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

interface FormValues {
  firstName: string;
  lastName: string;
  userRole: "staff" | "student" | "admin";
  department: string;
  schoolId: string;
  email: string;
  password: string;
}

export function SignUpForm() {
  const [loadingAll, setLoadingAll] = useState(false);
  const { isAuthLoading, isAuthenticated } = useAuth();
  if (isAuthenticated) {
    redirect("/");
  }
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const watchUserRole = watch("userRole");

  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (loading && isAuthLoading) {
      setLoadingAll(true);
    }
  }, [loading, isAuthLoading]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      if (userCredential && userCredential.user) {
        const { uid } = userCredential.user;

        // Create a new object with all user data
        const userDataFire = JSON.parse(JSON.stringify(userCredential.user));
        delete userDataFire.stsTokenManager;
        delete userDataFire.refreshToken;
        delete userDataFire.password;

        const userData = {
          ...userDataFire,
          firstName: data.firstName,
          lastName: data.lastName,

          department: data.department,
          schoolId: data.schoolId,
        };

        const KemuUserRole = { userRole: data.userRole };

        // Use setDoc to create a document with a specific ID
        await setDoc(doc(db, "kemuChatUsers", uid), userData);
        await setDoc(doc(db, "kemuUserRoles", uid), KemuUserRole);
        setLoadingAll(false);

        // Handle successful sign up (e.g., redirect or show message)
        if (data.userRole === "admin") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="Max"
                  required
                  {...register("firstName")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Robinson"
                  required
                  {...register("lastName")}
                />
              </div>
            </div>
            {/* User Roles */}
            <div className="grid gap-2">
              <Label htmlFor="Role">Role</Label>

              <select
                {...register("userRole")}
                id="userRole"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select your Role</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/*  */}
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="Computer Science Department"
                required
                {...register("department")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schoolId">
                {watchUserRole == "staff" || watchUserRole == "admin"
                  ? "Staff Number"
                  : "Admission Number"}
              </Label>
              <Input
                id="schoolId"
                placeholder={
                  watchUserRole == "staff" || watchUserRole == "admin"
                    ? "PF001"
                    : "CIS-1-7000-3-2000"
                }
                required
                {...register("schoolId")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email Address",
                  },
                })}
              />
              <div className="text-rose-500 text-sm px-2">
                {errors.email && errors.email.message}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password", {
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
              />
              <div className="text-rose-500 text-sm px-2">
                {errors.password && errors.password.message}
              </div>
            </div>
            {error && (
              <div className="text-rose-500 text-sm p-2 mt-2">
                {error.message}
              </div>
            )}
            {/* Submit  */}
            <Button type="submit" className="w-full" disabled={loadingAll}>
              {loadingAll && (
                <span className="mr-4">
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="white"
                  />
                </span>
              )}
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
