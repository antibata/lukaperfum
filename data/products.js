const BASE_PRODUCTS = [
  { name: "Oud for Glory", brand: "Lattafa", category: "Hombre", price: "$6.000", description: "Una propuesta intensa y amaderada para quienes buscan una fragancia con presencia.", image: "capture_260709_225724.png", variants: [{ size: "5 ml", price: "$6.000" }, { size: "10 ml", price: "$10.000" }] },
  { name: "Attar Al Wesal Gold", brand: "Al Wataniah", category: "Hombre", price: "$6.500", description: "Dulce y envolvente, en formato decant para descubrirla antes de elegir más cantidad.", image: "capture_260709_225744.png", variants: [{ size: "5 ml", price: "$6.500" }, { size: "10 ml", price: "$11.000" }] },
  { name: "Khamrah", brand: "Lattafa", category: "Hombre", price: "$7.500", description: "Una fragancia cálida y especiada, de carácter elegante y persistente.", image: "capture_260709_225759.png", variants: [{ size: "5 ml", price: "$7.500" }, { size: "10 ml", price: "$12.000" }] },
  { name: "Bharara King", brand: "Bharara", category: "Hombre", price: "$9.000", description: "Perfil potente y moderno para sumar presencia tanto de día como de noche.", image: "capture_260709_225815.png", variants: [{ size: "5 ml", price: "$9.000" }, { size: "10 ml", price: "$16.000" }] },
  { name: "Amor Amor", brand: "Cacharel", category: "Mujer", price: "$13.000", description: "Una opción femenina, luminosa y reconocible para todos los días.", image: "capture_260709_225834.png", variants: [{ size: "5 ml", price: "$13.000" }, { size: "10 ml", price: "$20.000" }] },
  { name: "Club de Nuit Untold", brand: "Armaf", category: "Mujer", price: "$13.000", description: "Una fragancia sofisticada para quienes disfrutan aromas intensos y distintivos.", image: "capture_260709_225853.png", variants: [{ size: "5 ml", price: "$13.000" }, { size: "10 ml", price: "$22.000" }] },
  { name: "Club de Nuit Intense Man", brand: "Armaf", category: "Hombre", price: "$11.000", description: "Marcada, versátil y con personalidad; una de las líneas más buscadas de Armaf.", image: "capture_260709_225905.png", variants: [{ size: "5 ml", price: "$11.000" }, { size: "10 ml", price: "$18.000" }] },
  { name: "Club de Nuit Iconic", brand: "Armaf", category: "Hombre", price: "$12.000", description: "Fresca y elegante, pensada para acompañar distintas ocasiones.", image: "capture_260709_225918.png", variants: [{ size: "5 ml", price: "$12.000" }, { size: "10 ml", price: "$20.000" }] },
  { name: "Club de Nuit Sillage", brand: "Armaf", category: "Hombre", price: "$10.000", description: "Una fragancia limpia y expresiva con una estela fácil de reconocer.", image: "capture_260709_225933.png", variants: [{ size: "5 ml", price: "$10.000" }, { size: "10 ml", price: "$19.000" }] },
  { name: "Stronger With You Intensely", brand: "Emporio Armani", category: "Hombre", price: "$20.000", description: "Cálida y seductora, ideal para quienes buscan un perfume con carácter.", image: "capture_260709_230037.png", variants: [{ size: "5 ml", price: "$20.000" }, { size: "10 ml", price: "$38.000" }] },
  { name: "Amber Oud Gold Edition", brand: "Al Haramain", category: "Hombre", price: "$9.000", description: "Dulce, elegante y envolvente; disponible en decants para probarla a tu ritmo.", image: "capture_260709_230051.png", variants: [{ size: "5 ml", price: "$9.000" }, { size: "10 ml", price: "$14.000" }] },
  { name: "La Vie Est Belle", brand: "Lancôme", category: "Mujer", price: "$15.000", description: "Un clásico femenino de perfil dulce, elegante y fácil de disfrutar.", image: "capture_260709_230103.png", variants: [{ size: "5 ml", price: "$15.000" }, { size: "10 ml", price: "$25.000" }] },
  { name: "Invictus Aqua", brand: "Rabanne", category: "Hombre", price: "$14.000", description: "Fresca y dinámica, una elección versátil para días activos.", image: "capture_260709_230116.png", variants: [{ size: "5 ml", price: "$14.000" }, { size: "10 ml", price: "$24.000" }] },
  { name: "CR", brand: "Parfums des Champs", category: "Hombre", price: "$6.000", description: "Una alternativa masculina clásica en una presentación original y distintiva.", image: "capture_260709_230129.png", variants: [{ size: "5 ml", price: "$6.000" }, { size: "10 ml", price: "$10.000" }] },
  { name: "Noble Blush", brand: "Lattafa", category: "Mujer", price: "$6.000", description: "Delicada, moderna y femenina; ideal para probar en un decant compacto.", image: "capture_260709_230141.png", variants: [{ size: "5 ml", price: "$6.000" }, { size: "10 ml", price: "$8.000" }] },
  { name: "Anaïs Anaïs L’Original", brand: "Cacharel", category: "Mujer", price: "$12.000", description: "Femenina y atemporal, una fragancia clásica para usar todos los días.", image: "capture_260709_230152.png", variants: [{ size: "5 ml", price: "$12.000" }, { size: "10 ml", price: "$18.000" }] },
  { name: "His Confession", brand: "Lattafa", category: "Unisex", price: "$7.000", description: "Profunda y elegante, con una presentación que anticipa su personalidad.", image: "capture_260709_230203.png", variants: [{ size: "5 ml", price: "$7.000" }, { size: "10 ml", price: "$10.000" }] },
  { name: "Hawas Malibu", brand: "Rasasi", category: "Hombre", price: "$8.500", description: "Fresca y moderna, pensada para un estilo relajado y seguro.", image: "capture_260709_230216.png", variants: [{ size: "5 ml", price: "$8.500" }, { size: "10 ml", price: "$13.000" }] },
  { name: "Hawas Ice", brand: "Rasasi", category: "Hombre", price: "$9.000", description: "Una opción fresca de perfil masculino para sumar energía a la rutina.", image: "capture_260709_230228.png", variants: [{ size: "5 ml", price: "$9.000" }, { size: "10 ml", price: "$14.000" }] },
  { name: "Club de Nuit Precieux I", brand: "Armaf", category: "Hombre", price: "$17.000", description: "Refinada y de presentación premium, para quienes buscan algo especial.", image: "capture_260709_230303.png", variants: [{ size: "5 ml", price: "$17.000" }, { size: "10 ml", price: "$28.000" }] },
  { name: "Xerjoff Erba Pura", brand: "Xerjoff", category: "Hombre", price: "$28.000", description: "Una fragancia intensa, elegante y de perfil frutal para ocasiones especiales.", image: "capture_260709_230331(1).png", variants: [{ size: "5 ml", price: "$28.000" }, { size: "10 ml", price: "$47.000" }] },
  { name: "Invictus Parfum", brand: "Rabanne", category: "Hombre", price: "$17.000", description: "Potente y moderna, con una presencia masculina ideal para destacar.", image: "capture_260709_230343(1).png", variants: [{ size: "5 ml", price: "$17.000" }, { size: "10 ml", price: "$28.000" }] },
  { name: "Nina Le Parfum", brand: "Nina Ricci", category: "Mujer", price: "$17.000", description: "Una propuesta femenina, dulce y sofisticada en una presentación icónica.", image: "capture_260709_230357(1).png", variants: [{ size: "5 ml", price: "$17.000" }, { size: "10 ml", price: "$28.000" }] },
  { name: "Miss Dior Parfum", brand: "Dior", category: "Mujer", price: "$23.000", description: "Elegante y refinada, una fragancia femenina de carácter distinguido.", image: "capture_260709_230413(1).png", variants: [{ size: "5 ml", price: "$23.000" }, { size: "10 ml", price: "$40.000" }] },
  { name: "212 VIP Rosé", brand: "Carolina Herrera", category: "Mujer", price: "$21.000", description: "Femenina, moderna y luminosa; ideal para sumar un toque sofisticado.", image: "capture_260709_230431(1).png", variants: [{ size: "5 ml", price: "$21.000" }, { size: "10 ml", price: "$36.000" }] },
  { name: "Eternity for Women", brand: "Calvin Klein", category: "Mujer", price: "$17.000", description: "Un clásico femenino, delicado y atemporal para todos los días.", image: "capture_260709_230444(1).png", variants: [{ size: "5 ml", price: "$17.000" }, { size: "10 ml", price: "$28.000" }] },
  { name: "Mayar Cherry Intense", brand: "Lattafa", category: "Mujer", price: "$7.000", description: "Dulce y envolvente, con una personalidad frutal intensa y moderna.", image: "capture_260709_230456(1).png", variants: [{ size: "5 ml", price: "$7.000" }, { size: "10 ml", price: "$10.000" }] },
  { name: "Light Blue", brand: "Dolce & Gabbana", category: "Mujer", price: "$16.000", description: "Fresca, ligera y versátil; una opción femenina para el uso diario.", image: "capture_260709_230508(1).png", variants: [{ size: "5 ml", price: "$16.000" }, { size: "10 ml", price: "$26.000" }] },
  { name: "Sì", brand: "Giorgio Armani", category: "Mujer", price: "$18.000", description: "Una fragancia femenina elegante, cálida y segura de sí misma.", image: "capture_260709_230522(1).png", variants: [{ size: "5 ml", price: "$18.000" }, { size: "10 ml", price: "$30.000" }] },
  { name: "9PM", brand: "Afnan", category: "Hombre", price: "$9.000", description: "Dulce, nocturna y con mucha presencia; pensada para destacar.", image: "capture_260709_230535(1).png", variants: [{ size: "5 ml", price: "$9.000" }, { size: "10 ml", price: "$15.000" }] },
  { name: "Odyssey Mandarin Sky", brand: "Armaf", category: "Hombre", price: "$7.500", description: "Una propuesta fresca y vibrante con una presentación llena de personalidad.", image: "capture_260709_230548(1).png", variants: [{ size: "5 ml", price: "$7.500" }, { size: "10 ml", price: "$13.000" }] },
  { name: "Vulcan Feu", brand: "French Avenue", category: "Hombre", price: "$8.000", description: "Intensa y llamativa, para quienes buscan una fragancia diferente.", image: "capture_260709_230559(1).png", variants: [{ size: "5 ml", price: "$8.000" }, { size: "10 ml", price: "$14.000" }] },
  { name: "The Kingdom", brand: "Lattafa", category: "Hombre", price: "$10.000", description: "Elegante y de gran presencia, con una presentación de estilo premium.", image: "capture_260709_230612(1).png", variants: [{ size: "5 ml", price: "$10.000" }, { size: "10 ml", price: "$15.000" }] },
  { name: "Liquid Brun", brand: "French Avenue", category: "Hombre", price: "$9.000", description: "Cálida y sofisticada, una opción intensa para quienes buscan personalidad.", image: "capture_260709_230623(1).png", variants: [{ size: "5 ml", price: "$9.000" }, { size: "10 ml", price: "$14.000" }] },
  { name: "Yara", brand: "Lattafa", category: "Mujer", price: "$8.000", description: "Dulce, suave y femenina; una de las opciones más reconocibles de Lattafa.", image: "capture_260709_230317(1).png", variants: [{ size: "5 ml", price: "$8.000" }, { size: "10 ml", price: "$13.000" }] },
  { name: "Armá tu combo de decants", brand: "Lukaperfum", category: "Combos", price: "Consultar", description: "Combiná fragancias y tamaños según disponibilidad. Te asesoramos por WhatsApp.", image: "", variants: [{ size: "3 ml", price: "Consultar" }, { size: "5 ml", price: "Consultar" }, { size: "10 ml", price: "Consultar" }] }
];

