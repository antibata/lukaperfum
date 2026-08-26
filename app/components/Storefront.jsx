"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BRANDS, PROFILES } from "../../data/products";

const WHATSAPP = "5491176467131";
const INSTAGRAM = "https://www.instagram.com/luka_perfum/";

const POLICIES = {
  privacy: {
    title: "Política de privacidad",
    content: [
      ["Datos que podemos recibir", "Cuando una persona inicia una conversación por WhatsApp, puede compartir voluntariamente su nombre, teléfono, preferencias de compra y datos necesarios para coordinar la operación."],
      ["Uso de la información", "La información se utiliza únicamente para responder consultas, confirmar disponibilidad, coordinar pagos y entregas, y brindar atención relacionada con la compra. Lukaperfum no vende ni alquila estos datos."],
      ["Conservación y terceros", "Las conversaciones pueden conservarse durante un tiempo razonable para dar seguimiento a pedidos y consultas. WhatsApp e Instagram tienen sus propias políticas de privacidad."],
      ["Consultas", "Para consultar, actualizar o solicitar la eliminación de datos compartidos directamente con Lukaperfum, escribinos al WhatsApp +54 9 11 7646-7131."],
    ],
  },
  returns: {
    title: "Cambios y devoluciones",
    content: [
      ["Productos cerrados", "Los cambios de productos sin abrir y con su presentación original quedan sujetos a evaluación, disponibilidad y coordinación previa por WhatsApp."],
      ["Perfumes y decants abiertos", "Por razones de higiene, conservación y control del producto, no se aceptan devoluciones de frascos, envases o decants abiertos, usados o manipulados, salvo que exista un defecto de fábrica o un error comprobable en la preparación del pedido."],
      ["Problemas con el pedido", "Si recibís un producto dañado, incorrecto o con una falla, comunicate dentro de las 48 horas posteriores a la entrega y conservá el envase y comprobante. Podremos solicitar fotos para evaluar el caso."],
      ["Coordinación", "Todo cambio aprobado se coordina por WhatsApp. Las diferencias de precio, cuando correspondan, se informarán antes de confirmar el cambio."],
    ],
  },
  terms: {
    title: "Términos del servicio",
    content: [
      ["Catálogo informativo", "Este sitio funciona como catálogo visual y herramienta para preparar consultas. No procesa pagos ni confirma compras automáticamente. La venta se considera acordada únicamente después de confirmar por WhatsApp producto, disponibilidad, precio, forma de pago y entrega."],
      ["Precios y disponibilidad", "Los precios y existencias pueden cambiar. Antes de realizar cualquier pago, Lukaperfum confirmará por chat el importe final y las condiciones aplicables."],
      ["Productos y decants", "Los perfumes ofrecidos se comercializan como originales. Los decants son fraccionamientos preparados a partir de las fragancias indicadas y pueden presentarse en envases diferentes al frasco original."],
      ["Uso responsable", "El cliente debe revisar los ingredientes y evitar el uso del producto en caso de alergia o sensibilidad conocida. Se recomienda probar una pequeña cantidad y suspender su uso ante cualquier reacción."],
    ],
  },
};

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function imageSrc(product) {
  if (product?.imageData) return product.imageData;
  return product?.image ? `/images/${product.image}` : "";
}

function money(value) {
  if (value === null || value === undefined) return "Consultar";
  return `$${Number(value).toLocaleString("es-AR")}`;
}



