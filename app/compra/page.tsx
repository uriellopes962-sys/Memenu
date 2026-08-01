"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/app/context/PlanContext";
import { DAY_NAMES } from "@/lib/mealData";
import IconCircle from "@/app/components/IconCircle";

const CATEGORY_ORDER = [
  "Carnes, pescado y huevo",
  "Lácteos",
  "Frutas y verduras",
  "Granos y legumbres",
  "Grasas, especias y otros",
  "Otros"
];

export default function CompraPage() {
  const { shoppingList, selectedDay, menu, toast } = usePlan();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const grouped = useMemo(() => {
    const groups: Record<string, typeof shoppingList> = {};
    shoppingList.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return CATEGORY_ORDER
      .filter((cat) => groups[cat]?.length)
      .map((cat) => ({ category: cat, items: groups[cat] }));
  }, [shoppingList]);

  function toggle(name: string) {
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <div className="app">
      <div className="topbar">
        <div>
          <div className="greet-sub">Lista de la compra</div>
          <div className="greet-name">{DAY_NAMES[selectedDay]}</div>
        </div>
        <div className="icon-btn-row">
          <Link className="icon-btn" title="Volver" href="/">←</Link>
        </div>
      </div>

      {!menu ? (
        <div className="panel-sheet">
          <p className="empty">Genera un día primero desde la pantalla principal.</p>
        </div>
      ) : shoppingList.length === 0 ? (
        <div className="panel-sheet">
          <p className="empty">No hay ingredientes todavía.</p>
        </div>
      ) : (
        grouped.map((group) => (
          <div className="shop-group" key={group.category}>
            <div className="shop-group-title">{group.category}</div>
            <div className="shop-card">
              {group.items.map((item, idx) => (
                <div
                  className={"shop-item" + (idx === group.items.length - 1 ? " last" : "")}
                  key={item.name}
                >
                  <IconCircle icon={item.icon} bg="var(--green-tint)" size="sm" />
                  <div className="shop-item-name">{item.name}</div>
                  <div className="shop-item-amount">{item.amount}</div>
                  <button
                    className={"shop-check" + (checked[item.name] ? " checked" : "")}
                    onClick={() => toggle(item.name)}
                    aria-label={`Marcar ${item.name}`}
                  >
                    {checked[item.name] && "✓"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <Link href="/" className="link-btn-week" style={{ textAlign: "center" }}>← Volver al plan del día</Link>

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
