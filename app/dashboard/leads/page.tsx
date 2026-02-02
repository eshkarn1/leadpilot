import LeadTable, { type LeadRow } from "@/components/LeadTable";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function fetchLeads(statusFilter: string | undefined) {
  if (!supabaseServer) {
    return [];
  }

  let query = supabaseServer
    .from("leads")
    .select(
      "id, created_at, name, email, phone, service_needed, status, ai_score"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (statusFilter && statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data as LeadRow[];
}

export default async function LeadsPage({
  searchParams
}: {
  searchParams: { status?: string };
}) {
  const selectedStatus = searchParams.status ?? "all";
  const leads = await fetchLeads(selectedStatus);
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Leads
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          Lead pipeline
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Track every inbound request, update status, and follow up fast.
        </p>
      </div>
      {!isSupabaseConfigured ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to load
          leads.
        </div>
      ) : null}
      <LeadTable leads={leads} selectedStatus={selectedStatus} />
    </section>
  );
}