function VariantPicker({ product, selected, onChange, compact = false }) {
  return (
    <div className={`variant-picker${compact ? " variant-picker--compact" : ""}`} role="group" aria-label={`Elegir presentación de ${product.name}`}>
      {product.variants.map((variant) => (
        <button
          type="button"
          className="variant-button"
          aria-pressed={selected === variant.size}
          onClick={() => onChange(variant.size)}
          key={variant.size}
        >
          <strong>{variant.size}</strong>
          <span>{variant.price}</span>
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product, onQuickView, compareSelected, onCompare }) {
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || "");
  const selectedVariant = product.variants.find((variant) => variant.size === selectedSize) || product.variants[0];
  const directMessage = `Hola! Quiero consultar por ${product.name} (${product.brand}), presentación ${selectedVariant?.size || "a definir"}${selectedVariant?.price && selectedVariant.price !== "Consultar" ? ` a ${selectedVariant.price}` : ""}.`;

  return (
    <article className="product-card product-card-enter">
      <div className="product-media-wrap">
        <button type="button" className="product-media" onClick={() => onQuickView(product)} aria-label={`Ver foto y detalle de ${product.name}`}>
          {(product.image || product.imageData) ? <img src={imageSrc(product)} alt={`${product.name} de ${product.brand}`} loading="lazy" /> : <div className="product-placeholder"><span>Armá tu combo</span></div>}
        </button>
        <div className="product-badges">
          <span className="product-category">{product.category}</span>
          {product.badges.slice(0, 2).map((badge) => <span className="product-badge" key={badge}>{badge}</span>)}
        </div>
      </div>
      <div className="product-body">
        <div className="product-meta-line"><p className="product-brand">{product.brand}</p><span className="availability">{product.availability}</span></div>
        <h3 className="product-name">{product.custom ? product.name : <Link href={`/perfumes/${product.slug}`}>{product.name}</Link>}</h3>
        <p className="product-price">{product.price === "Consultar" ? "Precio a consultar" : `Desde ${product.price}`}</p>
        <p className="product-description">{product.description}</p>
        <div className="profile-chips" aria-label="Perfil aromático orientativo">{product.profiles.map((profile) => <span key={profile}>{profile}</span>)}</div>
        <VariantPicker product={product} selected={selectedSize} onChange={setSelectedSize} compact />
        <div className="card-actions">
          {product.availability === "Sin stock"
            ? <button type="button" className="button" disabled>Sin stock</button>
            : <a className="button" href={whatsappUrl(directMessage)} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>}
        </div>
        <div className="card-secondary-actions">
          <button type="button" onClick={() => onQuickView(product)}>Vista rápida</button>
          <button type="button" className={compareSelected ? "is-active" : ""} onClick={() => onCompare(product.slug)}>{compareSelected ? "✓ Comparando" : "Comparar"}</button>
          {product.custom ? <span>Producto local</span> : <Link href={`/perfumes/${product.slug}`}>Ver ficha</Link>}
        </div>
      </div>
    </article>
  );
}

function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product?.variants[0]?.size || "");
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.variants[0]?.size || "");
      setZoom(false);
    }
  }, [product]);

  if (!product) return null;
  const selectedVariant = product.variants.find((variant) => variant.size === selectedSize) || product.variants[0];
  const message = `Hola! Quiero consultar por ${product.name} (${product.brand}), ${selectedVariant?.size || "presentación a definir"}${selectedVariant?.price && selectedVariant.price !== "Consultar" ? ` a ${selectedVariant.price}` : ""}.`;

  return (
    <div className="modal-shell" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="quick-title">
        <button className="modal-close floating-close" type="button" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="product-modal-grid">
          <button type="button" className={`modal-product-image${zoom ? " is-zoomed" : ""}`} onClick={() => setZoom(!zoom)} aria-label="Ampliar o reducir imagen">
            {(product.image || product.imageData) ? <img src={imageSrc(product)} alt={product.name} /> : <div className="product-placeholder"><span>Combo personalizable</span></div>}
            {(product.image || product.imageData) && <span className="zoom-hint">{zoom ? "Reducir" : "Ampliar foto"}</span>}
          </button>
          <div className="product-modal-copy">
            <p className="eyebrow">{product.brand}</p>
            <h2 id="quick-title">{product.name}</h2>
            <p className="modal-price">{product.price === "Consultar" ? "Precio a consultar" : `Desde ${product.price}`}</p>
            <p>{product.description}</p>
            <div className="detail-row"><strong>Perfil</strong><div className="profile-chips">{product.profiles.map((item) => <span key={item}>{item}</span>)}</div></div>
            <div className="detail-row"><strong>Ideal para</strong><p>{product.occasions.join(" · ")}</p></div>
            <div className="detail-row"><strong>Stock</strong><p>{product.availability}</p></div>
            <VariantPicker product={product} selected={selectedSize} onChange={setSelectedSize} />
            <div className="modal-actions">
              {product.availability === "Sin stock"
                ? <button className="button" type="button" disabled>Sin stock</button>
                : <a className="button" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>}
            </div>
            <div className="modal-links">
              {product.custom ? <span>Producto agregado localmente</span> : <Link href={`/perfumes/${product.slug}`}>Abrir ficha completa →</Link>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CompareModal({ slugs, productsBySlug, onClose, onRemove }) {
  const products = slugs.map((slug) => productsBySlug[slug]).filter(Boolean);
  if (!products.length) return null;
  return (
    <div className="modal-shell" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="compare-modal" role="dialog" aria-modal="true" aria-labelledby="compare-title">
        <div className="drawer-head"><div><p className="eyebrow">Lado a lado</p><h2 id="compare-title">Comparador</h2></div><button className="modal-close" type="button" onClick={onClose}>×</button></div>
        <div className="compare-grid" style={{ "--compare-columns": products.length }}>
          {products.map((product) => <article className="compare-column" key={product.slug}>
            {(product.image || product.imageData) && <img src={imageSrc(product)} alt={product.name} />}
            <p className="product-brand">{product.brand}</p><h3>{product.name}</h3>
            <dl>
              <div><dt>Desde</dt><dd>{product.price}</dd></div>
              <div><dt>Perfil</dt><dd>{product.profiles.join(" · ")}</dd></div>
              <div><dt>Uso</dt><dd>{product.occasions.join(" · ")}</dd></div>
              <div><dt>Presentaciones</dt><dd>{product.variants.map((v) => `${v.size} ${v.price}`).join(" / ")}</dd></div>
              <div><dt>Stock</dt><dd>{product.availability}</dd></div>
            </dl>
            {product.custom ? <span className="microcopy">Producto local</span> : <Link className="button button--ghost" href={`/perfumes/${product.slug}`}>Ver ficha</Link>}
            <button className="text-button" type="button" onClick={() => onRemove(product.slug)}>Quitar</button>
          </article>)}
        </div>
      </section>
    </div>
  );
}

function Finder({ products, onQuickView }) {
  const [category, setCategory] = useState("Todos");
  const [profile, setProfile] = useState("Todos");
  const [occasion, setOccasion] = useState("Todos");
  const [budget, setBudget] = useState("Todos");
  const [showResults, setShowResults] = useState(false);

  const matches = useMemo(() => {
    return products.filter((product) => product.category !== "Combos").map((product) => {
      let score = 0;
      if (category === "Todos" || product.category === category) score += category === "Todos" ? 0 : 3;
      else score -= 20;
      if (profile === "Todos" || product.profiles.includes(profile)) score += profile === "Todos" ? 0 : 3;
      if (occasion === "Todos" || product.occasions.includes(occasion) || product.occasions.includes("Versátil")) score += occasion === "Todos" ? 0 : 2;
      const maxBudget = budget === "Todos" ? Infinity : Number(budget);
      if (product.minPrice !== null && product.minPrice <= maxBudget) score += budget === "Todos" ? 0 : 2;
      else if (budget !== "Todos") score -= 10;
      if (product.featured) score += 1;
      return { product, score };
    }).filter((entry) => entry.score > -5).sort((a, b) => b.score - a.score || (a.product.minPrice || Infinity) - (b.product.minPrice || Infinity)).slice(0, 3).map((entry) => entry.product);
  }, [products, category, profile, occasion, budget]);

  return (
    <section className="finder reveal" id="asesor">
      <div className="container finder-grid">
        <div><p className="eyebrow">Asesor de fragancias</p><h2 className="section-title">¿No sabés cuál elegir?</h2><p className="section-copy">Respondé cuatro cosas y te mostramos opciones del catálogo. El perfil es orientativo y está basado en las descripciones disponibles.</p></div>
        <div className="finder-panel">
          <label>¿Para quién?<select value={category} onChange={(e) => setCategory(e.target.value)}><option>Todos</option><option>Hombre</option><option>Mujer</option><option>Unisex</option></select></label>
          <label>¿Qué perfil te atrae?<select value={profile} onChange={(e) => setProfile(e.target.value)}><option>Todos</option>{PROFILES.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>¿Para qué momento?<select value={occasion} onChange={(e) => setOccasion(e.target.value)}><option>Todos</option><option>Día</option><option>Noche</option><option>Ocasiones especiales</option><option>Versátil</option></select></label>
          <label>Presupuesto por decant<select value={budget} onChange={(e) => setBudget(e.target.value)}><option value="Todos">Sin límite</option><option value="8000">Hasta $8.000</option><option value="12000">Hasta $12.000</option><option value="18000">Hasta $18.000</option><option value="25000">Hasta $25.000</option></select></label>
          <button type="button" className="button" onClick={() => setShowResults(true)}>Recomendarme 3</button>
        </div>
      </div>
      {showResults && <div className="container finder-results"><div className="finder-results-head"><h3>Tres opciones para empezar</h3><button className="text-button" type="button" onClick={() => setShowResults(false)}>Cerrar resultados</button></div><div className="mini-product-grid">{matches.map((product) => <button type="button" className="mini-product" key={product.slug} onClick={() => onQuickView(product)}>{(product.image || product.imageData) && <img src={imageSrc(product)} alt="" />}<span><small>{product.brand}</small><strong>{product.name}</strong><em>Desde {product.price}</em></span></button>)}</div></div>}
    </section>
  );
}

function ComboBuilder({ products }) {
  const eligible = products.filter((product) => product.category !== "Combos");
  const [selections, setSelections] = useState([]);
  const [size, setSize] = useState("5 ml");
  const max = 3;
  function toggle(slug) {
    setSelections((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < max ? [...current, slug] : current);
  }
  const chosen = selections.map((slug) => eligible.find((product) => product.slug === slug)).filter(Boolean);
  const message = ["Hola! Quiero armar un combo de decants:", ...chosen.map((product) => `• ${product.name} (${product.brand}) — ${size}`), "", "¿Me confirmás disponibilidad y precio final del combo?"].join("\n");
  return (
    <section className="combo-section reveal" id="combos">
      <div className="container combo-grid">
        <div><p className="eyebrow">Armalo a tu gusto</p><h2 className="section-title">Tu combo de 3 decants.</h2><p className="section-copy">Elegí hasta tres fragancias y una medida. El precio del combo se confirma por WhatsApp según disponibilidad.</p><div className="combo-size"><span>Tamaño</span>{["3 ml", "5 ml", "10 ml"].map((item) => <button type="button" aria-pressed={size === item} onClick={() => setSize(item)} key={item}>{item}</button>)}</div><div className="combo-summary"><strong>{selections.length}/{max} elegidos</strong>{chosen.map((product) => <span key={product.slug}>{product.name}</span>)}</div><a className={`button${chosen.length ? "" : " is-disabled"}`} href={chosen.length ? whatsappUrl(message) : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!chosen.length}>Consultar este combo</a></div>
        <div className="combo-picker">{eligible.map((product) => <button type="button" className={selections.includes(product.slug) ? "is-selected" : ""} onClick={() => toggle(product.slug)} key={product.slug} disabled={!selections.includes(product.slug) && selections.length >= max}>{(product.image || product.imageData) && <img src={imageSrc(product)} alt="" />}<span>{product.name}</span><b>{selections.includes(product.slug) ? "✓" : "+"}</b></button>)}</div>
      </div>
    </section>
  );
}

function InstagramSection({ products }) {
  const shots = products.filter((product) => product.image || product.imageData).slice(2, 8);
  return (
    <section className="instagram-section reveal">
      <div className="container"><div className="instagram-head"><div><p className="eyebrow">@luka_perfum</p><h2 className="section-title">Novedades en Instagram.</h2></div><a className="button button--ghost" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Seguir en Instagram ↗</a></div><div className="instagram-grid">{shots.map((product) => <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" key={product.slug} aria-label={`Ver Instagram de Lukaperfum. Foto de ${product.name}`}><img src={imageSrc(product)} alt={product.name} loading="lazy" /><span>{product.name}</span></a>)}</div></div>
    </section>
  );
}

function PolicyModal({ policy, onClose }) {
  if (!policy) return null;
  return <div className="modal-shell" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="policy-modal" role="dialog" aria-modal="true"><div className="drawer-head"><h2>{policy.title}</h2><button className="modal-close" type="button" onClick={onClose}>×</button></div><div className="policy-body">{policy.content.map(([title, copy]) => <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div></section></div>;
}

export default function Storefront({ initialProducts, page = "home" }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [brand, setBrand] = useState("Todas");
  const [profile, setProfile] = useState("Todos");
  const [priceRange, setPriceRange] = useState("Todos");
  const [sort, setSort] = useState("recomendados");
  const [compare, setCompare] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [policyKey, setPolicyKey] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(""), 2200); return () => clearTimeout(id); }, [toast]);

  const products = useMemo(() => initialProducts, [initialProducts]);
  const perfumeProducts = useMemo(() => products.filter((product) => product.category !== "Combos"), [products]);
  const productsBySlug = useMemo(() => Object.fromEntries(products.map((product) => [product.slug, product])), [products]);
  const featured = useMemo(() => perfumeProducts.filter((product) => product.featured && product.availability !== "Sin stock" && product.image).slice(0, 6), [perfumeProducts]);

  const visibleProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const maxPrice = priceRange === "Todos" ? Infinity : Number(priceRange);
    const filtered = perfumeProducts.filter((product) => {
      if (category !== "Todos" && product.category !== category) return false;
      if (brand !== "Todas" && product.brand !== brand) return false;
      if (profile !== "Todos" && !product.profiles.includes(profile)) return false;
      if (maxPrice !== Infinity && (product.minPrice === null || product.minPrice > maxPrice)) return false;
      if (needle && !`${product.name} ${product.brand} ${product.description} ${product.profiles.join(" ")} ${product.category}`.toLowerCase().includes(needle)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "precio-asc") return (a.minPrice ?? Infinity) - (b.minPrice ?? Infinity);
      if (sort === "precio-desc") return (b.minPrice ?? -1) - (a.minPrice ?? -1);
      if (sort === "nombre") return a.name.localeCompare(b.name, "es");
      if (sort === "marca") return a.brand.localeCompare(b.brand, "es") || a.name.localeCompare(b.name, "es");
      return Number(b.featured) - Number(a.featured) || a.order - b.order;
    });
  }, [perfumeProducts, query, category, brand, profile, priceRange, sort]);

  function toggleCompare(slug) {
    setCompare((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 3) { setToast("Podés comparar hasta 3 perfumes"); return current; }
      return [...current, slug];
    });
  }
  function resetFilters() { setQuery(""); setCategory("Todos"); setBrand("Todas"); setProfile("Todos"); setPriceRange("Todos"); setSort("recomendados"); }

  const activePolicy = policyKey ? POLICIES[policyKey] : null;

  const navItems = [
    ["home", "/", "Inicio"],
    ["catalog", "/catalogo", "Catálogo"],
    ["combos", "/combos", "Combos"],
    ["advisor", "/asesor", "Asesor"],
    ["how", "/como-comprar", "Cómo comprar"],
  ];

  const pageTitles = {
    catalog: ["Catálogo", "Encontrá una fragancia para vos.", "Buscá por nombre o marca, filtrá por género, perfil y precio, y elegí la presentación antes de consultar."],
    combos: ["Combos", "Armá tu combo de decants.", "Elegí las fragancias que quieras y prepará una consulta de combo sin recorrer toda la tienda."],
    advisor: ["Asesor", "Te ayudamos a elegir.", "Contanos qué buscás y te mostramos tres opciones del catálogo para empezar."],
    how: ["Cómo comprar", "Simple, directo y por WhatsApp.", "Explorá, elegí una presentación y coordiná disponibilidad, pago y entrega por WhatsApp."],
  };

  function CatalogSection() {
    return (
      <section className="catalog route-catalog">
        <div className="container">
          <div className="catalog-head">
            <div>
              <p className="eyebrow">Todos los perfumes</p>
              <h2 className="section-title">Elegí con calma.</h2>
              <p className="section-copy">Podés buscar, comparar y filtrar perfumes para hombre, mujer y unisex.</p>
            </div>
            <p className="catalog-count">{visibleProducts.length} {visibleProducts.length === 1 ? "producto" : "productos"}</p>
          </div>
          <div className="catalog-toolbar">
            <label className="search-box"><span>⌕</span><input type="search" placeholder="Buscar perfume, marca o perfil…" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
            <label>Ordenar<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recomendados">Recomendados</option><option value="precio-asc">Precio: menor a mayor</option><option value="precio-desc">Precio: mayor a menor</option><option value="nombre">Nombre A–Z</option><option value="marca">Marca A–Z</option></select></label>
          </div>
          <div className="advanced-filters">
            <div className="filter-pills" role="group" aria-label="Género">{["Todos", "Hombre", "Mujer", "Unisex"].map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <label>Marca<select value={brand} onChange={(e) => setBrand(e.target.value)}><option>Todas</option>{BRANDS.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Perfil<select value={profile} onChange={(e) => setProfile(e.target.value)}><option>Todos</option>{PROFILES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Precio<select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}><option value="Todos">Todos</option><option value="8000">Hasta $8.000</option><option value="12000">Hasta $12.000</option><option value="18000">Hasta $18.000</option><option value="25000">Hasta $25.000</option></select></label>
            <button type="button" className="clear-filters" onClick={resetFilters}>Limpiar filtros</button>
          </div>
          {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} onQuickView={setQuickView} compareSelected={compare.includes(product.slug)} onCompare={toggleCompare} />)}</div> : <div className="empty-state"><h3>No encontramos coincidencias.</h3><p>Probá quitar algún filtro o buscar otra marca.</p><button type="button" className="button button--ghost" onClick={resetFilters}>Ver todo</button></div>}
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="topbar">Perfumes 100% originales · Decants · Atención y entrega a coordinar por WhatsApp</div>
      <header className="site-header">
        <div className="container nav">
          <Link className="brand" href="/"><img className="brand-logo" src="/images/logo-lukaperfum.png" alt="Logo de Luka Attadia Perfume" /><span className="brand-name">Lukaperfum</span></Link>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menú"><span>☰</span></button>
          <nav className={`nav-links${menuOpen ? " is-open" : ""}`}>
            {navItems.map(([key, href, label]) => <Link key={key} className={page === key ? "is-current" : ""} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
          </nav>
        </div>
      </header>

      <main className={`page-${page}`}>
        {page === "home" && <>
          <section className="hero" id="inicio">
            <div className="container hero-grid">
              <div className="hero-copy-wrap"><p className="eyebrow">Perfumería original · Decants seleccionados</p><h1>Probá tu próxima <em>esencia</em> antes del frasco completo.</h1><p className="hero-copy">La web está dividida por secciones para que desde el celular llegues rápido a lo que buscás: catálogo, combos, asesor y cómo comprar.</p><div className="hero-price-chip">Decants disponibles <strong>desde $6.000</strong></div><div className="hero-actions"><Link className="button" href="/catalogo">Explorar catálogo</Link><Link className="button button--ghost" href="/asesor">Ayudame a elegir</Link></div><div className="hero-notes"><span>Fotos reales</span><span>Compra simple</span><span>Atención personal</span></div></div>
              <div className="hero-showcase"><div className="hero-orbit"></div><figure className="hero-main-product"><img src="/images/capture_260709_225759.png" alt="Khamrah de Lattafa" /><figcaption><small>Hombre</small><strong>Khamrah</strong><span>Desde $7.500</span></figcaption></figure><figure className="hero-side-product"><img src="/images/capture_260709_230317(1).png" alt="Yara de Lattafa" /></figure><div className="hero-seal">Fragancias seleccionadas</div></div>
            </div>
          </section>

          <section className="route-cards reveal">
            <div className="container"><div className="section-head-row"><div><p className="eyebrow">Entrá directo</p><h2 className="section-title">Una sección para cada cosa.</h2><p className="section-copy">En celular evitamos una página interminable: cada herramienta tiene su propia pestaña y URL.</p></div></div>
              <div className="route-card-grid">
                <Link href="/catalogo"><span>01</span><strong>Catálogo</strong><p>Buscar, filtrar, comparar y elegir decants.</p><em>/catalogo →</em></Link>
                <Link href="/combos"><span>02</span><strong>Combos</strong><p>Armá una selección de hasta 3 fragancias.</p><em>/combos →</em></Link>
                <Link href="/asesor"><span>03</span><strong>Asesor</strong><p>Recibí 3 sugerencias según lo que buscás.</p><em>/asesor →</em></Link>
                <Link href="/como-comprar"><span>04</span><strong>Cómo comprar</strong><p>Revisá el paso a paso antes de escribir por WhatsApp.</p><em>/como-comprar →</em></Link>
              </div>
            </div>
          </section>

          <section className="featured-section reveal">
            <div className="container"><div className="section-head-row"><div><p className="eyebrow">Para empezar</p><h2 className="section-title">Selección destacada.</h2><p className="section-copy">Algunas opciones para entrar rápido a una ficha o abrir la vista rápida.</p></div><Link href="/catalogo" className="text-link">Ver todo el catálogo →</Link></div><div className="featured-row">{featured.map((product) => <button key={product.slug} type="button" className="featured-card" onClick={() => setQuickView(product)}><img src={imageSrc(product)} alt={product.name} /><span><small>{product.brand} · {product.category}</small><strong>{product.name}</strong><em>Desde {product.price}</em></span></button>)}</div></div>
          </section>

          <section className="service-info reveal"><div className="container"><div className="service-grid"><article><span>01</span><h3>Elegí tranquilo</h3><p>Compará perfumes, tamaños y precios dentro del catálogo.</p></article><article><span>02</span><h3>Elegí el tamaño</h3><p>Seleccioná 5 o 10 ml y abrí WhatsApp con el perfume ya cargado.</p></article><article><span>03</span><h3>Entrega coordinada</h3><p>Disponibilidad, pago y entrega se confirman directamente por chat.</p></article><article><span>04</span><h3>Desde el celular</h3><p>La navegación inferior deja inicio, catálogo, combos, asesor y cómo comprar siempre a mano.</p></article></div></div></section>

          <InstagramSection products={products} />
          <section className="closing"><div className="container closing-inner"><div><p className="eyebrow eyebrow--dark">Asesoramiento personal</p><h2>¿No sabés con cuál arrancar?</h2></div><Link className="button" href="/asesor">Usar el asesor</Link></div></section>
        </>}

        {page !== "home" && pageTitles[page] && <section className="route-hero"><div className="container"><p className="eyebrow">{pageTitles[page][0]}</p><h1>{pageTitles[page][1]}</h1><p>{pageTitles[page][2]}</p></div></section>}

        {page === "catalog" && <CatalogSection />}
        {page === "combos" && <ComboBuilder products={products} />}
        {page === "advisor" && <Finder products={products} onQuickView={setQuickView} />}
        {page === "how" && <>
          <section className="how route-how"><div className="container"><p className="eyebrow">Paso a paso</p><h2 className="section-title">Cómo comprar</h2><div className="steps"><article className="step"><span className="step-number">01</span><h3>Explorá</h3><p>Entrá a /catalogo, buscá y filtrá entre hombre, mujer y unisex.</p></article><article className="step"><span className="step-number">02</span><h3>Elegí el tamaño</h3><p>Seleccioná 5 o 10 ml en el perfume que te interesa.</p></article><article className="step"><span className="step-number">03</span><h3>Escribinos</h3><p>Tocá “Pedir por WhatsApp” y confirmamos stock, pago y entrega.</p></article></div></div></section>
          <section className="service-info"><div className="container"><div className="service-grid"><article><span>01</span><h3>Precios claros</h3><p>Ves el valor de cada presentación antes de consultar.</p></article><article><span>02</span><h3>Sin checkout</h3><p>No tenés que registrarte ni completar formularios largos.</p></article><article><span>03</span><h3>Atención humana</h3><p>La compra se termina directamente por WhatsApp.</p></article><article><span>04</span><h3>Combos aparte</h3><p>Los combos tienen su propia sección para no mezclar todo en el catálogo.</p></article></div></div></section>
        </>}
      </main>

      <footer><div className="container"><div className="footer-grid"><div><Link className="brand footer-brand" href="/"><img className="brand-logo" src="/images/logo-lukaperfum.png" alt="Lukaperfum" /><span className="brand-name">Lukaperfum</span></Link><p className="footer-about">Perfumes originales y decants para descubrir tu próxima fragancia sin comprar el frasco completo.</p><div className="socials"><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={whatsappUrl("Hola! Quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div></div><div><h3 className="footer-title">Explorar</h3><div className="footer-links"><Link href="/catalogo">Catálogo</Link><Link href="/combos">Combos</Link><Link href="/asesor">Asesor</Link><Link href="/como-comprar">Cómo comprar</Link></div></div><div><h3 className="footer-title">Información</h3><div className="footer-links"><button onClick={() => setPolicyKey("privacy")}>Privacidad</button><button onClick={() => setPolicyKey("returns")}>Cambios y devoluciones</button><button onClick={() => setPolicyKey("terms")}>Términos del servicio</button></div></div><div><h3 className="footer-title">Contacto</h3><div className="footer-links"><a href={whatsappUrl("Hola! Quiero consultar por los perfumes disponibles.")} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">@luka_perfum</a><span>Atención y entregas a coordinar.</span></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Lukaperfum.</span><span>Venta y atención 100% por WhatsApp.</span></div></div></footer>

      <nav className="mobile-dock" aria-label="Navegación móvil">
        {navItems.map(([key, href, label]) => <Link key={key} className={page === key ? "is-current" : ""} href={href}><span aria-hidden="true">{key === "home" ? "⌂" : key === "catalog" ? "⌕" : key === "combos" ? "◇" : key === "advisor" ? "✦" : "✓"}</span><small>{label}</small></Link>)}
      </nav>

      <a className="whatsapp-float" href={whatsappUrl("Hola! Quiero consultar por los perfumes disponibles.")} target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.11 17.21c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.59.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.08-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.59-1.42-.8-1.95-.21-.51-.43-.44-.59-.45h-.5c-.17 0-.45.06-.69.32-.24.26-.91.88-.91 2.15 0 1.27.93 2.5 1.06 2.67.13.17 1.83 2.79 4.43 3.91.62.27 1.1.43 1.48.55.62.2 1.19.17 1.64.1.5-.07 1.53-.63 1.75-1.23.22-.6.22-1.12.15-1.23-.06-.11-.24-.17-.5-.3M16.05 26.4h-.01a10.35 10.35 0 0 1-5.28-1.45l-.38-.23-3.93 1.03 1.05-3.83-.25-.39a10.33 10.33 0 1 1 8.8 4.87m8.8-19.21A12.36 12.36 0 0 0 5.4 22.51L3.65 28.9l6.54-1.72a12.35 12.35 0 1 0 14.66-19.98"/></svg>
      </a>

      {compare.length > 0 && <div className="compare-bar"><span><strong>{compare.length}</strong> {compare.length === 1 ? "perfume" : "perfumes"} para comparar</span><div><button type="button" onClick={() => setCompare([])}>Limpiar</button><button type="button" className="button" onClick={() => setCompareOpen(true)} disabled={compare.length < 2}>Comparar ahora</button></div></div>}
      {toast && <div className="toast" role="status">{toast}</div>}
      {quickView && <ProductModal product={productsBySlug[quickView.slug] || quickView} onClose={() => setQuickView(null)} />}
      {compareOpen && <CompareModal slugs={compare} productsBySlug={productsBySlug} onClose={() => setCompareOpen(false)} onRemove={toggleCompare} />}
      {activePolicy && <PolicyModal policy={activePolicy} onClose={() => setPolicyKey(null)} />}
    </>
  );
}
