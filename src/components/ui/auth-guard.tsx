"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  getTokens,
  isTokenExpired,
  isUserAdmin,
} from "@/entities/user/utils/user.utils";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function AuthGuard({
  children,
  requiredRole = "ADMIN",
}: AuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated and has the required role
    const checkAuth = () => {
      const tokens = getTokens();

      // Not authenticated
      if (!tokens) {
        router.push("/login");
        return false;
      }

      // Token expired
      if (isTokenExpired()) {
        localStorage.removeItem("token");
        router.push("/login");
        return false;
      }

      // Role check
      if (requiredRole === "ADMIN" && !isUserAdmin()) {
        router.push("/"); // Redirect to non-admin area
        return false;
      }

      return true;
    };

    setIsAuthorized(checkAuth());
  }, [router, requiredRole]);

  // Show loading state while checking authorization
  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If authorized, render children
  return isAuthorized ? <>{children}</> : null;
}
