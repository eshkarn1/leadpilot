import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
          Submission received
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Thanks for reaching out!
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          We&apos;ll contact you soon with next steps and a tailored plan.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
