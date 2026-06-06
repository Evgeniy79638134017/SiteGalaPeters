import { z } from "zod";

// Единый валидатор email для всего фронта (формы контакта/партнёра, gate квиза).
// Zod 4: z.email() — top-level API (вместо устаревшего z.string().email()).
// Сообщение зеркально схемам antiage-api ("Некорректный email").
export const emailSchema = z.email("Некорректный email");

// Удобный предикат для клиентских форм: true, если email валиден.
export function isValidEmail(value: string): boolean {
  return emailSchema.safeParse(value).success;
}
