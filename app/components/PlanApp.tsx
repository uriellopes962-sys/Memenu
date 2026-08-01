"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CATS,
  DAY_LETTERS,
  DAY_NAMES,
  TARGET_MAX,
  TARGET_MIN,
  generateMenu,
  swapMealIn,
  totalKcal,
  totalMacro,
  type CategoryKey,
  type WeekMenu
} from "@/lib/mealData";

type SavedWeek = {
  id: number;
  data: (WeekMenu | null)[];
  saved_at: string;
};

function getWeekDates() {
  const today = new Date();
  const todayIdx = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - todayIdx);
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return { dates, todayIdx };
}

export default function PlanApp({ username }: { username: string }) {
  const router = useRouter();
  const { dates: weekDates, todayIdx } = useMemo(getWeekDates, []);

  const [weekPlans, setWeekPlans] = useState<(WeekMenu | null)[]>(() => {
    const initial = new Array(7).fill(null);
    initial[todayIdx] = generateMenu();
    return initial;
  });
  const [selectedDay, setSelectedDay] = useState(todayIdx);
  const [expandedIng, setExpandedIng] = useState<Record<string, boolean>>({});
  const [showShop, setShowShop] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [savedWeeks, setSavedWeeks] = useState<SavedWeek[] | null>(null);
  const [savedLoading, setSavedLoading] = useState(false);
  const [savedError, setSavedError] = useState("");
  const [savingNow, setSavingNow] = useState(false);
  const [toast, setToast] = useState("");
  const [greeting, setGreeting] = useState("Hola");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches");
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  }

  const menu = weekPlans[selectedDay];

  function generateSelectedDay() {
    setWeekPlans((prev) => {
      const next = [...prev];
      next[selectedDay] = generateMenu();
      return next;
    });
    showToast("Día generado");
  }

  function generateWeek() {
    setWeekPlans(new Array(7).fill(null).map(() => generateMenu()));
    showToast("Semana generada");
  }

  function swapMeal(catKey: CategoryKey) {
    setWeekPlans((prev) => {
      const current = prev[selectedDay];
      if (!current) return prev;
      const next = [...prev];
      next[selectedDay] = swapMealIn(current, catKey);
      return next;
    });
  }

  async function saveWeek() {
    if (!weekPlans.some((m) => m)) {
      showToast("Genera al menos un día primero");
      return;
    }
    setSavingNow(true);
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekPlans })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "No se pudo guardar");
        return;
      }
      showToast("Semana guardada en tu cuenta");
      loadSavedList();
    } catch {
      showToast("No se pudo guardar (revisa tu conexión)");
    } finally {
      setSavingNow(false);
    }
  }

  async function loadSavedList() {
    setSavedLoading(true);
    setSavedError("");
    try {
      const res = await fetch("/api/plans");
      const data = await res.json();
      if (!res.ok) {
        setSavedError(data.error || "No se pudieron cargar tus semanas.");
        setSavedWeeks([]);
        return;
      }
      setSavedWeeks(data.weeks);
    } catch {
      setSavedError("No se pudieron cargar tus semanas.");
      setSavedWeeks([]);
    } finally {
      setSavedLoading(false);
    }
  }

  function loadWeek(w: SavedWeek) {
    setWeekPlans(w.data);
    const firstIdx = w.data.findIndex((m) => m);
    setSelectedDay(firstIdx >= 0 ? firstIdx : 0);
    showToast("Semana cargada");
  }

  async function deleteWeek(id: number) {
    try {
      await fetch(`/api/plans?id=${id}`, { method: "DELETE" });
      setSavedWeeks((prev) => (prev ? prev.filter((w) => w.id !== id) : prev));
    } catch {
      showToast("No se pudo borrar");
    }
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const shoppingList = useMemo(() => {
    if (!menu) return [];
    const set = new Set<string>();
    CATS.forEach((c) => menu[c.key].ing.forEach((i) => set.add(i)));
    return [...set].sort();
  }, [menu]);

  return (
    <div className="app">
      <div className="topbar">
        <div>
          <div className="greet-sub">{greeting}, {username}</div>
          <div className="greet-name">Plan antiinflamatorio</div>
        </div>
        <div className="icon-btn-row">
          <button className="icon-btn" title="Lista de compra" onClick={() => setShowShop((v) => !v)}>🧺</button>
          <button
            className="icon-btn"
            title="Guardados"
            onClick={() => {
              const next = !showSaved;
              setShowSaved(next);
              if (next) loadSavedList();
            }}
          >
            🔖
          </button>
          <button className="icon-btn" title="Cerrar sesión" onClick={logout}>⏻</button>
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
          const ingKey = `${selectedDay}-${cat.key}`;
          const isOpen = !!expandedIng[ingKey];
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
                <div
                  className="meal-ing-toggle"
                  onClick={() => setExpandedIng((prev) => ({ ...prev, [ingKey]: !prev[ingKey] }))}
                >
                  {isOpen ? "Ocultar ingredientes" : "Ver ingredientes"}
                </div>
                {isOpen && (
                  <ul className="meal-ing">
                    {item.ing.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                )}
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

      {showShop && (
        <div className="panel-sheet">
          <h2>Lista de la compra</h2>
          {shoppingList.length === 0 ? (
            <p className="empty">Genera un día primero.</p>
          ) : (
            <ul className="shop-list">
              {shoppingList.map((i) => <li key={i}>{i}</li>)}
            </ul>
          )}
        </div>
      )}

      {showSaved && (
        <div className="panel-sheet">
          <h2>Semanas guardadas</h2>
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
                  <button className="link-btn" onClick={() => loadWeek(w)}>Cargar</button>
                  <button className="link-btn danger" onClick={() => deleteWeek(w.id)}>Borrar</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
