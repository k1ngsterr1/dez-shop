import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/features/header/header";
import { Footer } from "@/features/footer/footer";
import { ThemeProvider } from "next-themes";
import { ContactFormPopup } from "@/entities/contact-form/ui/contact-form-popup";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "ProfDez - Профессиональные дезинфицирующие средства",
  description:
    "Профессиональные дезинфицирующие и моющие средства в Казахстане",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 px-5">{children}</main>
            <ContactFormPopup />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
