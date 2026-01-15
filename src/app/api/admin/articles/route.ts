import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// GET all articles
export async function GET() {
  const supabaseServer = await createServerSupabaseClient();
  const { data, error } = await supabaseServer.from("articles").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST new article
export async function POST(req: NextRequest) {
  const supabaseServer = await createServerSupabaseClient();
  const body = await req.json();
  const { title, content, published } = body;
  const { data, error } = await supabaseServer.from("articles").insert([{ title, content, published }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT and DELETE for /articles/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const supabaseServer = await createServerSupabaseClient();
  const body = await req.json();
  const { title, content, published } = body;
  const { data, error } = await supabaseServer
    .from("articles")
    .update({ title, content, published })
    .eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const supabaseServer = await createServerSupabaseClient();
  const { data, error } = await supabaseServer.from("articles").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
