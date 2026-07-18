"use client";

import { AdminAuthProvider, useAdminAuth } from "@/components/admin/AdminAuthContext";
import { AdminProductProvider } from "@/components/admin/AdminProductContext";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

function AdminGate() {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <AdminProductProvider>
      <AdminDashboard />
    </AdminProductProvider>
  );
}

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}
