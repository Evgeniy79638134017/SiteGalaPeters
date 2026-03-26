"use server";

import { z } from "zod";

const PartnerSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Некорректный email"),
  telegram: z.string().optional(),
  phone: z.string().optional(),
  about: z.string().optional(),
});

export type PartnerInput = z.infer<typeof PartnerSchema>;

export async function submitPartner(input: PartnerInput) {
  const parsed = PartnerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Некорректные данные" };
  }

  try {
    // TODO: Arcjet rate limiting
    // TODO: Prisma — сохранить PartnerApplication + ConsentLog
    // TODO: Resend — PartnerApplicationEmail + AdminNotificationEmail

    console.log("[submitPartner] Saved:", parsed.data);

    return { success: true as const };
  } catch (err) {
    console.error("[submitPartner] Error:", err);
    return { success: false as const, error: "Ошибка сервера. Попробуйте позже." };
  }
}
