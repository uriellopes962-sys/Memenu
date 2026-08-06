"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePlan } from "@/app/context/PlanContext";
import { useRouter } from "next/navigation";
import { findMealById } from "@/lib/mealData";
import IconCircle from "@/app/components/IconCircle";

export default function GuardadosPage() {
  const router = useRouter();
  const {
    savedWeeks,
    savedLoading,
    savedError,
    savingNow,
    loadSavedList,
    saveWeek,
    loadWeek,
    deleteWeek,
    favorites,
    favoritesLoading,
    loadFavorites,
    removeFavorite,
    toast
  } = usePlan();

  useEffect(() => {
    loadSavedList();
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLoad(w: Parameters<typeof loadWeek>[0]) {
    loadWeek(w);
    router.push("/");
  }

  return (
    <div className="app">
      <div className="topbar">
        <div>
          <div className="greet-sub">Guardados</div>
          <div className="greet-name">Menús y recetas</div>
        </div>
        <div className="icon-btn-row">
          <Link className="icon-btn" title="Volver" href="/">←</Link>
        </div>
      </div>

      <div className="section-title">Recetas favoritas</div>
      <div className="panel-sheet">
        {favoritesLoading && <p className="empty">Cargando…</p>}
        {!favoritesLoading && favorites && favorites.length === 0 && (
          <p className="empty">Todavía no has guardado ninguna receta. Toca el corazón dentro de una receta para guardarla aquí.</p>
        )}
        {!favoritesLoading && favorites && favorites.map((fav) => {
          const found = findMealById(fav.meal_id);
          if (!found) return null;
          return (
            <div className="saved-item" key={fav.id}>
              <Link href={`/receta/${fav.meal_id}`} style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                <IconCircle icon="🍽️" bg="var(--green-tint)" size="sm" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {found.meal.name}
                  </div>
                  <div className="saved-meta">{found.meal.kcal} kcal</div>
                </div>
              </Link>
              <div className="saved-actions">
                <button className="link-btn danger" onClick={() => removeFavorite(fav.meal_id)}>Quitar</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-title">Semanas guardadas</div>
      <div className="panel-sheet">
        <button className="btn-save-week" onClick={saveWeek} disabled={savingNow}>
          {savingNow ? "Guardando…" : "Guardar la semana actual"}
        </button>

        {savedLoading && <p className="empty">Cargando…</p>}
        {!savedLoading && savedError && <p className="empty">{savedError}</p>}
        {!savedLoading && !savedError && savedWeeks && savedWeeks.length === 0 && (
          <p className="empty">Todavía no has guardado ninguna semana.</p>
        )}
        {!savedLoading && !savedError && savedWeeks && savedWeeks.map((w) => {
          const generatedDays = w.data.filter((m) => m).length;
          const date = new Date(w.saved_at);
          return (
            <div className="saved-item" key={w.id}>
              <div>
                <div>{generatedDays} día{generatedDays === 1 ? "" : "s"} generado{generatedDays === 1 ? "" : "s"}</div>
                <div className="saved-meta">
                  {date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" })} ·{" "}
                  {date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <div className="saved-actions">
                <button className="link-btn" onClick={() => handleLoad(w)}>Cargar</button>
                <button className="link-btn danger" onClick={() => deleteWeek(w.id)}>Borrar</button>
              </div>
            </div>
          );
        })}
      </div>

      <Link href="/" className="link-btn-week" style={{ textAlign: "center" }}>← Volver al plan del día</Link>

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
