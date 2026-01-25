import Link from "next/link";
import LeadStatusBadge from "./LeadStatusBadge";

export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  service_needed: string;
  status: string;
  ai_score: number | null;
};

const STATUS_OPTIONS = ["all", "new", "contacted", "qualified", "won", "lost"];

export default function LeadTable({
  leads,
  selectedStatus
}: {
  leads: LeadRow[];
  selectedStatus: string;
}) {
  return (
    <div className="space-y-4">
      <form className="flex flex-wrap items-center gap-3" method="GET">
        <label className="text-sm font-medium text-slate-600">
          Status
          <select
            name="status"
            defaultValue={selectedStatus}
            className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Apply
        </button>
      </form>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">AI Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-sm text-slate-500"
                >
                  No leads yet.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    <Link
                      className="hover:text-brand-blue"
                      href={`/dashboard/leads/${lead.id}`}
                    >
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{lead.email}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {lead.phone ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {lead.service_needed}
                  </td>
                  <td className="px-4 py-3">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {lead.ai_score ?? "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