export function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function priceToNumber(value) {
  if (!value || value === "Consultar") return null;
  return Number(String(value).replace(/[^0-9]/g, ""));
}

function inferProfiles(product) {
  const text = `${product.name} ${product.description}`.toLowerCase();
  const profiles = [];
  const rules = [
    ["Dulce", ["dulce", "envolvente", "seductora"]],
    ["Fresco", ["fresca", "fresco", "limpia", "energía", "dinámica", "ligera", "vibrante"]],
    ["Amaderado", ["amaderada", "amaderado", "oud"]],
    ["Especiado", ["especiada", "especiado", "cálida"]],
    ["Frutal", ["frutal", "cherry", "mandarin"]],
    ["Elegante", ["elegante", "refinada", "refinado", "sofisticada", "sofisticado", "distinguido"]],
    ["Intenso", ["intensa", "intenso", "potente", "presencia", "profunda", "profundo"]],
    ["Suave", ["suave", "delicada", "delicado", "luminosa", "luminoso"]],
  ];
  for (const [label, words] of rules) {
    if (words.some((word) => text.includes(word))) profiles.push(label);
  }
  if (!profiles.length) profiles.push("Versátil");
  return [...new Set(profiles)].slice(0, 4);
}

function inferOccasions(product) {
  const text = product.description.toLowerCase();
  const occasions = [];
  if (text.includes("noche") || text.includes("nocturna") || text.includes("seductora") || text.includes("destacar")) occasions.push("Noche");
  if (text.includes("día") || text.includes("diario") || text.includes("todos los días") || text.includes("rutina") || text.includes("días activos")) occasions.push("Día");
  if (text.includes("especial") || text.includes("premium") || text.includes("sofistic")) occasions.push("Ocasiones especiales");
  if (text.includes("versátil") || text.includes("distintas ocasiones") || !occasions.length) occasions.push("Versátil");
  return [...new Set(occasions)];
}

