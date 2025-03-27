import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">О компании</h3>
            <p className="text-sm text-muted-foreground">
              ProfDez предлагает профессиональные дезинфицирующие и моющие
              средства высокого качества для различных сфер применения.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/category/disinfectants"
                  className="text-muted-foreground hover:text-primary"
                >
                  Дезинфицирующие средства
                </Link>
              </li>
              <li>
                <Link
                  href="/category/cleaning"
                  className="text-muted-foreground hover:text-primary"
                >
                  Моющие средства
                </Link>
              </li>
              <li>
                <Link
                  href="/category/antiseptics"
                  className="text-muted-foreground hover:text-primary"
                >
                  Антисептические средства
                </Link>
              </li>
              <li>
                <Link
                  href="/category/home"
                  className="text-muted-foreground hover:text-primary"
                >
                  Средства для дезинфекции дома
                </Link>
              </li>
              <li>
                <Link
                  href="/category/insecticides"
                  className="text-muted-foreground hover:text-primary"
                >
                  Инсектицидные средства
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-muted-foreground hover:text-primary"
                >
                  Доставка
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="text-muted-foreground hover:text-primary"
                >
                  Оплата
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-muted-foreground hover:text-primary"
                >
                  Статьи
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary"
                >
                  Часто задаваемые вопросы
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Phone className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <div>+7(727) 248-63-37</div>
                  <div>+7(727) 248-02-01</div>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-primary" />
                <a href="mailto:info@profdez.kz" className="hover:text-primary">
                  info@profdez.kz
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                <div>г. Алматы, ул. Примерная, 123</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ProfDez.kz. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
