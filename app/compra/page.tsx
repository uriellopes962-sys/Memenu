"use client";

import Link from "next/link";
import { usePlan } from "@/app/context/PlanContext";
import { DAY_NAMES } from "@/lib/mealData";

export default function CompraPage() {
  const { shoppingList, selectedDay, menu, toast } = usePlan();

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

      <div className="panel-sheet">
        {!menu ? (
          <p className="empty">Genera un día primero desde la pantalla principal.</p>
        ) : shoppingList.length === 0 ? (
          <p className="empty">No hay ingredientes todavía.</p>
        ) : (
          <ul className="shop-list">
            {shoppingList.map((i) => <li key={i}>{i}</li>)}
          </ul>
        )}
      </div>

      <Link href="/" className="link-btn-week" style={{ textAlign: "center" }}>← Volver al plan del día</Link>

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
