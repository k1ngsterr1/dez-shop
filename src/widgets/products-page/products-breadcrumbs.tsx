// This is a placeholder for ProductBreadcrumbs.tsx as its content was not provided.
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbsProps {
  productName: string;
  categoryName?: string; // Optional: if you want to include category
  categoryLink?: string; // Optional: link for the category
}

export function ProductBreadcrumbs({
  productName,
  categoryName,
  categoryLink,
}: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary">
            Главная
          </Link>
        </li>
        {categoryName && (
          <>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                href={categoryLink || "/products"}
                className="hover:text-primary"
              >
                {categoryName}
              </Link>
            </li>
          </>
        )}
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li
          className="font-medium text-foreground truncate"
          aria-current="page"
        >
          {productName}
        </li>
      </ol>
    </nav>
  );
}
