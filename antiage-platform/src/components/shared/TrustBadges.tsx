import { TRUST_BADGES } from "@/lib/constants";

interface TrustBadgesProps {
  variant?: "horizontal" | "compact";
  className?: string;
}

export function TrustBadges({
  variant = "horizontal",
  className = "",
}: TrustBadgesProps) {
  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-teal-bg px-3 py-1 text-sm font-medium text-teal ${className}`}
      >
        <span className="font-bold">30+</span> лет опыта
      </span>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-6 md:gap-10 ${className}`}>
      {TRUST_BADGES.map((badge) => (
        <div key={badge.label} className="text-center">
          <div className="font-heading text-4xl md:text-5xl font-bold text-teal">
            {badge.value}
          </div>
          <div className="text-text-muted text-sm mt-1">{badge.label}</div>
        </div>
      ))}
    </div>
  );
}
