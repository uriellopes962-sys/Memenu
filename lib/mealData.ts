export type CategoryKey = "breakfast" | "lunch" | "dinner" | "snack";

export type IngredientAlternative = {
  name: string;
  kcalDelta: number; // relativo al ingrediente original: + suma, - resta
};

export type Ingredient = {
  name: string;
  amount: string; // ej. "150g", "1 cda", "al gusto"
  kcal: number;
  alternatives?: IngredientAlternative[];
};

export type Meal = {
  id: string;
  name: string;
  kcal: number;
  p: number;
  c: number;
  g: number;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
};

export type WeekMenu = Record<CategoryKey, Meal>;

export const DATA: Record<CategoryKey, Meal[]> = {
  breakfast: [
    {
      id: "breakfast-1",
      name: "Avena con cúrcuma, jengibre y arándanos",
      kcal: 380, p: 16, c: 52, g: 12,
      tags: ["cúrcuma", "fibra"],
      ingredients: [
        { name: "Avena", amount: "60g", kcal: 220 },
        { name: "Leche de almendras", amount: "200ml", kcal: 30 },
        { name: "Arándanos", amount: "50g", kcal: 30 },
        { name: "Miel", amount: "1 cda", kcal: 60, alternatives: [
          { name: "Sin miel (avena natural)", kcalDelta: -60 },
          { name: "Sirope de dátil, 1 cda", kcalDelta: -15 }
        ]},
        { name: "Cúrcuma, jengibre y canela", amount: "al gusto", kcal: 40 }
      ],
      instructions: [
        "Cocina la avena con la leche de almendras a fuego bajo 5-7 minutos, revolviendo.",
        "Agrega la cúrcuma, el jengibre rallado y la canela; cocina 1 minuto más.",
        "Sirve en un bowl y corona con los arándanos y la miel."
      ]
    },
    {
      id: "breakfast-2",
      name: "Tostada de aguacate, huevo pochado y chía",
      kcal: 400, p: 18, c: 30, g: 22,
      tags: ["omega-3"],
      ingredients: [
        { name: "Pan integral", amount: "1 rebanada", kcal: 90 },
        { name: "Aguacate", amount: "100g", kcal: 170, alternatives: [
          { name: "Aguacate 50g (media porción)", kcalDelta: -85 },
          { name: "Con queso crema en vez de aguacate", kcalDelta: 20 }
        ]},
        { name: "Huevo", amount: "1 grande", kcal: 78 },
        { name: "Chía", amount: "1 cda", kcal: 60 },
        { name: "Limón y sal", amount: "al gusto", kcal: 2 }
      ],
      instructions: [
        "Tuesta el pan integral hasta que esté crujiente.",
        "Machaca el aguacate con limón y sal, y unta sobre el pan.",
        "Pocha el huevo 3 minutos, colócalo encima y espolvorea la chía."
      ]
    },
    {
      id: "breakfast-3",
      name: "Yogur griego con nueces, canela y granada",
      kcal: 360, p: 22, c: 34, g: 14,
      tags: ["probióticos"],
      ingredients: [
        { name: "Yogur griego", amount: "200g", kcal: 180 },
        { name: "Nueces", amount: "20g", kcal: 130, alternatives: [
          { name: "Almendras, 20g", kcalDelta: -10 },
          { name: "Nueces de macadamia, 20g", kcalDelta: 15 }
        ]},
        { name: "Granada", amount: "30g", kcal: 20 },
        { name: "Miel", amount: "1 cdta", kcal: 20 },
        { name: "Canela", amount: "al gusto", kcal: 10 }
      ],
      instructions: [
        "Sirve el yogur griego en un bowl.",
        "Agrega las nueces picadas y los granos de granada.",
        "Espolvorea canela y termina con un hilo de miel."
      ]
    },
    {
      id: "breakfast-4",
      name: "Batido verde de espinaca, piña y linaza",
      kcal: 340, p: 14, c: 50, g: 9,
      tags: ["clorofila"],
      ingredients: [
        { name: "Espinaca", amount: "40g", kcal: 10 },
        { name: "Piña", amount: "150g", kcal: 120 },
        { name: "Jengibre", amount: "1 cdta", kcal: 2 },
        { name: "Linaza molida", amount: "2 cdas", kcal: 110 },
        { name: "Agua de coco", amount: "200ml", kcal: 98, alternatives: [
          { name: "Agua simple", kcalDelta: -98 },
          { name: "Leche de coco, 200ml", kcalDelta: 80 }
        ]}
      ],
      instructions: [
        "Licúa la espinaca con el agua de coco hasta integrar.",
        "Agrega la piña y el jengibre, licúa de nuevo.",
        "Incorpora la linaza molida al final y sirve frío."
      ]
    },
    {
      id: "breakfast-5",
      name: "Huevos revueltos con espinaca y tomate",
      kcal: 390, p: 24, c: 10, g: 28,
      tags: ["omega-3"],
      ingredients: [
        { name: "Huevo", amount: "2 grandes", kcal: 156 },
        { name: "Espinaca", amount: "40g", kcal: 10 },
        { name: "Tomate", amount: "90g", kcal: 17 },
        { name: "Aceite de oliva", amount: "1 cda", kcal: 119, alternatives: [
          { name: "Spray de aceite", kcalDelta: -90 },
          { name: "Mantequilla, 1 cda", kcalDelta: 15 }
        ]},
        { name: "Cebolla", amount: "20g", kcal: 8 },
        { name: "Queso feta", amount: "30g", kcal: 80 }
      ],
      instructions: [
        "Sofríe la cebolla y el tomate en el aceite de oliva 2 minutos.",
        "Agrega la espinaca hasta que se marchite.",
        "Incorpora los huevos batidos y revuelve a fuego bajo; termina con el queso feta."
      ]
    },
    {
      id: "breakfast-6",
      name: "Panqueques de avena y plátano con nueces",
      kcal: 410, p: 16, c: 55, g: 16,
      tags: ["fibra"],
      ingredients: [
        { name: "Avena", amount: "40g", kcal: 152 },
        { name: "Plátano", amount: "1 mediano", kcal: 105, alternatives: [
          { name: "Plátano pequeño (1/2)", kcalDelta: -50 },
          { name: "Con miel encima", kcalDelta: 60 }
        ]},
        { name: "Huevo", amount: "1", kcal: 78 },
        { name: "Nueces", amount: "10g", kcal: 65 },
        { name: "Canela", amount: "al gusto", kcal: 10 }
      ],
      instructions: [
        "Licúa la avena, el plátano y el huevo hasta obtener una mezcla homogénea.",
        "Cocina pequeñas porciones en sartén antiadherente 2 minutos por lado.",
        "Sirve apilados con nueces picadas y canela."
      ]
    },
    {
      id: "breakfast-7",
      name: "Bowl de quinoa, mango y semillas de calabaza",
      kcal: 370, p: 13, c: 58, g: 11,
      tags: ["zinc"],
      ingredients: [
        { name: "Quinoa cocida", amount: "100g", kcal: 120 },
        { name: "Mango", amount: "100g", kcal: 60 },
        { name: "Semillas de calabaza", amount: "20g", kcal: 110 },
        { name: "Leche de coco", amount: "80ml", kcal: 80, alternatives: [
          { name: "Yogur natural, 80g", kcalDelta: -30 },
          { name: "Leche de coco entera", kcalDelta: 40 }
        ]}
      ],
      instructions: [
        "Cocina la quinoa y déjala enfriar ligeramente.",
        "Corta el mango en cubos.",
        "Sirve la quinoa con el mango, las semillas de calabaza y un chorrito de leche de coco."
      ]
    },
    {
      id: "breakfast-8",
      name: "Tostada de salmón ahumado, aguacate y eneldo",
      kcal: 420, p: 26, c: 24, g: 22,
      tags: ["omega-3"],
      ingredients: [
        { name: "Pan integral", amount: "1 rebanada", kcal: 90 },
        { name: "Salmón ahumado", amount: "40g", kcal: 75 },
        { name: "Aguacate", amount: "80g", kcal: 136 },
        { name: "Queso crema light", amount: "20g", kcal: 115, alternatives: [
          { name: "Sin queso crema", kcalDelta: -115 },
          { name: "Queso crema regular, 20g", kcalDelta: 20 }
        ]},
        { name: "Eneldo y limón", amount: "al gusto", kcal: 4 }
      ],
      instructions: [
        "Tuesta el pan integral.",
        "Unta el queso crema y coloca las láminas de aguacate encima.",
        "Corona con el salmón ahumado, eneldo fresco y unas gotas de limón."
      ]
    }
  ],
  lunch: [
    {
      id: "lunch-1",
      name: "Salmón al horno, brócoli y batata asada",
      kcal: 560, p: 38, c: 42, g: 22,
      tags: ["omega-3"],
      ingredients: [
        { name: "Salmón", amount: "150g", kcal: 280, alternatives: [
          { name: "Salmón 120g (porción menor)", kcalDelta: -56 },
          { name: "Salmón con piel, 150g", kcalDelta: 20 }
        ]},
        { name: "Batata", amount: "150g", kcal: 130 },
        { name: "Brócoli", amount: "100g", kcal: 35 },
        { name: "Aceite de oliva", amount: "1 cda", kcal: 115 },
        { name: "Ajo y especias", amount: "al gusto", kcal: 0 }
      ],
      instructions: [
        "Precalienta el horno a 200°C y coloca el salmón y la batata en cubos con aceite de oliva y ajo.",
        "Hornea 20 minutos, añadiendo el brócoli a mitad de cocción.",
        "Sirve todo junto recién salido del horno."
      ]
    },
    {
      id: "lunch-2",
      name: "Ensalada de garbanzos, kale, remolacha y tahini",
      kcal: 520, p: 18, c: 60, g: 20,
      tags: ["fibra"],
      ingredients: [
        { name: "Garbanzos cocidos", amount: "200g", kcal: 290 },
        { name: "Tahini", amount: "2 cdas", kcal: 178, alternatives: [
          { name: "Tahini, 1 cda", kcalDelta: -89 },
          { name: "Aderezo de yogur en vez de tahini", kcalDelta: -100 }
        ]},
        { name: "Remolacha", amount: "80g", kcal: 35 },
        { name: "Kale", amount: "40g", kcal: 14 },
        { name: "Limón", amount: "al gusto", kcal: 3 }
      ],
      instructions: [
        "Mezcla los garbanzos, el kale masajeado y la remolacha en cubos.",
        "Prepara el aderezo batiendo el tahini con limón y un poco de agua.",
        "Baña la ensalada con el aderezo antes de servir."
      ]
    },
    {
      id: "lunch-3",
      name: "Curry de lentejas con cúrcuma y leche de coco",
      kcal: 540, p: 22, c: 58, g: 20,
      tags: ["cúrcuma"],
      ingredients: [
        { name: "Lentejas cocidas", amount: "180g", kcal: 230 },
        { name: "Leche de coco", amount: "150ml", kcal: 220, alternatives: [
          { name: "Leche de coco light, 150ml", kcalDelta: -100 },
          { name: "Leche de coco entera extra, 200ml", kcalDelta: 70 }
        ]},
        { name: "Arroz integral (guarnición)", amount: "60g", kcal: 60 },
        { name: "Cebolla y ajo", amount: "40g", kcal: 20 },
        { name: "Cúrcuma y jengibre", amount: "al gusto", kcal: 10 }
      ],
      instructions: [
        "Sofríe la cebolla y el ajo, agrega la cúrcuma y el jengibre.",
        "Incorpora las lentejas y la leche de coco; cocina a fuego bajo 10 minutos.",
        "Sirve caliente sobre el arroz integral."
      ]
    },
    {
      id: "lunch-4",
      name: "Pollo a la plancha, quinoa y verduras asadas",
      kcal: 550, p: 40, c: 46, g: 18,
      tags: ["proteína"],
      ingredients: [
        { name: "Pechuga de pollo", amount: "150g", kcal: 250, alternatives: [
          { name: "Pechuga de pollo 120g", kcalDelta: -50 },
          { name: "Muslo de pollo sin piel, 150g", kcalDelta: 40 }
        ]},
        { name: "Quinoa cocida", amount: "100g", kcal: 120 },
        { name: "Calabacín y pimiento", amount: "150g", kcal: 61 },
        { name: "Aceite de oliva", amount: "1 cda", kcal: 119 }
      ],
      instructions: [
        "Sazona y cocina la pechuga de pollo a la plancha 6-7 minutos por lado.",
        "Asa el calabacín y el pimiento con un poco de aceite de oliva.",
        "Sirve el pollo sobre la quinoa, acompañado de las verduras asadas."
      ]
    },
    {
      id: "lunch-5",
      name: "Bowl de atún, aguacate, edamame y arroz integral",
      kcal: 570, p: 34, c: 50, g: 22,
      tags: ["omega-3"],
      ingredients: [
        { name: "Atún al natural", amount: "120g", kcal: 140 },
        { name: "Arroz integral", amount: "120g", kcal: 140 },
        { name: "Aguacate", amount: "80g", kcal: 136, alternatives: [
          { name: "Aguacate 40g", kcalDelta: -68 },
          { name: "Doble aguacate, 160g", kcalDelta: 136 }
        ]},
        { name: "Edamame", amount: "80g", kcal: 90 },
        { name: "Sésamo", amount: "1 cda", kcal: 52 },
        { name: "Salsa de soja y limón", amount: "al gusto", kcal: 12 }
      ],
      instructions: [
        "Cocina el arroz integral y déjalo enfriar un poco.",
        "Arma el bowl con el arroz, el atún, el aguacate y el edamame.",
        "Espolvorea sésamo y añade un chorrito de salsa de soja y limón."
      ]
    },
    {
      id: "lunch-6",
      name: "Sopa de calabaza, jengibre y cúrcuma",
      kcal: 480, p: 12, c: 48, g: 22,
      tags: ["cúrcuma"],
      ingredients: [
        { name: "Calabaza", amount: "250g", kcal: 100 },
        { name: "Crema de coco", amount: "100ml", kcal: 230, alternatives: [
          { name: "Leche evaporada light, 100ml", kcalDelta: -140 },
          { name: "Crema de leche regular, 100ml", kcalDelta: 20 }
        ]},
        { name: "Semillas de calabaza", amount: "20g", kcal: 110 },
        { name: "Caldo de verduras", amount: "300ml", kcal: 30 },
        { name: "Jengibre y cúrcuma", amount: "al gusto", kcal: 10 }
      ],
      instructions: [
        "Cocina la calabaza en el caldo de verduras hasta que esté suave, unos 20 minutos.",
        "Licúa con la cúrcuma, el jengibre y la crema de coco hasta obtener una textura cremosa.",
        "Sirve caliente con las semillas de calabaza tostadas por encima."
      ]
    },
    {
      id: "lunch-7",
      name: "Ensalada de salmón, espinaca, nueces y granada",
      kcal: 550, p: 32, c: 28, g: 30,
      tags: ["omega-3"],
      ingredients: [
        { name: "Salmón", amount: "130g", kcal: 245 },
        { name: "Nueces", amount: "20g", kcal: 130, alternatives: [
          { name: "Nueces 10g", kcalDelta: -65 },
          { name: "Nueces de la India, 20g", kcalDelta: -20 }
        ]},
        { name: "Aceite de oliva y vinagre balsámico", amount: "al gusto", kcal: 136 },
        { name: "Granada", amount: "40g", kcal: 27 },
        { name: "Espinaca", amount: "50g", kcal: 12 }
      ],
      instructions: [
        "Cocina el salmón a la plancha y déjalo enfriar en tiras.",
        "Arma la ensalada con la espinaca, las nueces y los granos de granada.",
        "Agrega el salmón y aliña con aceite de oliva y vinagre balsámico."
      ]
    },
    {
      id: "lunch-8",
      name: "Tofu salteado con brócoli, jengibre y sésamo",
      kcal: 500, p: 24, c: 40, g: 24,
      tags: ["isoflavonas"],
      ingredients: [
        { name: "Tofu firme", amount: "150g", kcal: 180 },
        { name: "Arroz integral (guarnición)", amount: "80g", kcal: 87 },
        { name: "Aceite de sésamo", amount: "1 cda", kcal: 120, alternatives: [
          { name: "Spray de aceite", kcalDelta: -100 },
          { name: "Aceite de sésamo, 2 cdas", kcalDelta: 120 }
        ]},
        { name: "Brócoli", amount: "150g", kcal: 51 },
        { name: "Sésamo", amount: "1 cda", kcal: 52 },
        { name: "Salsa de soja baja en sodio", amount: "al gusto", kcal: 10 }
      ],
      instructions: [
        "Saltea el tofu en cubos con el aceite de sésamo hasta dorar.",
        "Agrega el brócoli y el jengibre rallado, saltea 5 minutos más.",
        "Sirve sobre arroz integral, con sésamo y salsa de soja al gusto."
      ]
    }
  ],
  dinner: [
    {
      id: "dinner-1",
      name: "Merluza al vapor con espárragos y limón",
      kcal: 430, p: 34, c: 18, g: 18,
      tags: ["proteína"],
      ingredients: [
        { name: "Merluza", amount: "180g", kcal: 160 },
        { name: "Batata pequeña (guarnición)", amount: "120g", kcal: 110, alternatives: [
          { name: "Sin guarnición de batata", kcalDelta: -110 },
          { name: "Batata mediana, 180g", kcalDelta: 55 }
        ]},
        { name: "Aceite de oliva", amount: "1 cda", kcal: 119 },
        { name: "Espárragos", amount: "150g", kcal: 30 },
        { name: "Limón", amount: "al gusto", kcal: 11 }
      ],
      instructions: [
        "Cocina la merluza al vapor 8-10 minutos con rodajas de limón.",
        "Saltea los espárragos con un poco de aceite de oliva.",
        "Sirve con la batata al vapor y un chorrito extra de limón."
      ]
    },
    {
      id: "dinner-2",
      name: "Crema de brócoli y jengibre con pollo",
      kcal: 460, p: 28, c: 30, g: 20,
      tags: ["jengibre"],
      ingredients: [
        { name: "Pollo desmenuzado", amount: "100g", kcal: 165 },
        { name: "Crema de leche light", amount: "80ml", kcal: 198, alternatives: [
          { name: "Leche evaporada, 80ml", kcalDelta: -100 },
          { name: "Crema de leche regular, 80ml", kcalDelta: 40 }
        ]},
        { name: "Brócoli", amount: "200g", kcal: 68 },
        { name: "Caldo de pollo", amount: "250ml", kcal: 25 },
        { name: "Jengibre", amount: "al gusto", kcal: 4 }
      ],
      instructions: [
        "Cocina el brócoli en el caldo hasta que esté suave.",
        "Licúa con el jengibre y la crema light hasta obtener una textura cremosa.",
        "Sirve caliente con el pollo desmenuzado por encima."
      ]
    },
    {
      id: "dinner-3",
      name: "Ensalada tibia de quinoa, calabacín y aceitunas",
      kcal: 470, p: 14, c: 52, g: 20,
      tags: ["polifenoles"],
      ingredients: [
        { name: "Quinoa cocida", amount: "150g", kcal: 180 },
        { name: "Aceite de oliva", amount: "1.5 cda", kcal: 200 },
        { name: "Aceitunas", amount: "30g", kcal: 60, alternatives: [
          { name: "Aceitunas 15g", kcalDelta: -30 },
          { name: "Aceitunas rellenas de queso, 30g", kcalDelta: 25 }
        ]},
        { name: "Calabacín", amount: "100g", kcal: 20 },
        { name: "Tomate", amount: "60g", kcal: 10 }
      ],
      instructions: [
        "Saltea el calabacín en cubos con un poco de aceite de oliva.",
        "Mezcla con la quinoa tibia, el tomate y las aceitunas.",
        "Aliña con el resto del aceite de oliva y sirve tibio."
      ]
    },
    {
      id: "dinner-4",
      name: "Salmón en papillote con puerro y eneldo",
      kcal: 490, p: 36, c: 16, g: 28,
      tags: ["omega-3"],
      ingredients: [
        { name: "Salmón", amount: "180g", kcal: 335, alternatives: [
          { name: "Salmón 140g", kcalDelta: -93 },
          { name: "Salmón con piel, 180g", kcalDelta: 15 }
        ]},
        { name: "Aceite de oliva", amount: "1 cda", kcal: 119 },
        { name: "Puerro", amount: "80g", kcal: 25 },
        { name: "Eneldo y limón", amount: "al gusto", kcal: 11 }
      ],
      instructions: [
        "Coloca el salmón sobre papel para hornear con el puerro en juliana.",
        "Riega con aceite de oliva, eneldo fresco y limón; cierra el papillote.",
        "Hornea a 200°C durante 15-18 minutos y sirve dentro del papel."
      ]
    },
    {
      id: "dinner-5",
      name: "Tofu al curry verde con arroz integral",
      kcal: 480, p: 20, c: 55, g: 18,
      tags: ["cúrcuma"],
      ingredients: [
        { name: "Leche de coco", amount: "120ml", kcal: 176, alternatives: [
          { name: "Leche de coco light, 120ml", kcalDelta: -80 },
          { name: "Leche de coco entera extra, 150ml", kcalDelta: 44 }
        ]},
        { name: "Tofu firme", amount: "150g", kcal: 180 },
        { name: "Arroz integral", amount: "80g", kcal: 93 },
        { name: "Pasta de curry verde", amount: "1 cda", kcal: 25 },
        { name: "Verduras variadas", amount: "80g", kcal: 6 }
      ],
      instructions: [
        "Sofríe la pasta de curry verde un minuto y agrega la leche de coco.",
        "Incorpora el tofu en cubos y las verduras; cocina 8-10 minutos.",
        "Sirve caliente sobre el arroz integral."
      ]
    },
    {
      id: "dinner-6",
      name: "Pavo con puré de coliflor y cúrcuma",
      kcal: 440, p: 36, c: 24, g: 16,
      tags: ["cúrcuma"],
      ingredients: [
        { name: "Pechuga de pavo", amount: "180g", kcal: 230 },
        { name: "Coliflor", amount: "250g", kcal: 63 },
        { name: "Mantequilla", amount: "1 cda", kcal: 100, alternatives: [
          { name: "Aceite de oliva, 1 cda", kcalDelta: 19 },
          { name: "Sin grasa añadida", kcalDelta: -100 }
        ]},
        { name: "Leche", amount: "50ml", kcal: 26 },
        { name: "Ajo y cúrcuma", amount: "al gusto", kcal: 21 }
      ],
      instructions: [
        "Cocina la pechuga de pavo a la plancha con ajo y cúrcuma.",
        "Hierve la coliflor hasta que esté suave y hazla puré con la mantequilla y la leche.",
        "Sirve el pavo sobre el puré de coliflor."
      ]
    },
    {
      id: "dinner-7",
      name: "Sopa miso con salmón, algas y jengibre",
      kcal: 420, p: 26, c: 20, g: 22,
      tags: ["omega-3"],
      ingredients: [
        { name: "Salmón", amount: "150g", kcal: 285, alternatives: [
          { name: "Salmón 100g", kcalDelta: -95 },
          { name: "Atún fresco en vez de salmón, 150g", kcalDelta: -90 }
        ]},
        { name: "Tofu en cubos", amount: "80g", kcal: 60 },
        { name: "Pasta de miso", amount: "1 cda", kcal: 34 },
        { name: "Caldo de pescado", amount: "300ml", kcal: 20 },
        { name: "Algas wakame", amount: "10g", kcal: 5 },
        { name: "Cebolleta, jengibre y sésamo", amount: "al gusto", kcal: 16 }
      ],
      instructions: [
        "Disuelve la pasta de miso en el caldo caliente sin dejar hervir.",
        "Agrega el salmón en trozos y el tofu; cocina 5 minutos.",
        "Sirve con las algas wakame, cebolleta y jengibre por encima."
      ]
    },
    {
      id: "dinner-8",
      name: "Berenjenas rellenas de lentejas y especias",
      kcal: 460, p: 18, c: 50, g: 16,
      tags: ["fibra"],
      ingredients: [
        { name: "Lentejas cocidas", amount: "150g", kcal: 190 },
        { name: "Berenjena", amount: "1 grande", kcal: 50 },
        { name: "Aceite de oliva", amount: "1 cda", kcal: 119 },
        { name: "Queso rallado", amount: "20g", kcal: 80, alternatives: [
          { name: "Sin queso", kcalDelta: -80 },
          { name: "Queso rallado extra, 40g", kcalDelta: 80 }
        ]},
        { name: "Tomate", amount: "80g", kcal: 15 },
        { name: "Cúrcuma y comino", amount: "al gusto", kcal: 6 }
      ],
      instructions: [
        "Corta la berenjena a la mitad, ahueca y hornea 15 minutos a 200°C.",
        "Cocina las lentejas con el tomate, la cúrcuma y el comino.",
        "Rellena la berenjena con las lentejas, cubre con queso y hornea 10 minutos más."
      ]
    }
  ],
  snack: [
    {
      id: "snack-1",
      name: "Nueces y arándanos deshidratados",
      kcal: 160, p: 4, c: 16, g: 10,
      tags: ["omega-3"],
      ingredients: [
        { name: "Nueces", amount: "15g", kcal: 98, alternatives: [
          { name: "Almendras, 15g", kcalDelta: -10 },
          { name: "Nueces de macadamia, 15g", kcalDelta: 15 }
        ]},
        { name: "Arándanos deshidratados", amount: "15g", kcal: 62 }
      ],
      instructions: [
        "Combina las nueces y los arándanos deshidratados en un pequeño recipiente.",
        "Listo para llevar y disfrutar."
      ]
    },
    {
      id: "snack-2",
      name: "Infusión de cúrcuma y jengibre con manzana",
      kcal: 120, p: 1, c: 28, g: 0,
      tags: ["cúrcuma"],
      ingredients: [
        { name: "Manzana", amount: "1 pequeña", kcal: 80 },
        { name: "Miel", amount: "1 cdta", kcal: 20, alternatives: [
          { name: "Sin miel", kcalDelta: -20 },
          { name: "Miel, 2 cdta", kcalDelta: 20 }
        ]},
        { name: "Canela", amount: "al gusto", kcal: 15 },
        { name: "Cúrcuma y jengibre", amount: "al gusto", kcal: 5 }
      ],
      instructions: [
        "Hierve agua con la cúrcuma, el jengibre y la canela 5 minutos.",
        "Sirve con rodajas de manzana y un poco de miel."
      ]
    },
    {
      id: "snack-3",
      name: "Yogur griego con canela y chía",
      kcal: 150, p: 12, c: 14, g: 6,
      tags: ["probióticos"],
      ingredients: [
        { name: "Yogur griego", amount: "150g", kcal: 100 },
        { name: "Chía", amount: "1 cda", kcal: 42, alternatives: [
          { name: "Sin chía", kcalDelta: -42 },
          { name: "Chía, 2 cda", kcalDelta: 42 }
        ]},
        { name: "Canela", amount: "al gusto", kcal: 8 }
      ],
      instructions: [
        "Sirve el yogur griego en un vaso o bowl.",
        "Espolvorea la chía y la canela por encima."
      ]
    },
    {
      id: "snack-4",
      name: "Hummus con zanahoria y pepino",
      kcal: 170, p: 7, c: 20, g: 8,
      tags: ["fibra"],
      ingredients: [
        { name: "Garbanzos (hummus)", amount: "60g", kcal: 100 },
        { name: "Tahini", amount: "1 cdta", kcal: 30, alternatives: [
          { name: "Sin tahini", kcalDelta: -30 },
          { name: "Tahini, 2 cdta", kcalDelta: 30 }
        ]},
        { name: "Aceite de oliva", amount: "al gusto", kcal: 12 },
        { name: "Zanahoria", amount: "50g", kcal: 20 },
        { name: "Pepino", amount: "50g", kcal: 8 }
      ],
      instructions: [
        "Licúa los garbanzos con el tahini y el aceite de oliva hasta obtener una pasta cremosa.",
        "Sirve con bastones de zanahoria y pepino para dipear."
      ]
    },
    {
      id: "snack-5",
      name: "Chocolate negro 85% con almendras",
      kcal: 150, p: 4, c: 12, g: 11,
      tags: ["polifenoles"],
      ingredients: [
        { name: "Chocolate negro 85%", amount: "20g", kcal: 110, alternatives: [
          { name: "Chocolate negro 70%, 20g", kcalDelta: 5 },
          { name: "Chocolate negro 90%, 20g", kcalDelta: -10 }
        ]},
        { name: "Almendras", amount: "8g", kcal: 40 }
      ],
      instructions: [
        "Rompe el chocolate en trozos pequeños.",
        "Combina con las almendras y disfruta."
      ]
    },
    {
      id: "snack-6",
      name: "Batido de piña, cúrcuma y jengibre",
      kcal: 140, p: 1, c: 32, g: 0,
      tags: ["cúrcuma"],
      ingredients: [
        { name: "Piña", amount: "150g", kcal: 120, alternatives: [
          { name: "Piña 100g", kcalDelta: -40 },
          { name: "Piña 200g", kcalDelta: 40 }
        ]},
        { name: "Limón", amount: "al gusto", kcal: 15 },
        { name: "Cúrcuma y jengibre", amount: "al gusto", kcal: 5 }
      ],
      instructions: [
        "Licúa la piña con el jengibre, la cúrcuma y un chorrito de limón.",
        "Agrega hielo al gusto y sirve frío."
      ]
    }
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

export function findMealById(id: string): { meal: Meal; category: CategoryKey } | null {
  for (const cat of CATS) {
    const meal = DATA[cat.key].find((m) => m.id === id);
    if (meal) return { meal, category: cat.key };
  }
  return null;
}

const SHOP_CATEGORY_RULES: { label: string; keywords: string[] }[] = [
  { label: "Carnes, pescado y huevo", keywords: ["salmón", "pollo", "pavo", "atún", "merluza", "huevo", "tofu"] },
  { label: "Lácteos", keywords: ["leche", "yogur", "queso", "crema de leche", "mantequilla"] },
  {
    label: "Frutas y verduras",
    keywords: [
      "arándano", "aguacate", "espinaca", "piña", "tomate", "cebolla", "plátano", "mango",
      "brócoli", "batata", "remolacha", "kale", "calabacín", "pimiento", "calabaza", "puerro",
      "coliflor", "berenjena", "zanahoria", "pepino", "manzana", "granada", "espárrago",
      "verduras", "ajo", "limón", "edamame"
    ]
  },
  { label: "Granos y legumbres", keywords: ["avena", "pan integral", "arroz", "quinoa", "garbanzo", "lenteja"] },
  {
    label: "Grasas, especias y otros",
    keywords: [
      "aceite", "miel", "cúrcuma", "jengibre", "canela", "chía", "linaza", "nueces", "almendras",
      "semillas", "sésamo", "tahini", "salsa de soja", "caldo", "curry", "miso", "algas",
      "chocolate", "agua de coco", "leche de coco", "vinagre", "comino"
    ]
  }
];

export function categorizeIngredient(name: string): string {
  const n = name.toLowerCase();
  for (const rule of SHOP_CATEGORY_RULES) {
    if (rule.keywords.some((k) => n.includes(k))) return rule.label;
  }
  return "Otros";
}

const SHOP_ICON_RULES: { icon: string; keywords: string[] }[] = [
  { icon: "🐟", keywords: ["salmón", "atún", "merluza"] },
  { icon: "🍗", keywords: ["pollo", "pavo"] },
  { icon: "🥚", keywords: ["huevo"] },
  { icon: "🧊", keywords: ["tofu", "edamame"] },
  { icon: "🥛", keywords: ["leche"] },
  { icon: "🥣", keywords: ["yogur"] },
  { icon: "🧀", keywords: ["queso"] },
  { icon: "🧈", keywords: ["mantequilla", "crema"] },
  { icon: "🫐", keywords: ["arándano"] },
  { icon: "🥑", keywords: ["aguacate"] },
  { icon: "🍃", keywords: ["espinaca", "kale"] },
  { icon: "🍍", keywords: ["piña"] },
  { icon: "🍅", keywords: ["tomate"] },
  { icon: "🧅", keywords: ["cebolla", "ajo"] },
  { icon: "🍌", keywords: ["plátano"] },
  { icon: "🥭", keywords: ["mango"] },
  { icon: "🥦", keywords: ["brócoli"] },
  { icon: "🍠", keywords: ["batata"] },
  { icon: "🫒", keywords: ["remolacha", "aceituna"] },
  { icon: "🥒", keywords: ["calabacín", "pepino"] },
  { icon: "🫑", keywords: ["pimiento"] },
  { icon: "🎃", keywords: ["calabaza"] },
  { icon: "🥬", keywords: ["puerro", "verduras"] },
  { icon: "🥔", keywords: ["coliflor"] },
  { icon: "🍆", keywords: ["berenjena"] },
  { icon: "🥕", keywords: ["zanahoria"] },
  { icon: "🍎", keywords: ["manzana"] },
  { icon: "🍈", keywords: ["granada"] },
  { icon: "🍋", keywords: ["limón"] },
  { icon: "🌾", keywords: ["avena", "pan integral", "arroz", "quinoa"] },
  { icon: "🫘", keywords: ["garbanzo", "lenteja"] },
  { icon: "🫒", keywords: ["aceite de oliva"] },
  { icon: "🧴", keywords: ["aceite"] },
  { icon: "🍯", keywords: ["miel"] },
  { icon: "🟡", keywords: ["cúrcuma"] },
  { icon: "🫚", keywords: ["jengibre"] },
  { icon: "🌰", keywords: ["nueces", "almendras", "semillas"] },
  { icon: "🥜", keywords: ["sésamo", "tahini"] },
  { icon: "🥫", keywords: ["salsa de soja", "caldo", "curry", "miso"] },
  { icon: "🌊", keywords: ["algas"] },
  { icon: "🍫", keywords: ["chocolate"] },
  { icon: "🥥", keywords: ["coco"] }
];

export function iconForIngredient(name: string): string {
  const n = name.toLowerCase();
  for (const rule of SHOP_ICON_RULES) {
    if (rule.keywords.some((k) => n.includes(k))) return rule.icon;
  }
  return "🛒";
}

const TIME_BY_CATEGORY: Record<CategoryKey, string> = {
  breakfast: "10 min",
  lunch: "25 min",
  dinner: "25 min",
  snack: "5 min"
};

export function estimatedTime(category: CategoryKey): string {
  return TIME_BY_CATEGORY[category];
}

export function recipeDescription(meal: Meal, category: CategoryKey, catLabel: string): string {
  const focus = meal.tags.join(" + ");
  return `Receta antiinflamatoria de ${catLabel.toLowerCase()}, con enfoque en ${focus}.`;
}
