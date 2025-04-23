"use client";

import type React from "react";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  Loader2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/shared/ui/toggle-mode/toggle-mode";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useProductsQuery } from "@/entities/product/hooks/query/use-get-products.query";

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
    // Navigate to product page
    window.location.href = `/product/${productId}`;
  };

  const filteredProducts =
    products?.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
                          {filteredProducts.map((product: Product) => (
                            <div
                              key={product.id}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-accent cursor-pointer"
                              onClick={() => handleProductClick(product.id)}
                            >
                              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                                <Image
                                  src={
                                    product.image ||
                                    "/placeholder.svg?height=48&width=48&query=product"
                                  }
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
                                <p className="text-sm text-primary font-semibold">
                                  {new Intl.NumberFormat("ru-KZ", {
                                    style: "currency",
                                    currency: "KZT",
                                    maximumFractionDigits: 0,
                                  }).format(product.price)}
                                </p>
                              </div>
                            </div>
                          ))}
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
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="rounded-full"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
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
