"use client";

import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import type { HealthProgram } from "@/content/health-programs";

// Цвета палитры сайта в HEX — инлайн-стилями, чтобы html2canvas не встретил oklch()
// (Tailwind v4) и не упал при рендере. html2canvas грузится динамически (отдельный чанк).
const C = {
  teal: "#1A5C5C",
  tealSoft: "#A0DFE0",
  tealBg: "#E0F5F5",
  text: "#3D2E22",
  muted: "#7A6B5D",
  cream: "#FDF8F3",
  white: "#FFFFFF",
};

export function DownloadScheduleButton({ program }: { program: HealthProgram }) {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    if (!ref.current || busy) return;
    setBusy(true);
    try {
      // Дождаться шрифтов, чтобы текст не «съехал» на картинке
      if (document.fonts?.ready) await document.fonts.ready;
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        backgroundColor: C.cream,
        useCORS: true,
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${program.slug}-raspisanie.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Не удалось сформировать картинку расписания:", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        disabled={busy}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-teal-mid px-6 text-teal-mid font-semibold hover:bg-teal-bg transition-colors disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="w-5 h-5" aria-hidden="true" />
        )}
        {busy ? "Готовим картинку…" : "Скачать таблицу приёма"}
      </button>

      {/* Off-screen печатная вёрстка таблицы для html2canvas (полная, не схлопнутая) */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-99999px", top: 0, pointerEvents: "none" }}>
        <div
          ref={ref}
          style={{
            width: "1100px",
            background: C.cream,
            padding: "44px 48px",
            fontFamily: '"Source Sans 3", Arial, sans-serif',
            color: C.text,
          }}
        >
          <div style={{ fontSize: "32px", fontWeight: 700, color: C.teal, textAlign: "center" }}>
            {program.title}
          </div>
          <div style={{ fontSize: "19px", color: C.muted, textAlign: "center", marginTop: "6px", marginBottom: "28px" }}>
            Расписание приёма · {program.duration}
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px", lineHeight: 1.45 }}>
            <thead>
              <tr style={{ background: C.teal, color: C.white }}>
                <th style={{ padding: "14px 18px", textAlign: "left", width: "210px", fontSize: "17px" }}>Период</th>
                <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "17px" }}>Комплексы и приём</th>
              </tr>
            </thead>
            <tbody>
              {program.stages.map((stage, i) => (
                <tr key={i} style={{ background: i % 2 === 1 ? C.tealBg : C.white, verticalAlign: "top" }}>
                  <td style={{ padding: "16px 18px", borderBottom: `1px solid ${C.tealSoft}` }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: C.teal }}>{stage.month}</div>
                    <div style={{ fontSize: "14px", color: C.muted, marginTop: "2px" }}>{stage.title}</div>
                  </td>
                  <td style={{ padding: "16px 18px", borderBottom: `1px solid ${C.tealSoft}` }}>
                    {stage.supplements.map((s, j) => (
                      <div key={j} style={{ marginBottom: j === stage.supplements.length - 1 ? 0 : "7px" }}>
                        <span style={{ fontWeight: 600 }}>{s.name}</span>
                        {s.dosage ? <span> — {s.dosage}</span> : null}
                        {s.duration ? <span style={{ color: C.muted }}> ({s.duration})</span> : null}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "24px", fontSize: "15px", color: C.muted }}>
            БАД. Не является лекарственным средством.
          </div>
          <div style={{ marginTop: "6px", fontSize: "14px", color: C.teal, fontWeight: 600 }}>gpeters.ru</div>
        </div>
      </div>
    </>
  );
}
