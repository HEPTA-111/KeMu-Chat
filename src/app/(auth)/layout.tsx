import NavBar from "@/components/custom/NavBar";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" flex items-center justify-around">
        <NavBar />
      </div>
      <div className=" h-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
