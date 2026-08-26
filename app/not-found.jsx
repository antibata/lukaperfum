import Link from "next/link";
export default function NotFound() {
  return <main className="detail-page"><section className="product-detail"><div className="container"><p className="eyebrow">404</p><h1 className="section-title">No encontramos ese perfume.</h1><p className="section-copy">Puede que el enlace haya cambiado o que el producto ya no esté en el catálogo.</p><p><Link className="button" href="/#catalogo">Volver al catálogo</Link></p></div></section></main>;
}
