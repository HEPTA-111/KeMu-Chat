import React from "react";
import { redirect } from "next/navigation";

const AdminPage = () => {
  redirect("/admin/dashboard");
  // return <div>AdminPage</div>;
};

export default AdminPage;
