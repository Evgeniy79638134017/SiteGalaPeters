import express, { type Request, type Response, type NextFunction } from "express";
import { randomUUID } from "node:crypto";
import { Prisma } from ".prisma/client/default";
import { prisma } from "./db";
import { QuizSubmitSchema, ContactSchema, PartnerSchema } from "./schemas";

const PORT = Number(process.env.PORT ?? 3001);
const HOST = process.env.HOST ?? "127.0.0.1";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 дней

const app = express();
// За локальным reverse-proxy (Nginx, TASK-015) — доверяем X-Forwarded-For только от loopback.
app.set("trust proxy", "loopback");
app.use(express.json({ limit: "100kb" }));

// Метаданные запроса для ConsentLog.
function reqMeta(req: Request): { ipAddress: string | null; userAgent: string | null } {
  return {
    ipAddress: req.ip ?? null,
    userAgent: req.get("user-agent") ?? null,
  };
}

function asJson(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

// GET /healthz — liveness-проба. Доступна и как /api/healthz (через Nginx /api/).
app.get(["/healthz", "/api/healthz"], (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// POST /api/quiz — результат квиза: QuizResult + EmailContact (upsert) + ConsentLog.
app.post("/api/quiz", async (req: Request, res: Response) => {
  const parsed = QuizSubmitSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: "Некорректные данные" });
  }
  const d = parsed.data;
  const { ipAddress, userAgent } = reqMeta(req);
  try {
    const now = new Date();
    const contact = await prisma.emailContact.upsert({
      where: { email: d.email },
      update: { consentGiven: true, consentDate: now },
      create: { email: d.email, source: "QUIZ", consentGiven: true, consentDate: now },
    });
    const resultToken = randomUUID();
    await prisma.quizResult.create({
      data: {
        contactId: contact.id,
        answers: asJson(d.answers),
        realAge: d.realAge,
        bioAge: d.bioAge,
        delta: d.delta,
        pillarPriority: d.pillarPriority,
        recommendations: asJson(d.recommendations),
        riskLevel: d.riskLevel,
        resultToken,
        tokenExpiresAt: new Date(now.getTime() + TOKEN_TTL_MS),
      },
    });
    await prisma.consentLog.create({
      data: { email: d.email, action: "subscribe", source: "quiz_gate", ipAddress, userAgent },
    });
    return res.status(200).json({ success: true, resultToken });
  } catch (err) {
    console.error("[quiz]", err);
    return res.status(500).json({ success: false, error: "Ошибка сервера" });
  }
});

// POST /api/contact — обратная связь: ContactMessage + ConsentLog.
app.post("/api/contact", async (req: Request, res: Response) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: "Некорректные данные" });
  }
  const d = parsed.data;
  const { ipAddress, userAgent } = reqMeta(req);
  try {
    await prisma.contactMessage.create({
      data: { name: d.name, email: d.email, message: d.message, consentGiven: true },
    });
    await prisma.consentLog.create({
      data: { email: d.email, action: "subscribe", source: "contact_form", ipAddress, userAgent },
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[contact]", err);
    return res.status(500).json({ success: false, error: "Ошибка сервера" });
  }
});

// POST /api/partner — заявка партнёра: PartnerApplication + ConsentLog.
app.post("/api/partner", async (req: Request, res: Response) => {
  const parsed = PartnerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: "Некорректные данные" });
  }
  const d = parsed.data;
  const { ipAddress, userAgent } = reqMeta(req);
  try {
    const now = new Date();
    await prisma.partnerApplication.create({
      data: {
        name: d.name,
        email: d.email,
        telegram: d.telegram,
        phone: d.phone,
        about: d.about,
        source: "direct",
        consentGiven: true,
        consentDate: now,
      },
    });
    await prisma.consentLog.create({
      data: { email: d.email, action: "subscribe", source: "partner_form", ipAddress, userAgent },
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[partner]", err);
    return res.status(500).json({ success: false, error: "Ошибка сервера" });
  }
});

// Некорректный JSON / превышение лимита тела → 400 (без stack trace наружу).
app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err && typeof err === "object" && "type" in err) {
    console.error("[body]", err);
    return res.status(400).json({ success: false, error: "Некорректный запрос" });
  }
  return next(err);
});

// 404.
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "Не найдено" });
});

app.listen(PORT, HOST, () => {
  console.log(`antiage-api listening on http://${HOST}:${PORT}`);
});
