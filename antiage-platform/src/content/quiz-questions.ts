export interface QuizOption {
  id: string;
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  pillar?: "biochemistry" | "biomechanics" | "bioenergy";
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "age",
    question: "Ваш возраст?",
    options: [
      { id: "age_40_45", text: "40–45 лет", score: 0 },
      { id: "age_45_50", text: "45–50 лет", score: 0 },
      { id: "age_50_60", text: "50–60 лет", score: 0 },
      { id: "age_60_plus", text: "60+ лет", score: 0 },
    ],
  },
  {
    id: "energy",
    question: "Как вы себя чувствуете утром?",
    pillar: "biochemistry",
    options: [
      { id: "energy_0", text: "Просыпаюсь совершенно разбитой", score: 3 },
      { id: "energy_1", text: "Нормально, но к вечеру устаю", score: 2 },
      { id: "energy_2", text: "В целом хорошо, бывают спады", score: 1 },
      { id: "energy_3", text: "Энергии хоть отбавляй!", score: 0 },
    ],
  },
  {
    id: "sleep",
    question: "Как вы оцениваете качество своего сна?",
    pillar: "biochemistry",
    options: [
      { id: "sleep_0", text: "Мучает бессонница", score: 3 },
      { id: "sleep_1", text: "Просыпаюсь среди ночи", score: 2 },
      { id: "sleep_2", text: "Сплю, но не высыпаюсь", score: 1 },
      { id: "sleep_3", text: "Отлично сплю всю ночь", score: 0 },
    ],
  },
  {
    id: "activity",
    question: "Ваш уровень физической активности?",
    pillar: "biomechanics",
    options: [
      { id: "activity_0", text: "Практически не двигаюсь", score: 3 },
      { id: "activity_1", text: "Иногда гуляю", score: 2 },
      { id: "activity_2", text: "Занимаюсь 2–3 раза в неделю", score: 1 },
      { id: "activity_3", text: "Активна каждый день", score: 0 },
    ],
  },
  {
    id: "nutrition",
    question: "Как вы относитесь к своему питанию?",
    pillar: "bioenergy",
    options: [
      { id: "nutrition_0", text: "Ем что попало, нет системы", score: 3 },
      { id: "nutrition_1", text: "Стараюсь, но не всегда получается", score: 2 },
      { id: "nutrition_2", text: "Слежу за питанием", score: 1 },
      { id: "nutrition_3", text: "Осознанный подход + БАДы", score: 0 },
    ],
  },
  {
    id: "mood",
    question: "Как бы вы описали своё обычное настроение?",
    pillar: "bioenergy",
    options: [
      { id: "mood_0", text: "Часто раздражаюсь и устаю", score: 3 },
      { id: "mood_1", text: "Бывают перепады настроения", score: 2 },
      { id: "mood_2", text: "В целом стабильно", score: 1 },
      { id: "mood_3", text: "Позитивный настрой!", score: 0 },
    ],
  },
  {
    id: "goal",
    question: "Что для вас сейчас самое важное?",
    options: [
      { id: "goal_energy", text: "Вернуть энергию и силы", score: 0 },
      { id: "goal_beauty", text: "Улучшить внешность", score: 0 },
      { id: "goal_health", text: "Укрепить здоровье", score: 0 },
      { id: "goal_all", text: "Всё вместе!", score: 0 },
    ],
  },
];
