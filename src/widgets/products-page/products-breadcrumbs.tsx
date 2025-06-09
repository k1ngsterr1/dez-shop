"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbsProps {
  productName: string;
  categoryName?: string;
  categoryLink?: string;
  subcategoryName?: string; // Added
  subcategoryLink?: string; // Added
}

export function ProductBreadcrumbs({
  productName,
  categoryName,
  categoryLink,
  subcategoryName, // Added
  subcategoryLink, // Added
}: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground flex-wrap">
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
                href={
                  categoryLink ||
                  `/category/${encodeURIComponent(categoryName)}`
                }
                className="hover:text-primary"
              >
                {categoryName}
              </Link>
            </li>
          </>
        )}
        {subcategoryName &&
          categoryName && ( // Display subcategory only if category is also present
            <>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link
                  href={
                    subcategoryLink ||
                    `/category/${encodeURIComponent(
                      categoryName
                    )}/${encodeURIComponent(subcategoryName)}`
                  }
                  className="hover:text-primary"
                >
                  {subcategoryName}
                </Link>
              </li>
            </>
          )}
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li
          className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none" // Added max-width for smaller screens
          aria-current="page"
        >
          {productName}
        </li>
      </ol>
    </nav>
  );
}
