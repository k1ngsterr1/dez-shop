import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const partners = [
  {
    id: 1,
    name: "KiiltoClean",
    logo: "/placeholder.svg?height=60&width=150",
  },
  {
    id: 2,
    name: "Вита-Пул",
    logo: "/placeholder.svg?height=60&width=150",
  },
  {
    id: 3,
    name: "Интерсэн Плюс",
    logo: "/placeholder.svg?height=60&width=150",
  },
  {
    id: 4,
    name: "Partner 4",
    logo: "/placeholder.svg?height=60&width=150",
  },
  {
    id: 5,
    name: "Partner 5",
    logo: "/placeholder.svg?height=60&width=150",
  },
  {
    id: 6,
    name: "Partner 6",
    logo: "/placeholder.svg?height=60&width=150",
  },
];

export function Partners() {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-center text-xl font-bold text-primary">
        Наши партнеры
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {partners.map((partner) => (
            <CarouselItem
              key={partner.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/6"
            >
              <div className="flex h-24 items-center justify-center rounded-md border p-2">
                <div className="relative h-12 w-full">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 pt-4">
          <CarouselPrevious className="relative inset-auto" />
          <CarouselNext className="relative inset-auto" />
        </div>
      </Carousel>
    </div>
  );
}
