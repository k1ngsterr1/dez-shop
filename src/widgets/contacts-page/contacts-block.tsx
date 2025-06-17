import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Building, Users } from "lucide-react";
import { ContactForm } from "./contacts-form";

interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

function ContactCard({ icon: Icon, title, children }: ContactCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-primary p-4 text-primary-foreground">
          <div className="flex items-center">
            <Icon className="mr-2 h-5 w-5" />
            <h3 className="font-medium">{title}</h3>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </CardContent>
    </Card>
  );
}

export function ContactsBlock() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Контакты
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Свяжитесь с нами любым удобным способом. Мы всегда рады помочь вам с
          выбором продукции и ответить на все вопросы.
        </p>
      </div>

      {/* Contact Information */}
      <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ContactCard icon={Phone} title="Телефоны">
          <ul className="space-y-3">
            <li className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              <a href="tel:+77000246777" className="hover:text-primary">
                +7 700 024 67 77
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              <a href="tel:+77003234707" className="hover:text-primary">
                +7 700 323 47 07
              </a>
              <span className="ml-2 text-sm text-muted-foreground">
                (отдел продаж)
              </span>
            </li>
          </ul>
        </ContactCard>

        <ContactCard icon={Mail} title="Email">
          <ul className="space-y-3">
            <li className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-primary" />
              <a href="mailto:info@profdez.kz" className="hover:text-primary">
                info@profdez.kz
              </a>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-primary" />
              <a
                href="mailto:vitaliy@vmpharm.net"
                className="hover:text-primary"
              >
                vitaliy@vmpharm.net
              </a>
              <span className="ml-2 text-sm text-muted-foreground">
                (Виталий, менеджер)
              </span>
            </li>
          </ul>
        </ContactCard>

        <ContactCard icon={Clock} title="Режим работы">
          <ul className="space-y-3">
            <li className="flex items-start">
              <Clock className="mr-2 mt-0.5 h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">Пн-Пт:</div>
                <div>9:00 - 18:00</div>
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="mr-2 mt-0.5 h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">Сб:</div>
                <div>10:00 - 15:00</div>
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="mr-2 mt-0.5 h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">Вс:</div>
                <div>Выходной</div>
              </div>
            </li>
          </ul>
        </ContactCard>

        <ContactCard icon={MapPin} title="Адрес">
          <div className="flex items-start">
            <MapPin className="mr-2 mt-0.5 h-4 w-4 text-primary" />
            <div>
              <p className="font-medium">Казахстан, г. Алматы</p>
              <p>ул. Затаевича, 49</p>
            </div>
          </div>
        </ContactCard>

        <ContactCard icon={Building} title="Реквизиты">
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-medium">ТОО «Проф Дез KZ»</span>
            </li>
            <li>БИН: 151140014055</li>
            <li>ИИК: KZ306017131000012151</li>
            <li>БИК: HSBKKZKX</li>
            <li>Банк: АО «Народный банк Казахстана»</li>
          </ul>
        </ContactCard>

        <ContactCard icon={Users} title="Отделы">
          <ul className="space-y-3">
            <li className="flex flex-col">
              <span className="font-medium">Отдел продаж:</span>
              <a href="tel:+77003234707" className="hover:text-primary">
                +7 700 323 47 07
              </a>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">Основной номер:</span>
              <a href="tel:+77000246777" className="hover:text-primary">
                +7 700 024 67 77
              </a>
            </li>
          </ul>
        </ContactCard>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Напишите нам</h2>
          <ContactForm />
        </div>
        <div className="h-full">
          <h2 className="mb-6 text-2xl font-bold">Мы на карте</h2>
          <div className="overflow-hidden h-full rounded-lg border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.3636153859513!2d76.9413!3d43.2567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836eb2439005c3%3A0x3588aa2b0a6df7e8!2z0YPQuy4g0JfQsNGC0LDQtdCy0LjRh9CwIDQ5LCDQkNC70LzQsNGC0YsgMDUwMDAw!5e0!3m2!1sru!2skz!4v1717930216123!5m2!1sru!2skz"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Местоположение ТОО «Проф Дез KZ»"
              className="aspect-square w-full lg:aspect-auto lg:h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
