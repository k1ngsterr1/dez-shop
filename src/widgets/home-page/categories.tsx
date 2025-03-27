import Link from "next/link";
import {
  Droplets,
  Sparkles,
  SprayCanIcon as Spray,
  Home,
  Bug,
  Rat,
  Timer,
  Shield,
} from "lucide-react";

const categories = [
  {
    name: "Дезинфицирующие средства",
    href: "/category/disinfectants",
    icon: Droplets,
  },
  {
    name: "Моющие средства",
    href: "/category/cleaning",
    icon: Sparkles,
  },
  {
    name: "Антисептические средства",
    href: "/category/antiseptics",
    icon: Spray,
  },
  {
    name: "Средства для дезинфекции дома",
    href: "/category/home",
    icon: Home,
  },
  {
    name: "Инсектицидные средства",
    href: "/category/insecticides",
    icon: Bug,
  },
  {
    name: "Родентицидные средства",
    href: "/category/rodenticides",
    icon: Rat,
  },
  {
    name: "Дозирующие устройства",
    href: "/category/dosing",
    icon: Timer,
  },
  {
    name: "Средства защиты",
    href: "/category/protection",
    icon: Shield,
  },
];

export function Categories() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-primary">Категории</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              href={category.href}
              className="flex items-center rounded-md p-2 text-sm transition-colors hover:bg-muted"
            >
              <category.icon className="mr-2 h-4 w-4 text-primary" />
              <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
