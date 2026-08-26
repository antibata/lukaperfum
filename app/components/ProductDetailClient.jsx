"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WHATSAPP = "5491176467131";
const CART_KEY = "lukaperfum:cart";

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; }
}

export default function ProductDetailClient({ product, related }) {
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || "");
  const [zoom, setZoom] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(id);
  }, [notice]);

  const variant = product.variants.find((item) => item.size === selectedSize) || product.variants[0];
  const message = `Hola! Quiero consultar por ${product.name} (${product.brand}), presentación ${variant?.size || "a definir"}${variant?.price && variant.price !== "Consultar" ? ` a ${variant.price}` : ""}. ¿Me confirmás disponibilidad, forma de pago y entrega?`;

  function addToCart() {
    if (!variant || product.availability === "Sin stock") { setNotice("Este producto figura sin stock"); return; }
    const current = readStorage(CART_KEY, []);
    const found = current.find((item) => item.slug === product.slug && item.size === variant.size);
    const next = found
      ? current.map((item) => item.slug === product.slug && item.size === variant.size ? { ...item, qty: item.qty + 1 } : item)
      : [...current, { slug: product.slug, size: variant.size, price: variant.price, qty: 1 }];
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    setNotice("Agregado. Volvé al catálogo para ver tu pedido.");
  }

  async function shareProduct() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: `${product.name} | Lukaperfum`, text: `Mirá ${product.name} de ${product.brand} en Lukaperfum`, url });
      else { await navigator.clipboard.writeText(url); setNotice("Enlace copiado"); }
    } catch { /* cancelación del usuario */ }
  }

  return (
    <div className="detail-page">
      <header className="detail-header"><div className="container"><Link className="brand" href="/"><img className="brand-logo" src="/images/logo-lukaperfum.png" alt="Lukaperfum" /><span className="brand-name">Lukaperfum</span></Link><Link className="detail-back" href="/catalogo">← Volver al catálogo</Link></div></header>
      <main>
        <section className="product-detail"><div className="container product-detail-grid">
          <div className="detail-gallery"><button type="button" className={`detail-gallery-main${zoom ? " is-zoomed" : ""}`} onClick={() => setZoom(!zoom)} aria-label="Ampliar imagen">{product.image ? <img src={`/images/${product.image}`} alt={`${product.name} de ${product.brand}`} /> : <div className="product-placeholder">Combo personalizable</div>}</button><p className="microcopy">Tocá la foto para {zoom ? "reducir" : "ampliar"}.</p></div>
          <div className="detail-copy">
            <p className="eyebrow">{product.brand} · {product.category}</p>
            <h1>{product.name}</h1>
            <p className="detail-price">{product.price === "Consultar" ? "Precio a consultar" : `Desde ${product.price}`}</p>
            <p className="detail-lede">{product.description}</p>
            <div className="profile-chips">{product.profiles.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="detail-specs"><div><span>Perfil orientativo</span><strong>{product.profiles.join(" · ")}</strong></div><div><span>Ideal para</span><strong>{product.occasions.join(" · ")}</strong></div><div><span>Disponibilidad</span><strong>{product.availability}</strong></div><div><span>Compra</span><strong>Se confirma por WhatsApp</strong></div></div>
            <p className="eyebrow">Elegí una presentación</p>
            <div className="variant-picker">{product.variants.map((item) => <button type="button" className="variant-button" key={item.size} aria-pressed={selectedSize === item.size} onClick={() => setSelectedSize(item.size)}><strong>{item.size}</strong><span>{item.price}</span></button>)}</div>
            <div className="detail-actions"><button className="button" type="button" disabled={product.availability === "Sin stock"} onClick={addToCart}>{product.availability === "Sin stock" ? "Sin stock" : "Agregar a mi pedido"}</button><a className="button button--ghost" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a></div>
            <div className="detail-social-actions"><button type="button" onClick={shareProduct}>↗ Compartir producto</button><Link className="button button--ghost button--small" href="/catalogo">Comparar con otros</Link></div>
            <p className="microcopy">El precio y stock finales se confirman por WhatsApp antes de cualquier pago.</p>
          </div>
        </div></section>
        {related.length > 0 && <section className="related-section"><div className="container"><p className="eyebrow">También podés mirar</p><h2 className="section-title">Opciones relacionadas.</h2><div className="related-row">{related.map((item) => <Link className="related-item" href={`/perfumes/${item.slug}`} key={item.slug}>{item.image && <img src={`/images/${item.image}`} alt={item.name} />}<span><small>{item.brand}</small><strong>{item.name}</strong><em>Desde {item.price}</em></span></Link>)}</div></div></section>}
      </main>
      <nav className="mobile-dock" aria-label="Navegación móvil">
        <Link href="/"><span aria-hidden="true">⌂</span><small>Inicio</small></Link>
        <Link className="is-current" href="/catalogo"><span aria-hidden="true">⌕</span><small>Catálogo</small></Link>
        <Link href="/combos"><span aria-hidden="true">◇</span><small>Combos</small></Link>
        <Link href="/asesor"><span aria-hidden="true">✦</span><small>Asesor</small></Link>
        <Link href="/como-comprar"><span aria-hidden="true">✓</span><small>Cómo comprar</small></Link>
      </nav>
      <a className="whatsapp-float" href={whatsappUrl(`Hola! Quiero consultar por ${product.name} (${product.brand}).`)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por ${product.name} en WhatsApp`}>
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.11 17.21c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.59.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.08-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.59-1.42-.8-1.95-.21-.51-.43-.44-.59-.45h-.5c-.17 0-.45.06-.69.32-.24.26-.91.88-.91 2.15 0 1.27.93 2.5 1.06 2.67.13.17 1.83 2.79 4.43 3.91.62.27 1.1.43 1.48.55.62.2 1.19.17 1.64.1.5-.07 1.53-.63 1.75-1.23.22-.6.22-1.12.15-1.23-.06-.11-.24-.17-.5-.3M16.05 26.4h-.01a10.35 10.35 0 0 1-5.28-1.45l-.38-.23-3.93 1.03 1.05-3.83-.25-.39a10.33 10.33 0 1 1 8.8 4.87m8.8-19.21A12.36 12.36 0 0 0 5.4 22.51L3.65 28.9l6.54-1.72a12.35 12.35 0 1 0 14.66-19.98"/></svg>
      </a>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}
