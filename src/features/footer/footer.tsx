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
      <div className="container w-full mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold">О компании</h3>
            <p className="text-sm text-muted-foreground">
              ProfDez предлагает профессиональные дезинфицирующие и моющие
              средства высокого качества для различных сфер применения.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link
                href="https://www.facebook.com/prof.dez.2025/"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/profdez.kz/"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <span className="mb-4 text-lg font-bold">Информация</span>
            <ul className="space-y-2 !mt-2 text-sm">
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
                  href="/contacts"
                  className="text-muted-foreground hover:text-primary"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <span className="mb-4 text-lg font-bold">Контакты</span>
            <ul className="space-y-3 !mt-2 text-sm">
              <li className="flex items-start">
                <Phone className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <a
                    href="tel:+77000246777"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    +7(700) 024-67-77
                  </a>
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
                <div>
                  <a
                    href="https://yandex.kz/maps/162/almaty/?ll=76.934417%2C43.252427&z=16&mode=search&text=%D0%B6%D0%B0%D0%BC%D0%B1%D1%8B%D0%BB%D0%B0%20114%20%D0%B0%D0%BB%D0%BC%D0%B0%D1%82%D1%8B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-primary"
                  >
                    г. Алматы, ул. Жамбыла, 114, офис 1
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6  text-center text-sm text-muted-foreground">
          <span className="mb-4">
            Разработано в{" "}
            <a
              href="https://sparkstudio.kz/"
              target="_blank"
              className="text-primary"
            >
              Spark Studio
            </a>
          </span>
          <p className="mt-4">
            © {new Date().getFullYear()} ProfDez.kz. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
