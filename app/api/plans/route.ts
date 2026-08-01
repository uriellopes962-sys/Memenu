import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  await ensureSchema();
  const result = await sql`
    SELECT id, data, saved_at FROM weeks
    WHERE user_id = ${session.userId}
    ORDER BY saved_at DESC
    LIMIT 20
  `;
  return NextResponse.json({ weeks: result.rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const { weekPlans } = await req.json();
    if (!weekPlans) return NextResponse.json({ error: "Falta el menú." }, { status: 400 });

    await ensureSchema();
    const result = await sql`
      INSERT INTO weeks (user_id, data) VALUES (${session.userId}, ${JSON.stringify(weekPlans)})
      RETURNING id, data, saved_at
    `;
    return NextResponse.json({ ok: true, week: result.rows[0] });
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

  await ensureSchema();
  await sql`DELETE FROM weeks WHERE id = ${id} AND user_id = ${session.userId}`;
  return NextResponse.json({ ok: true });
}
