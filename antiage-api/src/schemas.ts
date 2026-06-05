import { z } from "zod";

// Схемы зеркальны antiage-platform/src/actions/*.ts (эталон валидации).
// При расхождении источник истины — server actions фронта.

// submitQuiz.ts
export const QuizSubmitSchema = z.object({
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

// submitContact.ts
export const ContactSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Некорректный email"),
  message: z.string().min(10, "Сообщение слишком короткое"),
});
export type ContactInput = z.infer<typeof ContactSchema>;

// submitPartner.ts
export const PartnerSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Некорректный email"),
  telegram: z.string().optional(),
  phone: z.string().optional(),
  about: z.string().optional(),
});
export type PartnerInput = z.infer<typeof PartnerSchema>;
