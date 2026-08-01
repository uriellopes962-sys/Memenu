"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/${mode === "login" ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Algo salió mal.");
        setLoading(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("No se pudo conectar. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div>
        <div className="auth-title">Plan antiinflamatorio</div>
        <div className="auth-sub">
          {mode === "login" ? "Inicia sesión para ver tus menús" : "Crea tu cuenta para guardar tus menús"}
        </div>
      </div>

      <form className="auth-card" onSubmit={submit}>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-field">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
        </div>
        <button className="btn-generate" type="submit" disabled={loading}>
          {loading ? "Un momento…" : mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>

      <div className="auth-switch">
        {mode === "login" ? (
          <>
            ¿No tienes cuenta?{" "}
            <button type="button" onClick={() => { setMode("register"); setError(""); }}>
              Regístrate
            </button>
          </>
        ) : (
          <>
            ¿Ya tienes cuenta?{" "}
            <button type="button" onClick={() => { setMode("login"); setError(""); }}>
              Inicia sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}
