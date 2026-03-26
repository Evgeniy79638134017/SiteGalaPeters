import { quizQuestions } from "@/content/quiz-questions";

export type PillarType = "biochemistry" | "biomechanics" | "bioenergy";
export type RiskLevel = "green" | "yellow" | "orange";

export interface QuizResultData {
  bioAge: number;
  realAge: number;
  delta: number;
  pillarPriority: PillarType;
  recommendations: Recommendation[];
  riskLevel: RiskLevel;
}

export interface Recommendation {
  title: string;
  description: string;
  pillar: PillarType;
}

const REAL_AGE_MAP: Record<string, number> = {
  age_40_45: 43,
  age_45_50: 48,
  age_50_60: 55,
  age_60_plus: 63,
};

const RECOMMENDATIONS_BANK: Record<PillarType, Recommendation[]> = {
  biochemistry: [
    {
      title: "Начните с воды",
      description:
        "Выпивайте 30 мл на кг веса ежедневно. Чистая вода — основа биохимии тела.",
      pillar: "biochemistry",
    },
    {
      title: "Добавьте коллаген",
      description:
        "После 35 лет выработка коллагена снижается. Питьевой коллаген поддерживает кожу, суставы и сосуды.",
      pillar: "biochemistry",
    },
    {
      title: "Нормализуйте сон",
      description:
        "Ложитесь до 23:00. Мелатонин — главный антиоксидант, вырабатывается только в темноте.",
      pillar: "biochemistry",
    },
  ],
  biomechanics: [
    {
      title: "Начните с 10 минут утром",
      description:
        "Лёгкая гимнастика утром запускает лимфосистему и даёт энергию на весь день.",
      pillar: "biomechanics",
    },
    {
      title: "Добавьте прогулки",
      description:
        "7000-10000 шагов в день. Ходьба — самое безопасное и эффективное движение для 40+.",
      pillar: "biomechanics",
    },
    {
      title: "Работайте с позвоночником",
      description:
        "Гибкость позвоночника = молодость тела. Попробуйте упражнения на растяжку.",
      pillar: "biomechanics",
    },
  ],
  bioenergy: [
    {
      title: "Практикуйте благодарность",
      description:
        "Каждый вечер записывайте 3 вещи, за которые вы благодарны. Это меняет биохимию мозга.",
      pillar: "bioenergy",
    },
    {
      title: "Контролируйте мысли",
      description:
        "Мысли «мне уже поздно» старят. Замените на «я становлюсь лучше каждый день».",
      pillar: "bioenergy",
    },
    {
      title: "Найдите цель",
      description:
        "Люди с ясной целью живут на 7 лет дольше. Неважен возраст — важно, зачем вы просыпаетесь.",
      pillar: "bioenergy",
    },
  ],
};

export function calculateBioAge(
  answers: Record<string, string>
): QuizResultData {
  const ageAnswer = answers["age"];
  const realAge = REAL_AGE_MAP[ageAnswer] ?? 55;

  // Подсчёт баллов (вопросы 2-6, каждый 0-3 балла)
  const scoringQuestions = quizQuestions.filter(
    (q) => q.id !== "age" && q.id !== "goal"
  );
  let totalScore = 0;
  const pillarScores: Record<PillarType, number> = {
    biochemistry: 0,
    biomechanics: 0,
    bioenergy: 0,
  };

  for (const question of scoringQuestions) {
    const answerId = answers[question.id];
    const option = question.options.find((o) => o.id === answerId);
    const score = option?.score ?? 0;
    totalScore += score;

    if (question.pillar) {
      pillarScores[question.pillar] += score;
    }
  }

  // Расчёт delta на основе суммы баллов (0-15)
  let delta: number;
  if (totalScore <= 4) delta = -5;
  else if (totalScore <= 7) delta = -2;
  else if (totalScore <= 10) delta = 0;
  else if (totalScore <= 13) delta = 3;
  else delta = 7;

  const bioAge = realAge + delta;

  // Определение приоритетного "кита"
  const pillarPriority = (
    Object.entries(pillarScores) as [PillarType, number][]
  ).sort((a, b) => b[1] - a[1])[0][0];

  // Уровень риска
  let riskLevel: RiskLevel;
  if (delta < 0) riskLevel = "green";
  else if (delta <= 3) riskLevel = "yellow";
  else riskLevel = "orange";

  // Рекомендации: 1 по приоритетному киту + 1 по худшему вопросу + 1 по цели
  const recommendations: Recommendation[] = [];

  // Главная рекомендация по приоритетному киту
  recommendations.push(RECOMMENDATIONS_BANK[pillarPriority][0]);

  // Рекомендация по второму киту (если отличается)
  const secondPillar = (
    Object.entries(pillarScores) as [PillarType, number][]
  ).sort((a, b) => b[1] - a[1])[1][0];
  if (secondPillar !== pillarPriority) {
    recommendations.push(RECOMMENDATIONS_BANK[secondPillar][1]);
  } else {
    recommendations.push(RECOMMENDATIONS_BANK[pillarPriority][1]);
  }

  // Рекомендация по цели
  const goalAnswer = answers["goal"];
  if (goalAnswer === "goal_energy") {
    recommendations.push(RECOMMENDATIONS_BANK.biochemistry[2]);
  } else if (goalAnswer === "goal_beauty") {
    recommendations.push(RECOMMENDATIONS_BANK.biochemistry[1]);
  } else if (goalAnswer === "goal_health") {
    recommendations.push(RECOMMENDATIONS_BANK.biomechanics[2]);
  } else {
    recommendations.push(RECOMMENDATIONS_BANK.bioenergy[2]);
  }

  return {
    bioAge,
    realAge,
    delta,
    pillarPriority,
    recommendations,
    riskLevel,
  };
}
