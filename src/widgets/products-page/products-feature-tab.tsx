import { Check, Shield, Droplets, Zap } from "lucide-react";

interface ProductFeaturesTabProps {
  features: string[];
}

export function ProductFeaturesTab({ features }: ProductFeaturesTabProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Основные преимущества</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-muted-foreground">
          ДезоПроф Ультра обеспечивает надежную защиту от широкого спектра
          патогенных микроорганизмов, включая бактерии, вирусы и грибки.
          Средство эффективно даже при низких концентрациях, что делает его
          экономичным в использовании.
        </p>
      </div>

      <div className="bg-muted/20 p-6 rounded-lg border border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Подробное описание
        </h3>

        <div className="space-y-4">
          <p>
            <strong>ДезоПроф Ультра</strong> – это профессиональное
            дезинфицирующее средство нового поколения, разработанное специально
            для медицинских учреждений, предприятий пищевой промышленности и
            бытового использования.
          </p>

          <div className="flex items-start gap-2 mt-4">
            <Droplets className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Состав и действие</h4>
              <p className="text-muted-foreground">
                В основе средства лежит комбинация четвертичных аммониевых
                соединений, которые обеспечивают быстрое и эффективное
                уничтожение широкого спектра микроорганизмов. Формула усилена
                специальными компонентами, которые предотвращают формирование
                резистентности у патогенов.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-4">
            <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Эффективность</h4>
              <p className="text-muted-foreground">
                Лабораторные и клинические испытания подтвердили высокую
                эффективность средства против бактерий (включая микобактерии
                туберкулеза), вирусов (включая оболочечные и безоболочечные
                вирусы), грибков (включая дрожжевые и плесневые) и спор.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground mt-4">
            Средство сохраняет свои свойства в широком диапазоне температур и
            жесткости воды, что делает его универсальным для использования в
            различных условиях. Срок годности составляет 3 года в закрытой
            упаковке, а рабочие растворы сохраняют активность в течение 14 дней.
          </p>
        </div>
      </div>
    </div>
  );
}
