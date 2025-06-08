"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import main from "@/assets/main.webp";
import { Droplets, Shield, Sparkles, CheckCircle } from "lucide-react";
import { useIsMobile } from "@/components/ui/sidebar";
import { useContactFormStore } from "@/entities/contact-form/store/use-contact-form";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { openContactForm } = useContactFormStore();

  const isMobile = useIsMobile();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>
        <div className="absolute top-[15%] right-[10%] w-32 h-32 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[5%] w-56 h-56 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-[40%] left-[15%] w-40 h-40 rounded-full bg-primary/3 blur-2xl"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--primary) 1px, transparent 1px), linear-gradient(180deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
      <div className="container w-full relative z-10 mx-auto mb-8 md:mb-16 px-4 md:px-6">
        <div
          className={`inline-flex px-2 items-center gap-2 bg-white/90 backdrop-blur-sm text-primary py-2 rounded-full shadow-md mb-6 md:mb-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-xs md:text-sm font-medium tracking-wide">
            Инновационные решения для дезинфекции
          </span>
        </div>
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div
            className={`transition-all duration-700 delay-100 ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold tracking-tight mb-4 md:mb-6 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90">
                Профессиональные
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                дезинфицирующие средства
              </span>
            </h1>
            <p className="mb-6 md:mb-8 text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Широкий ассортимент высококачественных дезинфицирующих и моющих
              средств для медицинских учреждений, пищевой промышленности и
              бытового использования.
            </p>
            <div className="flex flex-wrap gap-4 mb-6 md:mb-10">
              <Button
                variant="outline"
                onClick={openContactForm}
                size={isMobile ? "default" : "lg"}
                className="rounded-full cursor-pointer hover:bg-primary hover:text-white md:h-14 md:px-8 text-sm md:text-base"
              >
                Связаться с нами
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 flex-wrap">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="rounded-full bg-primary/10 p-1.5 md:p-2">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <span className="text-sm md:text-base">Сертифицировано</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="rounded-full bg-primary/10 p-1.5 md:p-2">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <span className="text-sm md:text-base">
                  Клинически проверено
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="rounded-full bg-primary/10 p-1.5 md:p-2">
                  <Droplets className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <span className="text-sm md:text-base">Экологично</span>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative aspect-[4/3] md:aspect-square xl:aspect-[4/3]">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl -z-10"></div>

              {/* Main image */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <Image
                  src={main || "/placeholder.svg"}
                  alt="Дезинфицирующие средства ProfDez"
                  fill
                  className="object-cover z-0"
                  priority
                  onLoad={() => setIsLoaded(true)}
                />
              </div>

              {/* Decorative diagonal line */}
              <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[10%] bg-primary/5 rotate-45 blur-md"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[10%] bg-primary/5 rotate-45 blur-md"></div>

              {/* Floating badges - Redesigned for mobile */}
              <div
                className="absolute top-4 -left-2 sm:top-8 sm:-left-8 bg-white/95 backdrop-blur-sm px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-xl z-20 flex items-center gap-2 sm:gap-3 hover:shadow-lg transition-shadow"
                style={{ maxWidth: isMobile ? "250px" : "none" }}
              >
                <div className="rounded-full bg-primary/10 p-1.5 sm:p-2 flex-shrink-0">
                  <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="font-medium text-sm sm:text-base dark:text-black whitespace-nowrap">
                  99.9% эффективность
                </span>
              </div>

              <div
                className="absolute -bottom-4 sm:-bottom-6 left-[10%] sm:left-[20%] bg-white/95 backdrop-blur-sm px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-xl z-20 flex items-center gap-2 sm:gap-3 hover:shadow-lg transition-shadow"
                style={{ maxWidth: isMobile ? "320px" : "none" }}
              >
                <div className="rounded-full bg-primary/10 p-1.5 sm:p-2 flex-shrink-0">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="font-medium text-sm sm:text-base dark:text-black whitespace-nowrap">
                  Безопасно для поверхностей
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
