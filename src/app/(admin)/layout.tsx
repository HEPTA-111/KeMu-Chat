"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import AppNavbar from "@/components/custom/AppNavbar";
import { Toaster } from "@/components/ui/toaster";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { user, isAuthenticated, userRole, signInUser, signOutUser } =
    useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      return router.replace("/auth/login");
    } else if (userRole?.userRole == "blocked") {
      return router.replace("/blocked");
    } else if (userRole?.userRole !== "admin") {
      return router.replace("/");
    }
  }, [isAuthenticated, router, userRole]);

  return (
    <div>
      <div className="sticky top-0 z-40">
        <AppNavbar />
      </div>

      <div>{children}</div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
