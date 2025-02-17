export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <div className="max-w-screen-xl mx-auto px-6">{children}</div>
    </main>
  );
}
