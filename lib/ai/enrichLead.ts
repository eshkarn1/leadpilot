import { z } from "zod";

export type LeadEnrichmentInput = {
  name: string;
  company?: string | null;
  service_needed: string;
  message?: string | null;
};

export type LeadEnrichment = {
  ai_summary: string;
  ai_intent: "website" | "automation" | "branding" | "ads" | "seo" | "unknown";
  ai_score: number;
};

const enrichmentSchema = z.object({
  ai_summary: z.string().min(1),
  ai_intent: z.enum(["website", "automation", "branding", "ads", "seo", "unknown"]),
  ai_score: z.number().int().min(0).max(100)
});

const fallbackEnrichment: LeadEnrichment = {
  ai_summary: "No AI summary available.",
  ai_intent: "unknown",
  ai_score: 0
};

export async function enrichLead(
  input: LeadEnrichmentInput
): Promise<LeadEnrichment> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return fallbackEnrichment;
  }

  const prompt = `Summarize the lead in up to 3 short lines (no markdown).\n\nName: ${input.name}\nCompany: ${input.company ?? ""}\nService Needed: ${input.service_needed}\nMessage: ${input.message ?? ""}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that outputs strict JSON only. Respond with JSON matching: {\"ai_summary\": string, \"ai_intent\": \"website\" | \"automation\" | \"branding\" | \"ads\" | \"seo\" | \"unknown\", \"ai_score\": number}. ai_summary must be at most 3 short lines, no markdown. ai_score must be an integer 0-100. Use \"unknown\" if unsure. Do not include extra keys."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    return fallbackEnrichment;
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;

  if (!content || typeof content !== "string") {
    return fallbackEnrichment;
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(content);
  } catch (error) {
    return fallbackEnrichment;
  }

  const parsed = enrichmentSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return fallbackEnrichment;
  }

  return parsed.data;
}
