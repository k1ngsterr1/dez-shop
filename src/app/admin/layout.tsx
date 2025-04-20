import type React from "react";
import type { Metadata } from "next";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/sidebar/admin-sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing your application",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <AdminSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <main className="h-full bg-muted/10">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
