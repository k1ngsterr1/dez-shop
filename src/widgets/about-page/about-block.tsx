import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Award,
  Users,
  Clock,
  Truck,
  HeartHandshake,
} from "lucide-react";
import ValueCard from "@/features/value-card/value-card";

export function AboutBlock() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          О компании ProfDez
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Ведущий поставщик профессиональных дезинфицирующих и моющих средств в
          Казахстане с 2005 года
        </p>
      </div>

      {/* Company Overview */}
      <div className="mb-16 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-primary">Наша миссия</h2>
          <p className="mb-4 text-muted-foreground">
            Компания ProfDez была основана в 2005 году с целью обеспечения
            медицинских учреждений, пищевых производств и других организаций
            Казахстана высококачественными дезинфицирующими и моющими
            средствами.
          </p>
          <p className="mb-6 text-muted-foreground">
            Мы стремимся предоставлять нашим клиентам только самые эффективные и
            безопасные решения для дезинфекции и гигиены, соответствующие
            международным стандартам качества и безопасности.
          </p>
        </div>
      </div>

      {/* Company Values */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Наши ценности</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Принципы, которыми мы руководствуемся в нашей работе каждый день
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ValueCard
            icon={Shield}
            title="Качество"
            description="Мы предлагаем только сертифицированную продукцию, соответствующую международным стандартам"
          />
          <ValueCard
            icon={Award}
            title="Надежность"
            description="Наши клиенты могут быть уверены в стабильности поставок и постоянном наличии товаров на складе"
          />
          <ValueCard
            icon={Users}
            title="Клиентоориентированность"
            description="Мы всегда готовы помочь с выбором продукции и предоставить профессиональную консультацию"
          />
          <ValueCard
            icon={Clock}
            title="Оперативность"
            description="Быстрая обработка заказов и доставка в кратчайшие сроки по всему Казахстану"
          />
          <ValueCard
            icon={Truck}
            title="Доступность"
            description="Мы предлагаем конкурентные цены и гибкие условия сотрудничества для всех клиентов"
          />
          <ValueCard
            icon={HeartHandshake}
            title="Партнерство"
            description="Мы строим долгосрочные отношения с клиентами и поставщиками, основанные на взаимном уважении"
          />
        </div>
      </div>

      {/* Company History */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">История компании</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Ключевые этапы развития ProfDez с момента основания
          </p>
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>

          {/* Timeline items */}
          <div className="relative mb-12 ml-auto w-full pl-8 md:w-1/2 md:pl-0 md:pr-8">
            <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary md:left-auto md:right-0 md:-translate-x-1/2"></div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">2005</h3>
              <p className="text-sm text-muted-foreground">
                Основание компании ProfDez. Начало сотрудничества с первыми
                производителями дезинфицирующих средств.
              </p>
            </div>
          </div>

          <div className="relative mb-12 mr-auto w-full pr-8 md:w-1/2 md:pl-8 md:pr-0">
            <div className="absolute right-0 top-0 h-4 w-4 rounded-full bg-primary md:left-0 md:right-auto md:translate-x-1/2"></div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">2010</h3>
              <p className="text-sm text-muted-foreground">
                Расширение ассортимента продукции. Открытие филиала в
                Нур-Султане.
              </p>
            </div>
          </div>

          <div className="relative mb-12 ml-auto w-full pl-8 md:w-1/2 md:pl-0 md:pr-8">
            <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary md:left-auto md:right-0 md:-translate-x-1/2"></div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">2015</h3>
              <p className="text-sm text-muted-foreground">
                Получение эксклюзивных прав на дистрибуцию ведущих европейских
                брендов в Казахстане.
              </p>
            </div>
          </div>

          <div className="relative mb-12 mr-auto w-full pr-8 md:w-1/2 md:pl-8 md:pr-0">
            <div className="absolute right-0 top-0 h-4 w-4 rounded-full bg-primary md:left-0 md:right-auto md:translate-x-1/2"></div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">2020</h3>
              <p className="text-sm text-muted-foreground">
                Запуск собственной линии производства антисептических средств.
                Расширение складских помещений.
              </p>
            </div>
          </div>

          <div className="relative ml-auto w-full pl-8 md:w-1/2 md:pl-0 md:pr-8">
            <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary md:left-auto md:right-0 md:-translate-x-1/2"></div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">Сегодня</h3>
              <p className="text-sm text-muted-foreground">
                ProfDez - ведущий поставщик дезинфицирующих и моющих средств в
                Казахстане с широкой сетью клиентов и партнеров.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
