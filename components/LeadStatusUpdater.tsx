"use client";

import { useState } from "react";

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

export default function LeadStatusUpdater({
  leadId,
  currentStatus
}: {
  leadId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        const payload = await response.json();
        setError(payload.error ?? "Unable to update status.");
      }
    } catch (err) {
      setError("Unable to update status.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">
        Status
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          {STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
      >
        {isSaving ? "Saving..." : "Update status"}
      </button>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
