import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators/lead";
import { supabaseServer } from "@/lib/supabase/server";
import { enrichLead } from "@/lib/ai/enrichLead";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid lead data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data: lead, error } = await supabaseServer
    .from("leads")
    .insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      service_needed: parsed.data.serviceNeeded,
      message: parsed.data.message || null,
      source: "form",
      status: "new"
    })
    .select("id")
    .single();

  if (error || !lead) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to create lead" },
      { status: 500 }
    );
  }

  const enrichment = await enrichLead({
    name: parsed.data.name,
    company: parsed.data.company,
    service_needed: parsed.data.serviceNeeded,
    message: parsed.data.message
  });

  await supabaseServer
    .from("leads")
    .update({
      ai_summary: enrichment.ai_summary,
      ai_intent: enrichment.ai_intent,
      ai_score: enrichment.ai_score
    })
    .eq("id", lead.id);

  return NextResponse.json({ id: lead.id });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let query = supabaseServer
    .from("leads")
    .select("id, created_at, name, email, phone, service_needed, status, ai_score")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ leads: data ?? [] });
}
