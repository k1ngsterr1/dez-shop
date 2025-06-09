"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Settings,
  X,
  Menu,
  HomeIcon as House,
  LayoutGrid,
  ListTree,
} from "lucide-react"; // Added ListTree
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"; // Assuming sidebar components are in ui
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Продукты",
    icon: Package,
    href: "/admin/products",
  },
  {
    title: "Категории",
    icon: LayoutGrid,
    href: "/admin/category",
  },
  {
    title: "Подкатегории",
    icon: ListTree,
    href: "/admin/subcategories",
  },
  {
    title: "Главная сайта",
    icon: House,
    href: "/",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar();
  const isVisible = state === "expanded";

  const isActive = (href: string) => {
    if (href === "/admin/products")
      return pathname.startsWith("/admin/products") || pathname === "/admin";
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {!isVisible && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed left-4 top-4 z-50 shadow-md transition-all duration-300 hover:scale-105"
          size="icon"
          variant="outline"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Открыть боковую панель</span>
        </Button>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out 
                  ${isVisible ? "translate-x-0" : "-translate-x-full"}
                  md:translate-x-0 md:static md:inset-y-auto md:h-auto`}
        style={{ width: "var(--sidebar-width, 250px)" }} // Provide a default width
      >
        <Sidebar
          variant="sidebar" // or "rail" if you want it to be rail by default on larger screens
          collapsible="icon"
          className="h-full w-full shadow-xl border-r"
        >
          <SidebarHeader className="border-b !w-full bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="flex items-center justify-between px-4 py-5 h-[65px]">
              {" "}
              {/* Fixed height for header */}
              <Link href="/admin" className="text-lg font-bold tracking-tight">
                PROFDEZ Admin
              </Link>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 transition-all duration-200 hover:rotate-90 md:hidden" // Hide on md and up if sidebar is static
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Закрыть боковую панель</span>
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-3 py-6 w-full">
            {" "}
            {/* Adjusted padding */}
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                    className="w-full justify-start" // Ensure text aligns left
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          {/* SidebarRail might be used if you have a rail mode, adjust as needed */}
          {/* <SidebarRail /> */}
        </Sidebar>
      </div>
    </>
  );
}
