// Маленький fetch-хелпер для отправки форм на наш API (same-origin через Nginx-прокси).
// Пути относительные ("/api/contact" и т.п.) — браузер шлёт на тот же домен (gpeters.ru),
// Nginx проксирует /api/* на российский API-сервис. CORS не нужен.
// Контракт ответа зеркален бывшим server actions: {success, error?} (+ resultToken у квиза).

export type ApiResponse<T = Record<string, never>> =
  | ({ success: true } & T)
  | { success: false; error: string };

const GENERIC_ERROR = "Ошибка сервера. Попробуйте позже.";
const NETWORK_ERROR = "Не удалось отправить. Проверьте соединение и попробуйте снова.";

export async function postJson<T = Record<string, never>>(
  path: string,
  body: unknown
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => null)) as ApiResponse<T> | null;

    if (data && typeof data.success === "boolean") {
      return data;
    }
    // Тело не распарсилось или не в нашем формате.
    return { success: false, error: GENERIC_ERROR };
  } catch {
    return { success: false, error: NETWORK_ERROR };
  }
}
