"use client";

import type React from "react";
import "./globals.css";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/sidebar/admin-sidebar";
import { AuthGuard } from "@/components/ui/auth-guard";

// Wrapper component to access sidebar state
function MainContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  const isOpen = state === "expanded"; // reactive to state changes

  return (
    <div
      className={`flex-1 w-0 ${
        // Adjusted margin to match sidebar width (250px)
        isOpen ? "md:ml-[150px]" : "md:ml-0" // Assuming sidebar is 250px
      } transition-margin duration-300`} // Changed transition to margin
    >
      {/* Added overflow-x-hidden here to prevent scroll from this div */}
      <main className="h-full p-6 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthGuard requiredRole="ADMIN">
          <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full overflow-x">
              <AdminSidebar />
              <MainContent>{children}</MainContent>
            </div>
          </SidebarProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
