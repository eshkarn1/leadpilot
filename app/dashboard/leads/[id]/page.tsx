import LeadStatusBadge from "@/components/LeadStatusBadge";
import LeadStatusUpdater from "@/components/LeadStatusUpdater";
import { getSupabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function fetchLead(id: string) {
  const supabaseServer = getSupabaseServer();
  if (!supabaseServer) {
    return null;
  }

  const { data, error } = await supabaseServer
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default async function LeadDetailPage({
  params
}: {
  params: { id: string };
}) {
  const lead = await fetchLead(params.id);
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!isSupabaseConfigured) {
    return (
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Lead detail
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Supabase not configured
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to view
            lead details.
          </p>
        </div>
      </section>
    );
  }

  if (!lead) {
    return (
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Lead detail
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Lead not found
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Lead detail
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            {lead.name}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{lead.email}</p>
        </div>
        <LeadStatusBadge status={lead.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Lead details</h2>
            <dl className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase text-slate-400">Phone</dt>
                <dd className="mt-1 font-medium">{lead.phone ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-400">Company</dt>
                <dd className="mt-1 font-medium">{lead.company ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-400">
                  Service Needed
                </dt>
                <dd className="mt-1 font-medium">{lead.service_needed}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-400">Submitted</dt>
                <dd className="mt-1 font-medium">
                  {new Date(lead.created_at).toLocaleString()}
                </dd>
              </div>
            </dl>
            <div className="mt-4">
              <dt className="text-xs uppercase text-slate-400">Message</dt>
              <dd className="mt-2 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
                {lead.message ?? "No message provided."}
              </dd>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">AI enrichment</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div>
                <p className="text-xs uppercase text-slate-400">Summary</p>
                <p className="mt-1 whitespace-pre-line font-medium">
                  {lead.ai_summary ?? "Pending enrichment."}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">Intent</p>
                <p className="mt-1 font-medium">{lead.ai_intent ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">Score</p>
                <p className="mt-1 font-medium">{lead.ai_score ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Update status</h2>
          <p className="mt-2 text-sm text-slate-600">
            Move the lead through your pipeline stages.
          </p>
          <div className="mt-4">
            <LeadStatusUpdater leadId={lead.id} currentStatus={lead.status} />
          </div>
        </aside>
      </div>
    </section>
  );
}
