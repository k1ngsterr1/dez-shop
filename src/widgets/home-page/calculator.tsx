"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Droplets,
  Ruler,
  Calendar,
  Repeat,
  Percent,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { useContactFormStore } from "@/entities/contact-form/store/use-contact-form";
import { useIsMobile } from "@/components/ui/sidebar";
import { useProductsQuery } from "@/entities/product/hooks/query/use-get-products.query";
import { useOnClickOutside } from "@/hooks/use-click-outside";

// Define facility types with their images and titles
const facilityTypes = [
  {
    id: "pharmacy",
    title: "АПТЕКА",
    description: "Помещение аптеки для расчета дезинфекции",
    image: "/pharmacy.webp",
  },
  {
    id: "dental",
    title: "Стоматологический кабинет",
    description: "Стоматологический кабинет для расчета дезинфекции",
    image: "/dentist.webp",
  },
  {
    id: "hospital",
    title: "Больница",
    description: "Больничное помещение для расчета дезинфекции",
    image: "/hospital.webp",
  },
];

export function DisinfectantCalculator() {
  const isMobile = useIsMobile();
  const { openContactForm } = useContactFormStore();
  const [area, setArea] = useState<number>(50);
  const [consumptionRate, setConsumptionRate] = useState<number>(150);
  const [cleaningFrequency, setCleaningFrequency] = useState<number>(1);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(30);
  const [concentration, setConcentration] = useState<number>(2);
  const [requiredAmountMl, setRequiredAmountMl] = useState<number>(0);
  const [requiredAmountL, setRequiredAmountL] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const { data: products, isLoading: productsLoading } = useProductsQuery();

  const [productSearchTerm, setProductSearchTerm] = useState<string>("");
  const [showProductDropdown, setShowProductDropdown] =
    useState<boolean>(false);
  const productSearchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(productSearchRef as any, () =>
    setShowProductDropdown(false)
  );

  const filteredProducts =
    products?.filter((product: any) =>
      product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
    ) || [];

  // State for image swiper
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  // Calculate results whenever any input changes
  useEffect(() => {
    const totalSolutionNeeded =
      area * consumptionRate * cleaningFrequency * daysPerMonth;
    const amountMl = totalSolutionNeeded * (concentration / 100);
    setRequiredAmountMl(amountMl);
    setRequiredAmountL(amountMl / 1000);
  }, [area, consumptionRate, cleaningFrequency, daysPerMonth, concentration]);

  // Function to navigate to the next image
  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === facilityTypes.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to navigate to the previous image
  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? facilityTypes.length - 1 : prevIndex - 1
    );
  };

  // Animation variants for the image swiper
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 shadow-md">
      <div className="container w-full relative z-10 mx-auto px-4 py-6 md:py-12">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <h2 className="text-xl font-bold tracking-tight md:text-3xl">
            Калькулятор дезинфицирующих средств
          </h2>
        </div>

        <div className="grid items-start gap-6">
          <div className="space-y-4 md:space-y-6">
            <p className="text-sm md:text-base text-muted-foreground">
              Рассчитайте необходимое количество дезинфицирующего средства для
              обработки поверхностей на основе площади, нормы расхода и
              концентрации.
            </p>

            {/* Image Swiper */}
            <div className="relative rounded-xl h-[200px] sm:h-[300px] md:h-[450px] w-full overflow-hidden mt-4 md:mt-6 aspect-video">
              <div className="absolute inset-0 flex items-center justify-between z-20 px-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Предыдущее изображение</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Следующее изображение</span>
                </Button>
              </div>

              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      facilityTypes[currentImageIndex].image ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={facilityTypes[currentImageIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-start justify-end p-4">
                    <h3 className="text-white text-lg md:text-xl font-medium mb-1">
                      {facilityTypes[currentImageIndex].title}
                    </h3>
                    <p className="text-white text-xs md:text-sm">
                      {facilityTypes[currentImageIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Image indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-20">
                {facilityTypes.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/40"
                    }`}
                    onClick={() => {
                      setDirection(index > currentImageIndex ? 1 : -1);
                      setCurrentImageIndex(index);
                    }}
                    aria-label={`Перейти к изображению ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Selector */}
            <div className="w-full mb-4 md:mb-6">
              <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-4 md:pt-6 pb-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="product"
                      className="text-sm md:text-base font-medium"
                    >
                      Выберите дезинфицирующее средство
                    </Label>
                    <div className="relative" ref={productSearchRef}>
                      <Input
                        id="product"
                        type="text"
                        placeholder="Введите название продукта"
                        value={productSearchTerm}
                        onChange={(e) => {
                          setProductSearchTerm(e.target.value);
                          setShowProductDropdown(true);
                        }}
                        onFocus={() => {
                          if (productSearchTerm) setShowProductDropdown(true);
                        }}
                        className="w-full"
                      />

                      {showProductDropdown && (
                        <div className="absolute z-50 w-full mt-1 max-h-[200px] overflow-y-auto rounded-md border bg-background shadow-md">
                          {productsLoading ? (
                            <div className="flex items-center justify-center p-4">
                              <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                              <span>Загрузка...</span>
                            </div>
                          ) : filteredProducts.length > 0 ? (
                            <div className="py-2">
                              {filteredProducts.map((product: any) => (
                                <div
                                  key={product.id}
                                  className="flex items-center gap-3 px-4 py-2 hover:bg-accent cursor-pointer"
                                  onClick={() => {
                                    setSelectedProduct(product.id);
                                    setProductSearchTerm(product.name);
                                    setShowProductDropdown(false);
                                  }}
                                >
                                  <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-md border">
                                    <Image
                                      src={
                                        product.image ||
                                        "/placeholder.svg?height=32&width=32&query=product"
                                      }
                                      alt={product.name}
                                      width={32}
                                      height={32}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                      {product.name}
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
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Responsive layout - stack on mobile, side by side on desktop */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4">
              <Card className="w-full border border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-4 md:pt-6 pb-4">
                  <div className="grid gap-4 md:gap-6">
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-primary" />
                          <Label
                            htmlFor="area"
                            className="text-sm md:text-base"
                          >
                            Площадь поверхностей (S), м²
                          </Label>
                        </div>
                        <span className="text-base md:text-lg font-medium text-primary">
                          {area}
                        </span>
                      </div>
                      <Slider
                        id="area"
                        min={1}
                        max={500}
                        step={1}
                        value={[area]}
                        onValueChange={(value) => setArea(value[0])}
                        className="py-1"
                      />
                      <Input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
                        className="mt-1 md:mt-2 h-9"
                      />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          <Label
                            htmlFor="consumptionRate"
                            className="text-sm md:text-base"
                          >
                            Норма расхода на 1 м² (мл)
                          </Label>
                        </div>
                        <span className="text-base md:text-lg font-medium text-primary">
                          {consumptionRate}
                        </span>
                      </div>
                      <Slider
                        id="consumptionRate"
                        min={50}
                        max={500}
                        step={10}
                        value={[consumptionRate]}
                        onValueChange={(value) => setConsumptionRate(value[0])}
                        className="py-1"
                      />
                      <Input
                        type="number"
                        value={consumptionRate}
                        onChange={(e) =>
                          setConsumptionRate(Number(e.target.value))
                        }
                        className="mt-1 md:mt-2 h-9"
                      />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-primary" />
                          <Label
                            htmlFor="cleaningFrequency"
                            className="text-sm md:text-base"
                          >
                            Кратность уборок в день
                          </Label>
                        </div>
                        <span className="text-base md:text-lg font-medium text-primary">
                          {cleaningFrequency}
                        </span>
                      </div>
                      <Slider
                        id="cleaningFrequency"
                        min={1}
                        max={10}
                        step={1}
                        value={[cleaningFrequency]}
                        onValueChange={(value) =>
                          setCleaningFrequency(value[0])
                        }
                        className="py-1"
                      />
                      <Input
                        type="number"
                        value={cleaningFrequency}
                        onChange={(e) =>
                          setCleaningFrequency(Number(e.target.value))
                        }
                        className="mt-1 md:mt-2 h-9"
                      />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <Label
                            htmlFor="daysPerMonth"
                            className="text-sm md:text-base"
                          >
                            Количество дней в месяце
                          </Label>
                        </div>
                        <span className="text-base md:text-lg font-medium text-primary">
                          {daysPerMonth}
                        </span>
                      </div>
                      <Slider
                        id="daysPerMonth"
                        min={1}
                        max={31}
                        step={1}
                        value={[daysPerMonth]}
                        onValueChange={(value) => setDaysPerMonth(value[0])}
                        className="py-1"
                      />
                      <Input
                        type="number"
                        value={daysPerMonth}
                        onChange={(e) =>
                          setDaysPerMonth(Number(e.target.value))
                        }
                        className="mt-1 md:mt-2 h-9"
                      />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-primary" />
                          <Label
                            htmlFor="concentration"
                            className="text-sm md:text-base"
                          >
                            Концентрация раствора (K), %
                          </Label>
                        </div>
                        <span className="text-base md:text-lg font-medium text-primary">
                          {concentration}%
                        </span>
                      </div>
                      <Slider
                        id="concentration"
                        min={0.1}
                        max={10}
                        step={0.1}
                        value={[concentration]}
                        onValueChange={(value) => setConcentration(value[0])}
                        className="py-1"
                      />
                      <Input
                        type="number"
                        value={concentration}
                        onChange={(e) =>
                          setConcentration(Number(e.target.value))
                        }
                        step="0.1"
                        className="mt-1 md:mt-2 h-9"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full mt-4 md:mt-0 border border-border/50 bg-card/90 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-1 md:pb-2 pt-4 md:pt-6">
                  <CardTitle className="text-lg md:text-xl text-primary">
                    Результаты расчета
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 md:space-y-8 py-2 md:py-4">
                    <div className="space-y-2">
                      <Label className="text-xs md:text-sm text-muted-foreground">
                        Необходимое количество средства в месяц, мл
                      </Label>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl md:text-4xl font-bold text-primary">
                          {Math.round(requiredAmountMl).toLocaleString("ru-RU")}
                        </p>
                        <span className="text-xs md:text-sm text-muted-foreground mb-1">
                          мл
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-primary transition-all duration-500 ease-in-out"
                          style={{
                            width: `${Math.min(
                              100,
                              (requiredAmountMl / 10000) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs md:text-sm text-muted-foreground">
                        Необходимое количество средства в месяц, л
                      </Label>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl md:text-4xl font-bold text-primary">
                          {requiredAmountL.toLocaleString("ru-RU", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })}
                        </p>
                        <span className="text-xs md:text-sm text-muted-foreground mb-1">
                          л
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-primary transition-all duration-500 ease-in-out"
                          style={{
                            width: `${Math.min(
                              100,
                              (requiredAmountL / 10) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-3 md:pt-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                        {selectedProduct && products && (
                          <div className="col-span-2 mb-2">
                            <p className="text-muted-foreground">
                              Выбранное средство
                            </p>
                            <p className="font-medium">
                              {products.find(
                                (p: any) => p.id === selectedProduct
                              )?.name || "Не выбрано"}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-muted-foreground">Площадь</p>
                          <p className="font-medium">{area} м²</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Расход на 1 м²
                          </p>
                          <p className="font-medium">{consumptionRate} мл</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Уборок в день</p>
                          <p className="font-medium">{cleaningFrequency}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Дней в месяце</p>
                          <p className="font-medium">{daysPerMonth}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Концентрация</p>
                          <p className="font-medium">{concentration}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="mt-2 md:mt-6">
            <Button
              className="w-full h-12 md:h-[55px] text-base md:text-lg"
              onClick={openContactForm}
              size={isMobile ? "default" : "lg"}
            >
              Заказать расчетное количество
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
