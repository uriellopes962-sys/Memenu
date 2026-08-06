"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { findMealById, CATS, estimatedTime, recipeDescription, iconForIngredient } from "@/lib/mealData";
import MacroStat from "@/app/components/MacroStat";
import IconCircle from "@/app/components/IconCircle";
import SegmentedTabs from "@/app/components/SegmentedTabs";
import { usePlan } from "@/app/context/PlanContext";

type Tab = "ingredientes" | "instrucciones";

export default function RecetaPage() {
  const params = useParams<{ id: string }>();
  const found = findMealById(params.id);
  const { favorites, isFavorite, toggleFavorite, loadFavorites } = usePlan();

  const [tab, setTab] = useState<Tab>("ingredientes");
  // Por ingrediente: null = original, o el nombre de la alternativa elegida.
  const [selections, setSelections] = useState<Record<string, string | null>>({});

  useEffect(() => {
    if (favorites === null) loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <button
            className={"icon-btn" + (isFavorite(meal.id) ? " favorited" : "")}
            title={isFavorite(meal.id) ? "Quitar de favoritos" : "Guardar receta"}
            onClick={() => toggleFavorite(meal.id)}
          >
            {isFavorite(meal.id) ? "❤️" : "🤍"}
          </button>
          <Link className="icon-btn" title="Volver" href="/">←</Link>
        </div>
      </div>

      <div className="recipe-card">
        <div className="recipe-title-row">
          <div className="recipe-title">{meal.name}</div>
          <div className="recipe-time">🕐 {estimatedTime(category)}</div>
        </div>
        <p className="recipe-desc">{recipeDescription(meal, category, catInfo.label)}</p>

        <div className="stat-grid-2x2">
          <MacroStat icon="🌾" bg="var(--chip-orange)" value={`${meal.c}g`} label="Carbohidratos" />
          <MacroStat icon="🥩" bg="var(--chip-pink)" value={`${meal.p}g`} label="Proteína" />
          <MacroStat icon="🔥" bg="var(--chip-blue)" value={`${currentTotal} Kcal`} label={delta !== 0 ? `${delta > 0 ? "+" : ""}${delta} vs. original` : "Calorías"} />
          <MacroStat icon="🥑" bg="var(--chip-teal)" value={`${meal.g}g`} label="Grasas" />
        </div>

        <SegmentedTabs
          options={[
            { value: "ingredientes", label: "Ingredientes" },
            { value: "instrucciones", label: "Instrucciones" }
          ]}
          value={tab}
          onChange={(v) => setTab(v as Tab)}
        />

        {tab === "ingredientes" ? (
          <div className="ingredients-panel">
            <div className="ingredients-header">
              <div>
                <div className="section-title" style={{ margin: 0 }}>Ingredientes</div>
                <div className="ingredients-count">{meal.ingredients.length} items</div>
              </div>
              <Link href="/compra" className="link-btn">Ir a lista de compra</Link>
            </div>

            <div className="ingredients-list">
              {meal.ingredients.map((ing) => {
                const chosen = selections[ing.name];
                const alt = ing.alternatives?.find((a) => a.name === chosen);
                const displayKcal = ing.kcal + (alt?.kcalDelta ?? 0);
                return (
                  <div key={ing.name} className="ingredient-card">
                    <div className="ingredient-row">
                      <IconCircle icon={iconForIngredient(ing.name)} bg="var(--green-tint)" size="md" />
                      <div className="ingredient-text">
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
          </div>
        ) : (
          <ol className="instructions-list">
            {meal.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
      </div>

      <Link href="/" className="link-btn-week" style={{ textAlign: "center" }}>← Volver al plan del día</Link>
    </div>
  );
}
