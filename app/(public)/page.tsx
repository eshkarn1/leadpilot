import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <div className="text-lg font-semibold text-slate-900">LeadPilot</div>
        <nav className="text-sm font-medium text-slate-600">
          <Link href="/dashboard/leads" className="hover:text-brand-blue">
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 lg:grid-cols-[1.1fr,0.9fr]">
        <section className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            AI lead generation
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Capture, qualify, and follow up with high-intent leads in one
            workspace.
          </h1>
          <p className="text-lg text-slate-600">
            LeadPilot helps agencies and SaaS teams centralize inbound requests,
            add instant AI insights, and move prospects to a close faster.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Capture every inquiry",
              "Auto-score lead intent",
              "Stay on top of follow-ups",
              "Keep your pipeline visible"
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900">
            <p className="font-semibold">Trusted by growth-minded teams</p>
            <p className="mt-2 text-blue-700">
              Join the waitlist to get early access and onboarding support.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Book a demo
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Tell us about your next project
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We respond within one business day with recommended next steps.
            </p>
          </div>
          <LeadForm />
        </section>
      </main>
    </div>
  );
}
