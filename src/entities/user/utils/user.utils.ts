"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
  exp?: number;
}

interface Tokens {
  access: string;
  refresh: string;
}

export function getTokens(): Tokens | null {
  if (typeof window === "undefined") return null;

  const tokenString = localStorage.getItem("token");
  if (!tokenString) return null;

  try {
    return JSON.parse(tokenString) as Tokens;
  } catch (e) {
    console.error("Failed to parse token from localStorage", e);
    return null;
  }
}

export function getTokenPayload(): TokenPayload | null {
  const tokens = getTokens();
  if (!tokens?.access) return null;

  try {
    return jwtDecode<TokenPayload>(tokens.access);
  } catch (e) {
    console.error("Failed to decode JWT token", e);
    return null;
  }
}

export function isUserAdmin(): boolean {
  const payload = getTokenPayload();
  return payload?.role === "ADMIN";
}

export function isTokenExpired(): boolean {
  const payload = getTokenPayload();
  if (!payload?.exp) return true;

  // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
  return payload.exp * 1000 < Date.now();
}

export function useAuthProtection(requiredRole?: string) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const tokens = getTokens();

      // Not authenticated at all
      if (!tokens) {
        router.push("/login");
        return false;
      }

      // Token expired
      if (isTokenExpired()) {
        // Could implement refresh token logic here
        localStorage.removeItem("token");
        router.push("/login");
        return false;
      }

      // Role check if required
      if (requiredRole) {
        const payload = getTokenPayload();
        if (payload?.role !== requiredRole) {
          router.push("/dashboard"); // Redirect to a default page
          return false;
        }
      }

      return true;
    };

    setIsAuthorized(checkAuth());
  }, [router, requiredRole]);

  return isAuthorized;
}
