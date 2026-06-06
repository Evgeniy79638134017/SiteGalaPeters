import { Info } from "lucide-react";

// Заметный блок-предупреждение о БАД для страниц программ и статей блога.
// Текст — рабочая редакция (TASK-003); финальную формулировку утверждает юрист,
// менять самовольно нельзя.
export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-xl border border-gold/50 bg-gold/10 px-5 py-4 ${className}`}
    >
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" />
      <p className="text-sm font-medium text-text">
        БАД. Не является лекарственным средством.
      </p>
    </div>
  );
}
