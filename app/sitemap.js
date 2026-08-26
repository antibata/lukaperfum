import { PRODUCTS } from "../data/products";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticPages = [
    ["", 1],
    ["/catalogo", 0.95],
    ["/combos", 0.85],
    ["/asesor", 0.8],
    ["/como-comprar", 0.7],
  ];
  return [
    ...staticPages.map(([path, priority]) => ({ url: `${base}${path}`, changeFrequency: "weekly", priority })),
    ...PRODUCTS.filter((product) => product.category !== "Combos").map((product) => ({
      url: `${base}/perfumes/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
