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
              <a href="tel:+77272486337" className="hover:text-primary">
                +7(727) 248-63-37
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              <a href="tel:+77272480201" className="hover:text-primary">
                +7(727) 248-02-01
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              <a href="tel:+77017778899" className="hover:text-primary">
                +7(701) 777-88-99
              </a>
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
              <a href="mailto:sales@profdez.kz" className="hover:text-primary">
                sales@profdez.kz
              </a>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-primary" />
              <a
                href="mailto:support@profdez.kz"
                className="hover:text-primary"
              >
                support@profdez.kz
              </a>
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
              <p>г. Алматы, ул. Примерная, 123</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Бизнес-центр Название, 4 этаж, офис 405
              </p>
            </div>
          </div>
        </ContactCard>

        <ContactCard icon={Building} title="Реквизиты">
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-medium">ТОО ProfDez Kazakhstan</span>
            </li>
            <li>БИН: 123456789012</li>
            <li>ИИК: KZ123456789012345678</li>
            <li>БИК: ABCDEFGH</li>
            <li>Банк: АО Название Банка</li>
          </ul>
        </ContactCard>

        <ContactCard icon={Users} title="Отделы">
          <ul className="space-y-3">
            <li className="flex flex-col">
              <span className="font-medium">Отдел продаж:</span>
              <a href="tel:+77272486337" className="hover:text-primary">
                +7(727) 248-63-37
              </a>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">Бухгалтерия:</span>
              <a href="tel:+77272480201" className="hover:text-primary">
                +7(727) 248-02-01
              </a>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">Техническая поддержка:</span>
              <a href="tel:+77017778899" className="hover:text-primary">
                +7(701) 777-88-99
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
        <div>
          <h2 className="mb-6 text-2xl font-bold">Мы на карте</h2>
          <div className="overflow-hidden rounded-lg border">
            <div className="aspect-square w-full lg:aspect-auto lg:h-full">
              {/* Placeholder for map - in a real implementation, this would be replaced with an actual map component */}
              <div className="flex h-full w-full items-center justify-center bg-muted/50 p-8 text-center">
                <div>
                  <MapPin className="mx-auto mb-4 h-12 w-12 text-primary/50" />
                  <p className="text-lg font-medium">Карта местоположения</p>
                  <p className="text-sm text-muted-foreground">
                    Здесь будет отображаться интерактивная карта с
                    местоположением офиса компании
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
