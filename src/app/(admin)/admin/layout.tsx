"use client";

import type React from "react";
import "./globals.css";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/sidebar/admin-sidebar";

// Wrapper component to access sidebar state
function MainContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();

  const isOpen = state === "expanded"; // reactive to state changes

  return (
    <div
      className={`flex-1 w-0 ${
        isOpen ? "md:ml-[400px]" : ""
      } transition-all duration-300`}
    >
      <main className="h-full p-6">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <AdminSidebar />
            <MainContent>{children}</MainContent>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
