import React from "react";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
