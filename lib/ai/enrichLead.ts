import type { LeadFormInput } from "@/lib/validators/lead";

export type LeadEnrichment = {
  ai_summary: string | null;
  ai_intent: "website" | "automation" | "branding" | "ads" | "seo" | "unknown" | null;
  ai_score: number | null;
};

export async function enrichLead(_: LeadFormInput): Promise<LeadEnrichment> {
  return {
    ai_summary: null,
    ai_intent: null,
    ai_score: null
  };
}
