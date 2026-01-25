import Link from "next/link";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
        <aside className="w-56 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Dashboard
          </p>
          <nav className="mt-4 space-y-2 text-sm font-medium">
            <Link
              href="/dashboard/leads"
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
            >
              Leads
            </Link>
          </nav>
        </aside>
        <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
