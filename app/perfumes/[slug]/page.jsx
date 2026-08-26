import { notFound } from "next/navigation";
import ProductDetailClient from "../../components/ProductDetailClient";
import { PRODUCTS } from "../../../data/products";

export function generateStaticParams() {
  return PRODUCTS.filter((product) => product.category !== "Combos").map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) return { title: "Perfume no encontrado" };
  return {
    title: `${product.name} de ${product.brand} | Decants`,
    description: `${product.description} ${product.variants.map((item) => `${item.size} ${item.price}`).join(" · ")}. Consultá disponibilidad por WhatsApp.`,
    openGraph: {
      title: `${product.name} | Lukaperfum`,
      description: product.description,
      type: "website",
      images: product.image ? [{ url: `/images/${product.image}`, alt: product.name }] : [],
    },
  };
}

export default async function PerfumePage({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product || product.category === "Combos") notFound();
  const related = PRODUCTS.filter((item) => item.slug !== product.slug && item.category !== "Combos" && (item.brand === product.brand || item.category === product.category || item.profiles.some((profile) => product.profiles.includes(profile)))).slice(0, 4);
  const structured = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    image: product.image ? `/images/${product.image}` : undefined,
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} /><ProductDetailClient product={product} related={related} /></>;
}
