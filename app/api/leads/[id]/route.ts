import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;

type Status = (typeof STATUSES)[number];

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabaseServer
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json({ lead: data });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const status = body.status as Status | undefined;

  if (!status || !STATUSES.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer
    .from("leads")
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", params.id)
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to update lead" },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data.id });
}
