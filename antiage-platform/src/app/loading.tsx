export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-soft border-t-brand" />
        <p className="text-text-muted text-lg">Загрузка...</p>
      </div>
    </main>
  );
}
