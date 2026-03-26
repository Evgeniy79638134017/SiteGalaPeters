"use server";

import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Некорректный email"),
  message: z.string().min(10, "Сообщение слишком короткое"),
});

export async function submitContact(input: z.infer<typeof ContactSchema>) {
  const parsed = ContactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Некорректные данные" };
  }

  try {
    // TODO: Arcjet rate limiting
    // TODO: Prisma — сохранить ContactMessage + ConsentLog
    // TODO: Resend — AdminNotificationEmail

    console.log("[submitContact] Saved:", parsed.data);
    return { success: true as const };
  } catch (err) {
    console.error("[submitContact] Error:", err);
    return { success: false as const, error: "Ошибка сервера" };
  }
}
