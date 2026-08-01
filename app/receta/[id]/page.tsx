"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { findMealById, CATS } from "@/lib/mealData";

export default function RecetaPage() {
  const params = useParams<{ id: string }>();
  const found = findMealById(params.id);

  // Por ingrediente: null = original, o el nombre de la alternativa elegida.
  const [selections, setSelections] = useState<Record<string, string | null>>({});

  const currentTotal = useMemo(() => {
    if (!found) return 0;
    return found.meal.ingredients.reduce((sum, ing) => {
      const chosen = selections[ing.name];
      if (!chosen) return sum + ing.kcal;
      const alt = ing.alternatives?.find((a) => a.name === chosen);
      return sum + ing.kcal + (alt?.kcalDelta ?? 0);
    }, 0);
  }, [found, selections]);

  if (!found) {
    return (
      <div className="app">
        <div className="topbar">
          <div className="greet-name">Receta no encontrada</div>
          <div className="icon-btn-row">
            <Link className="icon-btn" href="/">←</Link>
          </div>
        </div>
        <div className="panel-sheet">
          <p className="empty">Esta receta ya no está disponible. Vuelve al plan del día.</p>
        </div>
      </div>
    );
  }

  const { meal, category } = found;
  const catInfo = CATS.find((c) => c.key === category)!;
  const delta = currentTotal - meal.kcal;

  return (
    <div className="app">
      <div className="topbar">
        <div>
          <div className="greet-sub">{catInfo.label}</div>
          <div className="greet-name">{meal.name}</div>
        </div>
        <div className="icon-btn-row">
          <Link className="icon-btn" title="Volver" href="/">←</Link>
        </div>
      </div>

      <div className="stat-hero">
        <div className="stat-hero-label">Calorías de la receta</div>
        <div className="stat-hero-row">
          <div className="stat-hero-kcal">
            {currentTotal}<span className="unit">Kcal</span>
          </div>
          {delta !== 0 && (
            <div className="stat-hero-target">
              {delta > 0 ? "+" : ""}{delta} kcal vs. original ({meal.kcal})
            </div>
          )}
        </div>
        <div className="meal-tags">
          {meal.tags.map((t) => <span className="meal-tag" key={t}>{t}</span>)}
        </div>
      </div>

      <div className="section-title">Ingredientes</div>
      <div className="panel-sheet" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {meal.ingredients.map((ing) => {
          const chosen = selections[ing.name];
          const alt = ing.alternatives?.find((a) => a.name === chosen);
          const displayKcal = ing.kcal + (alt?.kcalDelta ?? 0);
          return (
            <div key={ing.name} className="ingredient-block">
              <div className="ingredient-row">
                <div>
                  <div className="ingredient-name">{ing.name}</div>
                  <div className="ingredient-amount">{chosen ? alt?.name : ing.amount}</div>
                </div>
                <div className="ingredient-kcal">{displayKcal} kcal</div>
              </div>
              {ing.alternatives && ing.alternatives.length > 0 && (
                <div className="alt-row">
                  <button
                    className={"alt-chip" + (!chosen ? " selected" : "")}
                    onClick={() => setSelections((prev) => ({ ...prev, [ing.name]: null }))}
                  >
                    Original
                  </button>
                  {ing.alternatives.map((a) => (
                    <button
                      key={a.name}
                      className={"alt-chip" + (chosen === a.name ? " selected" : "")}
                      onClick={() => setSelections((prev) => ({ ...prev, [ing.name]: a.name }))}
                    >
                      {a.name} ({a.kcalDelta > 0 ? "+" : ""}{a.kcalDelta})
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="section-title">Instrucciones</div>
      <div className="panel-sheet">
        <ol className="instructions-list">
          {meal.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <Link href="/" className="link-btn-week" style={{ textAlign: "center" }}>← Volver al plan del día</Link>
    </div>
  );
}
