import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { hashPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || username.length < 3 || password.length < 6) {
      return NextResponse.json(
        { error: "El usuario necesita al menos 3 caracteres y la contraseña al menos 6." },
        { status: 400 }
      );
    }

    await ensureSchema();

    const existing = await sql`SELECT id FROM users WHERE username = ${username}`;
    if (existing.rowCount && existing.rowCount > 0) {
      return NextResponse.json({ error: "Ese nombre de usuario ya existe." }, { status: 409 });
    }

    const hash = await hashPassword(password);
    const result = await sql`
      INSERT INTO users (username, password_hash) VALUES (${username}, ${hash})
      RETURNING id, username
    `;
    const user = result.rows[0];
    const token = await createSessionToken(user.id, user.username);

    const res = NextResponse.json({ ok: true, username: user.username });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE
    });
    return res;
  } catch (e) {
    console.error("register failed:", e);
    return NextResponse.json({ error: "No se pudo crear la cuenta. Intenta de nuevo." }, { status: 500 });
  }
}
