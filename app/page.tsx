"use client";

import Link from "next/link";
import { usePlan } from "@/app/context/PlanContext";
import { CATS, DAY_LETTERS, DAY_NAMES, TARGET_MAX, TARGET_MIN, totalKcal, totalMacro } from "@/lib/mealData";

export default function HomePage() {
  const {
    weekDates,
    weekPlans,
    selectedDay,
    setSelectedDay,
    menu,
    generateSelectedDay,
    generateWeek,
    swapMeal,
    toast,
    greeting
  } = usePlan();

  return (
    <div className="app">
      <div className="topbar">
        <div>
          <div className="greet-sub">{greeting}</div>
          <div className="greet-name">Plan antiinflamatorio</div>
        </div>
        <div className="icon-btn-row">
          <Link className="icon-btn" title="Lista de compra" href="/compra">🧺</Link>
          <Link className="icon-btn" title="Guardados" href="/guardados">🔖</Link>
        </div>
      </div>

      <div className="week-strip">
        {weekDates.map((d, i) => (
          <button
            key={i}
            className={"day-pill" + (i === selectedDay ? " selected" : "")}
            onClick={() => setSelectedDay(i)}
          >
            <div className="day-letter">{DAY_LETTERS[i]}</div>
            <div className="day-num">
              {d.getDate()}
              {weekPlans[i] && <span className="day-dot" />}
            </div>
          </button>
        ))}
      </div>
      <button className="link-btn-week" onClick={generateWeek}>Generar toda la semana</button>

      <div className="stat-hero">
        <div className="stat-hero-label">Calorías · {DAY_NAMES[selectedDay]}</div>
        <div className="stat-hero-row">
          <div className="stat-hero-kcal">{menu ? totalKcal(menu) : "—"}<span className="unit">Kcal</span></div>
          <div className="stat-hero-target">Objetivo: <b>{TARGET_MIN}–{TARGET_MAX}</b> Kcal</div>
        </div>
        <div className="bars">
          {weekPlans.map((m, i) => {
            const total = totalKcal(m);
            const pct = m ? Math.round((total / TARGET_MAX) * 100) : null;
            const heightPct = m ? Math.max(14, Math.min(100, (total / TARGET_MAX) * 100)) : 22;
            return (
              <div
                key={i}
                className={"bar-col" + (i === selectedDay ? " active" : "") + (m ? "" : " empty")}
                onClick={() => setSelectedDay(i)}
              >
                <div className="bar-pct">{pct !== null ? `${pct}%` : "–"}</div>
                <div className="bar-fill" style={{ height: `${heightPct}%` }} />
                <div className="bar-day">{DAY_LETTERS[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-title">Comidas de este día</div>
      <div className="meal-list">
        {!menu && (
          <div className="panel-sheet" style={{ textAlign: "center", padding: "30px 18px" }}>
            <p className="empty">Aún no hay menú para este día. Genera uno con el botón de abajo.</p>
          </div>
        )}
        {menu && CATS.map((cat) => {
          const item = menu[cat.key];
          return (
            <div className="meal-row" key={cat.key}>
              <div className="meal-icon" style={{ background: `var(--${cat.chip})` }}>{cat.icon}</div>
              <div className="meal-body">
                <div className="meal-cat">{cat.label}</div>
                <div className="meal-name">{item.name}</div>
                <div className="meal-kcal">{item.kcal} kcal · P{item.p} C{item.c} G{item.g}</div>
                <div className="meal-tags">
                  {item.tags.map((t) => <span className="meal-tag" key={t}>{t}</span>)}
                </div>
                <Link className="meal-ing-toggle" href={`/receta/${item.id}`}>
                  Ver receta completa →
                </Link>
              </div>
              <button className="meal-swap" title="Cambiar" onClick={() => swapMeal(cat.key)}>↻</button>
            </div>
          );
        })}
      </div>

      {menu && (
        <div className="macro-row-cards">
          <div className="macro-card">
            <div className="macro-icon" style={{ background: "var(--chip-pink)" }}>🥩</div>
            <div className="macro-val">{totalMacro(menu, "p")}g</div>
            <div className="macro-label">Proteína</div>
          </div>
          <div className="macro-card">
            <div className="macro-icon" style={{ background: "var(--chip-orange)" }}>🌾</div>
            <div className="macro-val">{totalMacro(menu, "c")}g</div>
            <div className="macro-label">Carbohidratos</div>
          </div>
          <div className="macro-card">
            <div className="macro-icon" style={{ background: "var(--chip-teal)" }}>🥑</div>
            <div className="macro-val">{totalMacro(menu, "g")}g</div>
            <div className="macro-label">Grasas</div>
          </div>
        </div>
      )}

      <button className="btn-generate" onClick={generateSelectedDay}>↻ Generar este día</button>

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
