import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Sin cuentas de usuario: los menús guardados son compartidos por
// cualquiera que use esta app (no hay separación por persona).

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from("weeks")
      .select("id, data, saved_at")
      .order("saved_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("list plans failed:", error);
      return NextResponse.json({ error: "No se pudieron cargar los menús guardados." }, { status: 500 });
    }
    return NextResponse.json({ weeks: data });
  } catch (e) {
    console.error("list plans failed:", e);
    return NextResponse.json({ error: "No se pudieron cargar los menús guardados." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { weekPlans } = await req.json();
    if (!weekPlans) return NextResponse.json({ error: "Falta el menú." }, { status: 400 });

    const { data, error } = await getSupabase()
      .from("weeks")
      .insert({ data: weekPlans })
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
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Falta el id." }, { status: 400 });

  try {
    const { error } = await getSupabase().from("weeks").delete().eq("id", id);
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
