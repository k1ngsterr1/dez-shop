import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Профессиональные дезинфицирующие средства
            </h1>
            <p className="mb-6 max-w-md text-muted-foreground md:text-lg">
              Широкий ассортимент высококачественных дезинфицирующих и моющих
              средств для медицинских учреждений, пищевой промышленности и
              бытового использования.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Каталог продукции</Button>
              <Button variant="outline" size="lg">
                Связаться с нами
              </Button>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3]">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Дезинфицирующие средства ProfDez"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
