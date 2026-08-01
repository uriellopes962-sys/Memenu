export type Meal = {
  name: string;
  kcal: number;
  p: number;
  c: number;
  g: number;
  tags: string[];
  ing: string[];
};

export type CategoryKey = "breakfast" | "lunch" | "dinner" | "snack";

export type WeekMenu = Record<CategoryKey, Meal>;

export const DATA: Record<CategoryKey, Meal[]> = {
  breakfast: [
    { name: "Avena con cúrcuma, jengibre y arándanos", kcal: 380, p: 16, c: 52, g: 12, tags: ["cúrcuma", "fibra"], ing: ["avena", "leche de almendras", "cúrcuma", "jengibre", "arándanos", "miel", "canela"] },
    { name: "Tostada de aguacate, huevo pochado y chía", kcal: 400, p: 18, c: 30, g: 22, tags: ["omega-3"], ing: ["pan integral", "aguacate", "huevo", "chía", "limón"] },
    { name: "Yogur griego con nueces, canela y granada", kcal: 360, p: 22, c: 34, g: 14, tags: ["probióticos"], ing: ["yogur griego", "nueces", "canela", "granada", "miel"] },
    { name: "Batido verde de espinaca, piña y linaza", kcal: 340, p: 14, c: 50, g: 9, tags: ["clorofila"], ing: ["espinaca", "piña", "jengibre", "linaza", "agua de coco"] },
    { name: "Huevos revueltos con espinaca y tomate", kcal: 390, p: 24, c: 10, g: 28, tags: ["omega-3"], ing: ["huevo", "espinaca", "tomate", "aceite de oliva", "cebolla"] },
    { name: "Panqueques de avena y plátano con nueces", kcal: 410, p: 16, c: 55, g: 16, tags: ["fibra"], ing: ["avena", "plátano", "huevo", "nueces", "canela"] },
    { name: "Bowl de quinoa, mango y semillas de calabaza", kcal: 370, p: 13, c: 58, g: 11, tags: ["zinc"], ing: ["quinoa", "mango", "semillas de calabaza", "leche de coco"] },
    { name: "Tostada de salmón ahumado, aguacate y eneldo", kcal: 420, p: 26, c: 24, g: 22, tags: ["omega-3"], ing: ["pan integral", "salmón ahumado", "aguacate", "eneldo", "limón"] }
  ],
  lunch: [
    { name: "Salmón al horno, brócoli y batata asada", kcal: 560, p: 38, c: 42, g: 22, tags: ["omega-3"], ing: ["salmón", "brócoli", "batata", "aceite de oliva", "ajo"] },
    { name: "Ensalada de garbanzos, kale, remolacha y tahini", kcal: 520, p: 18, c: 60, g: 20, tags: ["fibra"], ing: ["garbanzos", "kale", "remolacha", "tahini", "limón"] },
    { name: "Curry de lentejas con cúrcuma y leche de coco", kcal: 540, p: 22, c: 58, g: 20, tags: ["cúrcuma"], ing: ["lentejas", "cúrcuma", "leche de coco", "cebolla", "ajo", "jengibre"] },
    { name: "Pollo a la plancha, quinoa y verduras asadas", kcal: 550, p: 40, c: 46, g: 18, tags: ["proteína"], ing: ["pechuga de pollo", "quinoa", "calabacín", "pimiento"] },
    { name: "Bowl de atún, aguacate, edamame y arroz integral", kcal: 570, p: 34, c: 50, g: 22, tags: ["omega-3"], ing: ["atún", "aguacate", "edamame", "arroz integral", "sésamo"] },
    { name: "Sopa de calabaza, jengibre y cúrcuma", kcal: 480, p: 12, c: 48, g: 22, tags: ["cúrcuma"], ing: ["calabaza", "jengibre", "cúrcuma", "semillas de calabaza", "caldo de verduras"] },
    { name: "Ensalada de salmón, espinaca, nueces y granada", kcal: 550, p: 32, c: 28, g: 30, tags: ["omega-3"], ing: ["salmón", "espinaca", "nueces", "granada", "aceite de oliva"] },
    { name: "Tofu salteado con brócoli, jengibre y sésamo", kcal: 500, p: 24, c: 40, g: 24, tags: ["isoflavonas"], ing: ["tofu", "brócoli", "jengibre", "sésamo", "salsa de soja baja en sodio"] }
  ],
  dinner: [
    { name: "Merluza al vapor con espárragos y limón", kcal: 430, p: 34, c: 18, g: 18, tags: ["proteína"], ing: ["merluza", "espárragos", "limón", "aceite de oliva"] },
    { name: "Crema de brócoli y jengibre con pollo", kcal: 460, p: 28, c: 30, g: 20, tags: ["jengibre"], ing: ["brócoli", "jengibre", "pollo", "cebolla", "caldo"] },
    { name: "Ensalada tibia de quinoa, calabacín y aceitunas", kcal: 470, p: 14, c: 52, g: 20, tags: ["polifenoles"], ing: ["quinoa", "calabacín", "tomate", "aceitunas", "aceite de oliva"] },
    { name: "Salmón en papillote con puerro y eneldo", kcal: 490, p: 36, c: 16, g: 28, tags: ["omega-3"], ing: ["salmón", "puerro", "eneldo", "limón"] },
    { name: "Tofu al curry verde con arroz integral", kcal: 480, p: 20, c: 55, g: 18, tags: ["cúrcuma"], ing: ["tofu", "pasta de curry verde", "leche de coco", "arroz integral"] },
    { name: "Pavo con puré de coliflor y cúrcuma", kcal: 440, p: 36, c: 24, g: 16, tags: ["cúrcuma"], ing: ["pavo", "coliflor", "cúrcuma", "ajo"] },
    { name: "Sopa miso con salmón, algas y jengibre", kcal: 420, p: 26, c: 20, g: 22, tags: ["omega-3"], ing: ["salmón", "miso", "algas wakame", "jengibre", "cebolleta"] },
    { name: "Berenjenas rellenas de lentejas y especias", kcal: 460, p: 18, c: 50, g: 16, tags: ["fibra"], ing: ["berenjena", "lentejas", "cúrcuma", "comino", "tomate"] }
  ],
  snack: [
    { name: "Nueces y arándanos deshidratados", kcal: 160, p: 4, c: 16, g: 10, tags: ["omega-3"], ing: ["nueces", "arándanos deshidratados"] },
    { name: "Infusión de cúrcuma y jengibre con manzana", kcal: 120, p: 1, c: 28, g: 0, tags: ["cúrcuma"], ing: ["cúrcuma", "jengibre", "manzana"] },
    { name: "Yogur griego con canela y chía", kcal: 150, p: 12, c: 14, g: 6, tags: ["probióticos"], ing: ["yogur griego", "canela", "chía"] },
    { name: "Hummus con zanahoria y pepino", kcal: 170, p: 7, c: 20, g: 8, tags: ["fibra"], ing: ["garbanzos", "tahini", "zanahoria", "pepino"] },
    { name: "Chocolate negro 85% con almendras", kcal: 150, p: 4, c: 12, g: 11, tags: ["polifenoles"], ing: ["chocolate negro", "almendras"] },
    { name: "Batido de piña, cúrcuma y jengibre", kcal: 140, p: 1, c: 32, g: 0, tags: ["cúrcuma"], ing: ["piña", "cúrcuma", "jengibre"] }
  ]
};

