"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlan } from "@/app/context/PlanContext";
import { CATS, DAY_LETTERS, DAY_NAMES, TARGET_MAX, TARGET_MIN, totalKcal, totalMacro } from "@/lib/mealData";
import MacroStat from "@/app/components/MacroStat";
import IconCircle from "@/app/components/IconCircle";

export default function HomePage() {
  const router = useRouter();
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
            <div
              className="meal-row"
              key={cat.key}
              onClick={() => router.push(`/receta/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <IconCircle icon={cat.icon} bg={`var(--${cat.chip})`} size="lg" />
              <div className="meal-body">
                <div className="meal-cat">{cat.label}</div>
                <div className="meal-name">{item.name}</div>
                <div className="meal-kcal">{item.kcal} kcal · P{item.p} C{item.c} G{item.g}</div>
                <div className="meal-tags">
                  {item.tags.map((t) => <span className="meal-tag" key={t}>{t}</span>)}
                </div>
                <div className="meal-ing-toggle">Ver receta completa →</div>
              </div>
              <button
                className="meal-swap"
                title="Cambiar"
                onClick={(e) => {
                  e.stopPropagation();
                  swapMeal(cat.key);
                }}
              >
                ↻
              </button>
            </div>
          );
        })}
      </div>

      {menu && (
        <div className="macro-row-cards">
          <MacroStat icon="🥩" bg="var(--chip-pink)" value={`${totalMacro(menu, "p")}g`} label="Proteína" />
          <MacroStat icon="🌾" bg="var(--chip-orange)" value={`${totalMacro(menu, "c")}g`} label="Carbohidratos" />
          <MacroStat icon="🥑" bg="var(--chip-teal)" value={`${totalMacro(menu, "g")}g`} label="Grasas" />
        </div>
      )}

      <button className="btn-generate" onClick={generateSelectedDay}>↻ Generar este día</button>

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
