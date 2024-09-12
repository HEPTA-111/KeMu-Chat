"use client";

import React, { useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import { redirect, useRouter } from "next/navigation";
import AppNavbar from "@/components/custom/AppNavbar";
import { Toaster } from "@/components/ui/toaster";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, userRole, signInUser, signOutUser } =
    useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     return router.replace("/auth/login");
  //   }
  // }, [isAuthenticated, router]);
  if (!isAuthenticated) {
    return redirect("/auth/login");
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <AppNavbar />
      </div>
      <div>{children}</div>
      <Toaster />
    </>
  );
};

export default ChatLayout;
