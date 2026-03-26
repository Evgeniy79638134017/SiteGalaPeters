/** Umami event tracking helper */
export function trackEvent(name: string, data?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof window.umami !== "undefined") {
    window.umami.track(name, data);
  }
}

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, string | number>) => void;
    };
  }
}
