"use server";

import { z } from "zod";

const QuizSubmitSchema = z.object({
  email: z.string().email("Некорректный email"),
  answers: z.record(z.string(), z.string()),
  bioAge: z.number(),
  realAge: z.number(),
  delta: z.number(),
  pillarPriority: z.enum(["biochemistry", "biomechanics", "bioenergy"]),
  recommendations: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      pillar: z.enum(["biochemistry", "biomechanics", "bioenergy"]),
    })
  ),
  riskLevel: z.enum(["green", "yellow", "orange"]),
});

export type QuizSubmitInput = z.infer<typeof QuizSubmitSchema>;

export async function submitQuiz(input: QuizSubmitInput) {
  // Валидация
  const parsed = QuizSubmitSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Некорректные данные" };
  }

  const data = parsed.data;

  try {
    // TODO: Prisma — сохранить QuizResult + EmailContact + ConsentLog
    // TODO: Resend — отправить QuizResultEmail
    // TODO: Inngest — запустить drip-серию
    // TODO: Arcjet — rate limiting

    // Заглушка на время разработки — генерируем token
    const resultToken = crypto.randomUUID();

    console.log("[submitQuiz] Saved:", {
      email: data.email,
      bioAge: data.bioAge,
      realAge: data.realAge,
      delta: data.delta,
      pillarPriority: data.pillarPriority,
      riskLevel: data.riskLevel,
      resultToken,
    });

    return {
      success: true as const,
      resultToken,
    };
  } catch (err) {
    console.error("[submitQuiz] Error:", err);
    return { success: false as const, error: "Ошибка сервера" };
  }
}