const FEATURED_NAMES = new Set([
  "Khamrah",
  "Club de Nuit Intense Man",
  "Yara",
  "Xerjoff Erba Pura",
  "Miss Dior Parfum",
  "Stronger With You Intensely",
]);

export const PRODUCTS = BASE_PRODUCTS.map((product, index) => {
  const minPrice = priceToNumber(product.variants.find((variant) => priceToNumber(variant.price) !== null)?.price || product.price);
  const maxPrice = Math.max(...product.variants.map((variant) => priceToNumber(variant.price) || 0));
  const featured = FEATURED_NAMES.has(product.name);
  const badges = [];
  if (featured) badges.push("Selección Luka");
  if (maxPrice >= 35000) badges.push("Premium");
  if (product.category === "Combos") badges.push("Personalizable");
  return {
    ...product,
    id: index + 1,
    slug: slugify(product.name),
    minPrice,
    maxPrice: maxPrice || null,
    profiles: inferProfiles(product),
    occasions: inferOccasions(product),
    featured,
    badges,
    availability: "Consultar stock",
    order: index,
  };
});

export const BRANDS = [...new Set(PRODUCTS.filter((product) => product.category !== "Combos").map((product) => product.brand))].sort((a, b) => a.localeCompare(b, "es"));
export const PROFILES = [...new Set(PRODUCTS.flatMap((product) => product.profiles))].sort((a, b) => a.localeCompare(b, "es"));
