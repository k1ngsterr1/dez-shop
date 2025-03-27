import { Card, CardContent } from "@/components/ui/card";

interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function ValueCard({
  icon: Icon,
  title,
  description,
}: ValueCardProps) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
