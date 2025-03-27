"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Search,
  Menu,
  X,
  Phone,
  ShoppingCart,
  User,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/shared/ui/toggle-mode/toggle-mode";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : ""
      }`}
    >
      <div className="bg-primary py-2 text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden space-x-6 text-sm md:flex">
            <Link
              href="/about"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              О нас
            </Link>
            <Link
              href="/contacts"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Контакты
            </Link>
            <Link
              href="/how-to-buy"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Как купить
            </Link>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link
              href="/register"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Регистрация
            </Link>
            <Link
              href="/login"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Войти
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Link href="/" className="mr-8 flex items-center">
                <div className="text-2xl font-bold">
                  <span className="text-primary">PROF</span>
                  <span className="text-primary/80">DEZ</span>
                  <span className="text-sm text-primary/60">.kz</span>
                </div>
              </Link>
              <div className="hidden md:block">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-3 w-3 text-primary/80" />
                    <a
                      href="tel:+77272486337"
                      className="text-sm hover:text-primary transition-colors"
                    >
                      +7(727) 248-63-37
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-3 w-3 text-primary/80" />
                    <a
                      href="tel:+77272480201"
                      className="text-sm hover:text-primary transition-colors"
                    >
                      +7(727) 248-02-01
                    </a>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <a
                      href="mailto:info@profdez.kz"
                      className="hover:text-primary transition-colors"
                    >
                      info@profdez.kz
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isSearchOpen ? (
                <div className="flex w-full items-center md:w-auto">
                  <Input
                    type="search"
                    placeholder="Поиск по сайту"
                    className="w-full md:w-64 focus-visible:ring-primary"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="rounded-full"
                  >
                    <Search className="h-4 w-4" />
                  </Button>

                  <Link href="/account" className="hidden md:flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/cart" className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-primary p-0 text-[10px] text-primary-foreground">
                        3
                      </Badge>
                    </Button>
                  </Link>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full md:hidden"
                      >
                        <Menu className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <div className="mt-8 flex flex-col space-y-4">
                        <Link
                          href="/about"
                          className="hover:text-primary transition-colors"
                        >
                          О нас
                        </Link>
                        <Link
                          href="/contacts"
                          className="hover:text-primary transition-colors"
                        >
                          Контакты
                        </Link>

                        <div className="pt-4">
                          <div className="mb-2 text-sm font-medium">
                            Контакты:
                          </div>
                          <div className="flex flex-col space-y-2 text-sm">
                            <a
                              href="tel:+77272486337"
                              className="hover:text-primary transition-colors"
                            >
                              +7(727) 248-63-37
                            </a>
                            <a
                              href="tel:+77272480201"
                              className="hover:text-primary transition-colors"
                            >
                              +7(727) 248-02-01
                            </a>
                            <a
                              href="mailto:info@profdez.kz"
                              className="hover:text-primary transition-colors"
                            >
                              info@profdez.kz
                            </a>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
