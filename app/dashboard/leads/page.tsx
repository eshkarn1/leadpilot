import LeadTable, { type LeadRow } from "@/components/LeadTable";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function fetchLeads(statusFilter: string | undefined) {
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
      <LeadTable leads={leads} selectedStatus={selectedStatus} />
    </section>
  );
}
