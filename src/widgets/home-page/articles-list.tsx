import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "Программа для инфекционной заболеваемости в школах",
    excerpt:
      "В основе профилактики инфекционной заболеваемости лежат принципы специфической профилактики (иммунизации)...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Новости Компании",
    date: "15.03.2023",
  },
  {
    id: 2,
    title: "Современные средства профилактики внутрибольничных инфекций",
    excerpt:
      "Основные требования предъявляемые к дезинфектантам, используемым для проведения текущей...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Новости Компании",
    date: "10.02.2023",
  },
  {
    id: 3,
    title:
      "Принципы подбора дезинфицирующих средств для профилактики внутрибольничных инфекций",
    excerpt:
      "При планировании мероприятий необходимо учитывать большое количество факторов которые определяют уровень ВБИ в...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Новости Компании",
    date: "05.01.2023",
  },
];

export function ArticlesList() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <CardHeader className="p-4">
            <CardTitle className="line-clamp-2 text-lg">
              {article.title}
            </CardTitle>
            <CardDescription className="text-xs">
              {article.category} • {article.date}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {article.excerpt}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild variant="outline" size="sm">
              <Link href={`/articles/${article.id}`}>Читать далее</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
