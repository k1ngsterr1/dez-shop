import React from "react";
import { cn } from "@/lib/utils";

interface SanitizeLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
  showText?: boolean;
}

// Clean minimalistic droplet loader - MAIN LOADER FOR WEBSITE
export function DropletLoader({
  className,
  size = "md",
  text = "Загрузка...",
  showText = true,
  showCircularLoader = true,
}: SanitizeLoaderProps & { showCircularLoader?: boolean }) {
  const dropletSizes = {
    sm: "w-8 h-10",
    md: "w-12 h-14",
    lg: "w-16 h-20",
  };

  const containerSizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      {/* Main droplet container */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          containerSizes[size]
        )}
      >
        {/* Optional circular loader */}
        {showCircularLoader && (
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#B3DAFF] animate-spin opacity-60"
            style={{ animationDuration: "2s" }}
          ></div>
        )}

        {/* Single blue droplet icon */}
        <div
          className={cn("flex items-center justify-center", dropletSizes[size])}
        >
          <svg
            viewBox="0 0 24 32"
            fill="none"
            className="w-full h-full animate-pulse"
            style={{
              animationDuration: "2s",
              animationTimingFunction: "ease-in-out",
            }}
          >
            {/* Droplet shape */}
            <path
              d="M12 2C12 2 4 12 4 20C4 24.4183 7.58172 28 12 28C16.4183 28 20 24.4183 20 20C20 12 12 2 12 2Z"
              fill="#3399FF"
              stroke="none"
            />
          </svg>
        </div>
      </div>

      {/* Loading text */}
      {showText && (
        <p className={cn("text-[#3399FF] font-medium", textSizeClasses[size])}>
          {text}
        </p>
      )}
    </div>
  );
}

// Skeleton loader for sanitize products (kept for product loading states)
export function SanitizeProductSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-blue-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
