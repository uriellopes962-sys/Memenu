import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { verifyPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Falta usuario o contraseña." }, { status: 400 });
    }

    await ensureSchema();

    const result = await sql`SELECT id, username, password_hash FROM users WHERE username = ${username}`;
    const user = result.rows[0];
    if (!user) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos." }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos." }, { status: 401 });
    }

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
    console.error("login failed:", e);
    return NextResponse.json({ error: "No se pudo iniciar sesión. Intenta de nuevo." }, { status: 500 });
  }
}
