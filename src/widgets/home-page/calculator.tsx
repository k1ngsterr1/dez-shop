"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Droplets,
  Ruler,
  Calendar,
  Repeat,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

import pharmacy from "@/assets/pharmacy.webp";
import { useContactFormStore } from "@/entities/contact-form/store/use-contact-form";

export function DisinfectantCalculator() {
  const { openContactForm } = useContactFormStore();
  const [area, setArea] = useState<number>(50);
  const [consumptionRate, setConsumptionRate] = useState<number>(150);
  const [cleaningFrequency, setCleaningFrequency] = useState<number>(1);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(30);
  const [concentration, setConcentration] = useState<number>(2);
  const [requiredAmountMl, setRequiredAmountMl] = useState<number>(0);
  const [requiredAmountL, setRequiredAmountL] = useState<number>(0);

  // Calculate results whenever any input changes
  useEffect(() => {
    const totalSolutionNeeded =
      area * consumptionRate * cleaningFrequency * daysPerMonth;
    const amountMl = totalSolutionNeeded * (concentration / 100);
    setRequiredAmountMl(amountMl);
    setRequiredAmountL(amountMl / 1000);
  }, [area, consumptionRate, cleaningFrequency, daysPerMonth, concentration]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 shadow-md">
      <div className="container w-full relative z-10 mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Калькулятор дезинфицирующих средств
          </h2>
        </div>

        <div className="grid items-start gap-8">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Рассчитайте необходимое количество дезинфицирующего средства для
              обработки поверхностей на основе площади, нормы расхода и
              концентрации.
            </p>
            <div className="relative rounded-xl h-[450px] w-full overflow-hidden mt-6 aspect-video">
              <Image
                src={pharmacy}
                alt="Помещение для дезинфекции"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white text-sm">
                  Пример помещения для расчета дезинфекции
                </p>
              </div>
            </div>
            <div className="w-full flex justify-between items-start gap-4">
              <Card className="w-full border border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6 pb-4">
                  <div className="grid gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-primary" />
                          <Label htmlFor="area">
                            Площадь обрабатываемых поверхностей (S), м²
                          </Label>
                        </div>
                        <span className="text-lg font-medium text-primary">
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
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          <Label htmlFor="consumptionRate">
                            Норма расхода рабочего раствора на 1 м² (мл)
                          </Label>
                        </div>
                        <span className="text-lg font-medium text-primary">
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
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-primary" />
                          <Label htmlFor="cleaningFrequency">
                            Кратность уборок в день
                          </Label>
                        </div>
                        <span className="text-lg font-medium text-primary">
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
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <Label htmlFor="daysPerMonth">
                            Количество дней в месяце
                          </Label>
                        </div>
                        <span className="text-lg font-medium text-primary">
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
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-primary" />
                          <Label htmlFor="concentration">
                            Концентрация рабочего раствора (K), %
                          </Label>
                        </div>
                        <span className="text-lg font-medium text-primary">
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
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full border border-border/50 bg-card/90 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-primary">
                    Результаты расчета
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8 py-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">
                        Необходимое количество средства в месяц, мл
                      </Label>
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-bold text-primary">
                          {Math.round(requiredAmountMl).toLocaleString("ru-RU")}
                        </p>
                        <span className="text-muted-foreground mb-1">мл</span>
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
                      <Label className="text-muted-foreground">
                        Необходимое количество средства в месяц, л
                      </Label>
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-bold text-primary">
                          {requiredAmountL.toLocaleString("ru-RU", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })}
                        </p>
                        <span className="text-muted-foreground mb-1">л</span>
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

                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-4 text-sm">
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
          <div className="mt-6">
            <Button
              className="w-full h-[55px] text-lg"
              onClick={openContactForm}
              size="lg"
            >
              Заказать расчетное количество
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
