"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CATS,
  generateMenu,
  swapMealIn,
  categorizeIngredient,
  iconForIngredient,
  type CategoryKey,
  type WeekMenu
} from "@/lib/mealData";

export type ShoppingItem = {
  name: string;
  amount: string;
  category: string;
  icon: string;
};

export type SavedWeek = {
  id: number;
  data: (WeekMenu | null)[];
  saved_at: string;
};

export type Favorite = {
  id: number;
  meal_id: string;
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

type PlanContextValue = {
  weekDates: Date[];
  weekPlans: (WeekMenu | null)[];
  selectedDay: number;
  setSelectedDay: (i: number) => void;
  menu: WeekMenu | null;
  generateSelectedDay: () => void;
  generateWeek: () => void;
  swapMeal: (catKey: CategoryKey) => void;
  shoppingList: ShoppingItem[];
  savedWeeks: SavedWeek[] | null;
  savedLoading: boolean;
  savedError: string;
  savingNow: boolean;
  loadSavedList: () => void;
  saveWeek: () => void;
  loadWeek: (w: SavedWeek) => void;
  deleteWeek: (id: number) => void;
  favorites: Favorite[] | null;
  favoritesLoading: boolean;
  loadFavorites: () => void;
  isFavorite: (mealId: string) => boolean;
  toggleFavorite: (mealId: string) => void;
  removeFavorite: (mealId: string) => void;
  toast: string;
  showToast: (msg: string) => void;
  greeting: string;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const { dates: weekDates, todayIdx } = useMemo(getWeekDates, []);

  const [weekPlans, setWeekPlans] = useState<(WeekMenu | null)[]>(() => {
    const initial = new Array(7).fill(null);
    initial[todayIdx] = generateMenu();
    return initial;
  });
  const [selectedDay, setSelectedDay] = useState(todayIdx);
  const [savedWeeks, setSavedWeeks] = useState<SavedWeek[] | null>(null);
  const [savedLoading, setSavedLoading] = useState(false);
  const [savedError, setSavedError] = useState("");
  const [savingNow, setSavingNow] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[] | null>(null);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
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
      showToast("Semana guardada");
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
        setSavedError(data.error || "No se pudieron cargar los menús guardados.");
        setSavedWeeks([]);
        return;
      }
      setSavedWeeks(data.weeks);
    } catch {
      setSavedError("No se pudieron cargar los menús guardados.");
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

  async function loadFavorites() {
    setFavoritesLoading(true);
    try {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      if (!res.ok) {
        setFavorites([]);
        return;
      }
      setFavorites(data.favorites);
    } catch {
      setFavorites([]);
    } finally {
      setFavoritesLoading(false);
    }
  }

  function isFavorite(mealId: string) {
    return !!favorites?.some((f) => f.meal_id === mealId);
  }

  async function toggleFavorite(mealId: string) {
    const already = isFavorite(mealId);
    if (already) {
      await removeFavorite(mealId);
      return;
    }
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealId })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "No se pudo guardar la receta");
        return;
      }
      setFavorites((prev) => [data.favorite, ...(prev ?? [])]);
      showToast("Receta guardada en favoritos");
    } catch {
      showToast("No se pudo guardar la receta");
    }
  }

  async function removeFavorite(mealId: string) {
    try {
      await fetch(`/api/favorites?mealId=${encodeURIComponent(mealId)}`, { method: "DELETE" });
      setFavorites((prev) => (prev ? prev.filter((f) => f.meal_id !== mealId) : prev));
      showToast("Receta quitada de favoritos");
    } catch {
      showToast("No se pudo quitar de favoritos");
    }
  }

  const shoppingList = useMemo<ShoppingItem[]>(() => {    if (!menu) return [];
    const map = new Map<string, ShoppingItem>();
    CATS.forEach((c) =>
      menu[c.key].ingredients.forEach((i) => {
        if (map.has(i.name)) return;
        map.set(i.name, {
          name: i.name,
          amount: i.amount,
          category: categorizeIngredient(i.name),
          icon: iconForIngredient(i.name)
        });
      })
    );
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [menu]);

  const value: PlanContextValue = {
    weekDates,
    weekPlans,
    selectedDay,
    setSelectedDay,
    menu,
    generateSelectedDay,
    generateWeek,
    swapMeal,
    shoppingList,
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
    isFavorite,
    toggleFavorite,
    removeFavorite,
    toast,
    showToast,
    greeting
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan debe usarse dentro de <PlanProvider>");
  return ctx;
}
