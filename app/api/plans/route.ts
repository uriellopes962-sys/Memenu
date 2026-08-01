import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const { data, error } = await getSupabase()
      .from("weeks")
      .select("id, data, saved_at")
      .eq("user_id", session.userId)
      .order("saved_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("list plans failed:", error);
      return NextResponse.json({ error: "No se pudieron cargar tus semanas." }, { status: 500 });
    }
    return NextResponse.json({ weeks: data });
  } catch (e) {
    console.error("list plans failed:", e);
    return NextResponse.json({ error: "No se pudieron cargar tus semanas." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const { weekPlans } = await req.json();
    if (!weekPlans) return NextResponse.json({ error: "Falta el menú." }, { status: 400 });

    const { data, error } = await getSupabase()
      .from("weeks")
      .insert({ user_id: session.userId, data: weekPlans })
      .select("id, data, saved_at")
      .single();

    if (error) {
      console.error("save plan failed:", error);
      return NextResponse.json({ error: "No se pudo guardar." }, { status: 500 });
    }
    return NextResponse.json({ ok: true, week: data });
  } catch (e) {
    console.error("save plan failed:", e);
    return NextResponse.json({ error: "No se pudo guardar." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Falta el id." }, { status: 400 });

  try {
    const { error } = await getSupabase()
      .from("weeks")
      .delete()
      .eq("id", id)
      .eq("user_id", session.userId);

    if (error) {
      console.error("delete plan failed:", error);
      return NextResponse.json({ error: "No se pudo borrar." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("delete plan failed:", e);
    return NextResponse.json({ error: "No se pudo borrar." }, { status: 500 });
  }
}
