import { Check } from "lucide-react";

// Блок «О производителе» — перенесён из исходников программ (факты о производителе
// клеточного питания AgenYZ/АльфаДженис: сертификация, маркировка «Честный знак»).
const STATS = [
  { value: "GMP", label: "Сертификация производства" },
  { value: "ISO 22000", label: "Международный стандарт" },
  { value: "96%", label: "Биодоступность" },
  { value: "80+", label: "Стран доставки" },
  { value: "Честный знак", label: "Маркировка продукции" },
];

const FACTS = [
  "13 клинических исследований подтверждают эффективность",
  "Натуральные компоненты растительного происхождения",
  "Технологии: микрокапсулирование, липосомирование, 3D-каркасная технология, CO2 экстрагирование, пептидные ультрализаты, адъюванты",
];

export function ProducerInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <h3 className="text-xl font-bold text-text mb-3">АльфаДженис (AgenYZ)</h3>
      <p className="text-text-muted mb-6 leading-relaxed">
        Все продукты в программах производятся компанией АльфаДженис — российским
        производителем клеточного питания с 25-летним опытом команды на рынке
        нутрицевтиков, доставкой в 80+ стран и 30+ производствами по всему миру.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {STATS.map((s) => (
          <div key={s.value} className="bg-teal-bg/60 rounded-xl p-3 text-center">
            <div className="text-teal font-bold text-base md:text-lg">{s.value}</div>
            <div className="text-xs md:text-sm text-text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <ul className="space-y-2.5">
        {FACTS.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-text-muted">
            <Check className="w-5 h-5 shrink-0 mt-0.5 text-teal-mid" strokeWidth={2.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
