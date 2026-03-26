interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${centered ? "text-center" : ""} ${className}`}>
      <h2>{title}</h2>
      {subtitle && (
        <p className="text-text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
