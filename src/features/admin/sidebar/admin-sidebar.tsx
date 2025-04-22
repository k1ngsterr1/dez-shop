"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Settings, X, Menu, House } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Продукты",
    icon: Package,
    href: "/admin/products",
  },
  {
    title: "Категории",
    icon: Settings,
    href: "/admin/category",
  },
  {
    title: "Главная",
    icon: House,
    href: "/",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar(); // ✅ Use context
  const isVisible = state === "expanded";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Show toggle button when sidebar is collapsed */}
      {!isVisible && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed left-4 top-4 z-50 shadow-md transition-all duration-300 hover:scale-105"
          size="icon"
          variant="outline"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open Sidebar</span>
        </Button>
      )}

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out ${
          isVisible
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ width: "var(--sidebar-width)" }}
      >
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="h-full w-full shadow-xl"
        >
          <SidebarHeader className="border-b !w-full bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="flex items-center justify-between px-2 py-5">
              <span className="text-base font-bold tracking-tight">
                PROFDEZ
              </span>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 transition-all duration-200 hover:rotate-90"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close Sidebar</span>
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 w-full py-6">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                    className="mb-2 py-2.5 flex items-center justify-center w-full transition-colors duration-200"
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarRail />
        </Sidebar>
      </div>
    </>
  );
}
