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
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";
import { redirect, useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "@/app/providers/AuthProvider";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

interface FormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const { isAuthenticated, signInUser, isAuthLoading } = useAuth();
  if (isAuthenticated) {
    redirect("/");
  }
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const user = await signInUser(data.email, data.password);
      if (user) {
        const userDocRef = doc(db, "kemuChatUsers", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        const userRoleDocRef = doc(db, "kemuUserRoles", user.uid);
        const userRoleDocSnap = await getDoc(userRoleDocRef);

        if (userDocSnap.exists() && userRoleDocSnap.exists()) {
          const userData = userDocSnap.data();
          const userRoleData = userRoleDocSnap.data();
          const loginLogsDocRef = collection(db, "kemuLoginLogs");
          await addDoc(loginLogsDocRef, {
            userId: user.uid,
            email: user.email,
            last_login: serverTimestamp(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            userRole: userRoleData.userRole,
          });
          console.log("Login Logs Document Added");
        } else {
          console.error("User document does not exist in Firestore");
        }

        router.replace("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                required
                id="password"
                type="password"
                {...register("password")}
              />
            </div>
            {/* Errors */}
            {/* {error && (
              <div className="text-rose-500 text-sm p-2 mt-2">
                {error.message}
              </div>
            )} */}
            {/* Login */}
            <Button type="submit" className="w-full">
              {isAuthLoading && (
                <span className="mr-4">
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="white"
                  />
                </span>
              )}
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
