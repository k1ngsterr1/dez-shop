"use client";

import type React from "react";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Facebook,
  Instagram,
  Search,
  Menu,
  X,
  Phone,
  Loader2,
  Mail,
  Users2,
  MapPin,
  ShoppingBag,
  Calculator,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/shared/ui/toggle-mode/toggle-mode";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useProductsQuery } from "@/entities/product/hooks/query/use-get-products.query";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: products, isLoading } = useProductsQuery(debouncedSearchTerm);

  const searchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef as any, () => setShowResults(false));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const handleSearchFocus = () => {
    if (searchTerm.length > 0) {
      setShowResults(true);
    }
  };

  const handleProductClick = (productId: string) => {
    setShowResults(false);
    window.location.href = `/product/${productId}`;
  };

  const filteredProducts =
    products?.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Parse items JSON and get min price for display
  function getMinPrice(items: string | undefined) {
    if (!items) return null;
    try {
      const parsed = JSON.parse(items);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return Math.min(...parsed.map((i) => i.price));
      }
    } catch {
      return null;
    }
    return null;
  }

  function getFirstImage(images: string[] | undefined) {
    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }
    return "/placeholder.svg?height=48&width=48&query=product";
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : ""
      }`}
    >
      <div className="bg-primary py-2 text-primary-foreground">
        <div className="container w-full mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link
              href="https://www.facebook.com/prof.dez.2025/"
              target="_blank"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.instagram.com/profdez.kz/"
              target="_blank"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden space-x-6 text-sm md:flex mr-12">
            <Link
              href="/catalogue"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Каталог
            </Link>
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
              href="/calculator"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Калькулятор
            </Link>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="border-b bg-background">
        <div className="container w-full mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Link href="/" className="mr-8 flex items-center">
                <Image
                  alt="Profdez.kz"
                  src="/logo.svg"
                  width={205}
                  height={102}
                />
              </Link>
              <div className="hidden md:block">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-3 w-3 text-primary/80" />
                    <a
                      href="tel:+77000246777"
                      className="text-sm hover:text-primary transition-colors"
                    >
                      +7(700) 024-67-77
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
                <div
                  className="relative flex w-full items-center md:w-auto"
                  ref={searchRef}
                >
                  <Input
                    type="search"
                    placeholder="Поиск по сайту"
                    className="w-full md:w-64"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchTerm("");
                      setShowResults(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* Search Results Dropdown */}
                  {showResults && (
                    <div className="absolute top-full left-0 right-0 mt-1 max-h-[300px] overflow-y-auto rounded-md border bg-background shadow-md z-50">
                      {isLoading ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          <span className="ml-2">Загрузка...</span>
                        </div>
                      ) : filteredProducts.length > 0 ? (
                        <div className="py-2">
                          {filteredProducts.map((product: any) => {
                            const minPrice = getMinPrice(product.items);
                            const imageUrl = getFirstImage(product.images);
                            return (
                              <div
                                key={product.id}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-accent cursor-pointer"
                                onClick={() => handleProductClick(product.id)}
                              >
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-white">
                                  <Image
                                    src={imageUrl}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {product.name}
                                  </p>
                                  {minPrice !== null && (
                                    <p className="text-sm text-primary font-semibold">
                                      от{" "}
                                      {new Intl.NumberFormat("ru-KZ", {
                                        style: "currency",
                                        currency: "KZT",
                                        maximumFractionDigits: 0,
                                      }).format(minPrice)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          Ничего не найдено
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="rounded-full h-9 w-9 border-primary/20 hover:bg-primary/5 transition-all"
                  >
                    <Search className="h-4 w-4 text-primary" />
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-9 w-9 border-primary/20 hover:bg-primary/5 transition-all md:hidden"
                      >
                        <Menu className="h-4 w-4 text-primary" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="border-l border-primary/10 bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
                      <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-primary">
                          Меню
                        </SheetTitle>
                        <SheetDescription>
                          Навигация и контактная информация
                        </SheetDescription>
                      </SheetHeader>
                      <div className="flex flex-col space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Навигация
                          </h3>
                          <div className="flex flex-col space-y-1">
                            <Link
                              href="/about"
                              className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary/5 transition-all"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Users2 className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium group-hover:text-primary transition-colors">
                                О нас
                              </span>
                            </Link>
                            <Link
                              href="/about"
                              className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary/5 transition-all"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <ShoppingBag className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium group-hover:text-primary transition-colors">
                                Каталог
                              </span>
                            </Link>
                            <Link
                              href="/contacts"
                              className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary/5 transition-all"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <MapPin className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium group-hover:text-primary transition-colors">
                                Контакты
                              </span>
                            </Link>
                            <Link
                              href="/calculator"
                              className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary/5 transition-all"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Calculator className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium group-hover:text-primary transition-colors">
                                Калькулятор
                              </span>
                            </Link>
                          </div>
                        </div>

                        <Separator className="bg-primary/10" />

                        <div className="space-y-3 pl-2">
                          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Связаться с нами
                          </h3>
                          <div className="flex flex-col space-y-3 rounded-xl w-[95%] bg-primary/5 p-4">
                            <a
                              href="tel:+77272486337"
                              className="group flex items-center gap-3"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Phone className="h-4 w-4 text-primary" />
                              </div>
                              <span className="group-hover:text-primary transition-colors">
                                +7(727) 248-63-37
                              </span>
                            </a>
                            <a
                              href="tel:+77272480201"
                              className="group flex items-center gap-3"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Phone className="h-4 w-4 text-primary" />
                              </div>
                              <span className="group-hover:text-primary transition-colors">
                                +7(727) 248-02-01
                              </span>
                            </a>
                            <a
                              href="mailto:info@profdez.kz"
                              className="group flex items-center gap-3"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Mail className="h-4 w-4 text-primary" />
                              </div>
                              <span className="group-hover:text-primary transition-colors">
                                info@profdez.kz
                              </span>
                            </a>
                          </div>
                        </div>

                        <Separator className="bg-primary/10" />
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
