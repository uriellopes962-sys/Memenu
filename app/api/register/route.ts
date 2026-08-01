import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
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

    const { data: existing, error: lookupError } = await getSupabase()
      .from("users")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (lookupError) {
      console.error("register lookup failed:", lookupError);
      return NextResponse.json({ error: "No se pudo crear la cuenta. Intenta de nuevo." }, { status: 500 });
    }
    if (existing) {
      return NextResponse.json({ error: "Ese nombre de usuario ya existe." }, { status: 409 });
    }

    const password_hash = await hashPassword(password);
    const { data: user, error: insertError } = await getSupabase()
      .from("users")
      .insert({ username, password_hash })
      .select("id, username")
      .single();

    if (insertError || !user) {
      console.error("register insert failed:", insertError);
      return NextResponse.json({ error: "No se pudo crear la cuenta. Intenta de nuevo." }, { status: 500 });
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
    console.error("register failed:", e);
    return NextResponse.json({ error: "No se pudo crear la cuenta. Intenta de nuevo." }, { status: 500 });
  }
}
