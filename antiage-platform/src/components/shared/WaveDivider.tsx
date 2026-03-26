interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  variant?: 1 | 2 | 3 | 4;
  className?: string;
}

const wavePaths = {
  1: "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z",
  2: "M0,50 C180,20 360,70 540,40 C720,10 900,60 1080,35 C1260,10 1380,50 1440,30 L1440,80 L0,80 Z",
  3: "M0,30 C320,70 640,10 960,50 C1120,65 1280,20 1440,45 L1440,80 L0,80 Z",
  4: "M0,45 C200,15 400,65 600,35 C800,5 1000,55 1200,25 C1350,10 1400,40 1440,35 L1440,80 L0,80 Z",
};

export function WaveDivider({
  fromColor,
  toColor,
  variant = 1,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`relative w-full leading-[0] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Верхняя часть — цвет предыдущей секции */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: fromColor }}
      />
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] sm:h-[70px] md:h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Фон SVG = цвет предыдущей секции */}
        <rect width="1440" height="80" fill={fromColor} />
        {/* Волна заполнена цветом следующей секции */}
        <path d={wavePaths[variant]} fill={toColor} />
      </svg>
    </div>
  );
}
