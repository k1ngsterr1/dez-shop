"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/admin",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    title: "Products",
    icon: Package,
    href: "/admin/products",
    subItems: [
      {
        title: "All Products",
        href: "/admin/products",
      },
      {
        title: "Add Product",
        href: "/admin/products/new",
      },
      {
        title: "Categories",
        href: "/admin/products/categories",
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/admin/customers",
  },
  {
    title: "Content",
    icon: FileText,
    href: "/admin/content",
    subItems: [
      {
        title: "Pages",
        href: "/admin/content/pages",
      },
      {
        title: "Blog Posts",
        href: "/admin/content/blog",
      },
      {
        title: "Media Library",
        href: "/admin/content/media",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Admin Panel</span>
            <span className="text-xs text-muted-foreground">
              Manage your business
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.subItems ? (
                <>
                  <SidebarMenuButton
                    onClick={() => toggleMenu(item.title)}
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    <span className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 transition-transform ${
                          openMenus[item.title] ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </SidebarMenuButton>
                  {openMenus[item.title] && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(subItem.href)}
                          >
                            <Link href={subItem.href}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/mystical-forest-spirit.png" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