export const CATS: { key: CategoryKey; label: string; icon: string; chip: string }[] = [
  { key: "breakfast", label: "Desayuno", icon: "🍳", chip: "chip-orange" },
  { key: "lunch", label: "Almuerzo", icon: "🥗", chip: "chip-teal" },
  { key: "dinner", label: "Cena", icon: "🍲", chip: "chip-blue" },
  { key: "snack", label: "Snack", icon: "🍫", chip: "chip-pink" }
];

export const TARGET_MIN = 1500;
export const TARGET_MAX = 1700;
export const DAY_LETTERS = ["L", "M", "X", "J", "V", "S", "D"];
export const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

function randItem(arr: Meal[], excludeName?: string) {
  const pool = excludeName ? arr.filter((i) => i.name !== excludeName) : arr;
  const source = pool.length ? pool : arr;
  return source[Math.floor(Math.random() * source.length)];
}

export function generateMenu(): WeekMenu {
  let best: WeekMenu | null = null;
  let bestDiff = Infinity;
  for (let attempt = 0; attempt < 300; attempt++) {
    const combo: WeekMenu = {
      breakfast: randItem(DATA.breakfast),
      lunch: randItem(DATA.lunch),
      dinner: randItem(DATA.dinner),
      snack: randItem(DATA.snack)
    };
    const total = combo.breakfast.kcal + combo.lunch.kcal + combo.dinner.kcal + combo.snack.kcal;
    if (total >= TARGET_MIN && total <= TARGET_MAX) return combo;
    const diff = Math.min(Math.abs(total - TARGET_MIN), Math.abs(total - TARGET_MAX));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = combo;
    }
  }
  return best as WeekMenu;
}

export function swapMealIn(menu: WeekMenu, catKey: CategoryKey): WeekMenu {
  return { ...menu, [catKey]: randItem(DATA[catKey], menu[catKey].name) };
}

export function totalKcal(menu: WeekMenu | null) {
  if (!menu) return 0;
  return CATS.reduce((s, c) => s + menu[c.key].kcal, 0);
}

export function totalMacro(menu: WeekMenu | null, field: "p" | "c" | "g") {
  if (!menu) return 0;
  return CATS.reduce((s, c) => s + menu[c.key][field], 0);
}
