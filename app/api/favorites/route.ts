import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from("favorites")
      .select("id, meal_id, saved_at")
      .order("saved_at", { ascending: false });

    if (error) {
      console.error("list favorites failed:", error);
      return NextResponse.json({ error: "No se pudieron cargar los favoritos." }, { status: 500 });
    }
    return NextResponse.json({ favorites: data });
  } catch (e) {
    console.error("list favorites failed:", e);
    return NextResponse.json({ error: "No se pudieron cargar los favoritos." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { mealId } = await req.json();
    if (!mealId) return NextResponse.json({ error: "Falta el id de la receta." }, { status: 400 });

    const { data, error } = await getSupabase()
      .from("favorites")
      .upsert({ meal_id: mealId }, { onConflict: "meal_id" })
      .select("id, meal_id, saved_at")
      .single();

    if (error) {
      console.error("save favorite failed:", error);
      return NextResponse.json({ error: "No se pudo guardar el favorito." }, { status: 500 });
    }
    return NextResponse.json({ ok: true, favorite: data });
  } catch (e) {
    console.error("save favorite failed:", e);
    return NextResponse.json({ error: "No se pudo guardar el favorito." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const mealId = req.nextUrl.searchParams.get("mealId");
  if (!mealId) return NextResponse.json({ error: "Falta el id de la receta." }, { status: 400 });

  try {
    const { error } = await getSupabase().from("favorites").delete().eq("meal_id", mealId);
    if (error) {
      console.error("delete favorite failed:", error);
      return NextResponse.json({ error: "No se pudo quitar el favorito." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("delete favorite failed:", e);
    return NextResponse.json({ error: "No se pudo quitar el favorito." }, { status: 500 });
  }
}
