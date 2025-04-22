interface ProductSpecificationsTabProps {
  specifications: Array<{ name: string; value: string }>;
}

export function ProductSpecificationsTab({
  specifications,
}: ProductSpecificationsTabProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Технические характеристики
        </h3>
        <div className="space-y-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 py-2 border-b border-border last:border-0"
            >
              <span className="text-muted-foreground">{spec.name}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
