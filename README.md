# Lukaperfum V3 — Next.js

Catálogo mobile-first de perfumes y decants desarrollado con **Next.js App Router + React**.

## Ejecutar

```bash
cd "/c/Users/usuario/OneDrive/Escritorio/pagina Luka/lukaperfum-next"
npm install
npm run dev
```

Abrí `http://localhost:3000`.

## Navegación por páginas

La tienda ya no concentra todo en una sola página. Las secciones principales tienen su propia URL:

- `/` — inicio
- `/catalogo` — buscador, filtros, comparación y pedido
- `/combos` — constructor de combos
- `/asesor` — recomendador de fragancias
- `/como-comprar` — explicación del proceso
- `/perfumes/[slug]` — ficha individual de cada perfume

En celular aparece una barra inferior fija con Inicio, Catálogo, Combos, Asesor y Cómo comprar.

## Cambios de esta versión

- Se eliminó por completo la sección de reseñas.
- Se retiró el panel `/admin`; el catálogo se edita manualmente desde `data/products.js`.
- Se agregó un botón flotante real de WhatsApp con su ícono.
- El pedido quedó como un botón flotante separado, con contador de productos.
- Se mejoró la jerarquía mobile para evitar una página inicial demasiado larga.
- Se agregó la categoría **Unisex** y se revisaron productos que estaban clasificados como Hombre/Mujer.
- Los combos ya no aparecen mezclados en el catálogo principal.
- Se mantuvieron comparación, selector 5/10 ml, vista rápida, zoom, ficha individual, buscador, filtros, ordenamiento y pedido múltiple por WhatsApp.

## Clasificación por género

El catálogo usa `Hombre`, `Mujer` y `Unisex`. La clasificación se refiere a cómo se comercializa la fragancia; cualquier persona puede usar la que prefiera.

Se corrigieron a **Unisex**:

- Oud for Glory — Lattafa
- Attar Al Wesal Gold — Al Wataniah
- Khamrah — Lattafa
- Club de Nuit Untold — Armaf
- Club de Nuit Sillage — Armaf
- Amber Oud Gold Edition — Al Haramain
- Club de Nuit Precieux I — Armaf
- Xerjoff Erba Pura — Xerjoff
- Vulcan Feu — French Avenue

## Editar perfumes a mano

Todo el catálogo está en:

```text
data/products.js
```

Para agregar uno nuevo, copiá una entrada existente, cambiá sus datos y colocá la foto en:

```text
public/images/
```

## SEO y dominio

Cuando publiques la web, copiá `.env.example` a `.env.local` y configurá:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Luego comprobá el proyecto con:

```bash
npm run build
```

- El indicador/panel visual de desarrollo de Next.js está desactivado con `devIndicators: false` para que no tape la interfaz durante las pruebas locales.

## Flujo de compra

La tienda usa un flujo directo: el cliente elige la presentación y toca **Pedir por WhatsApp**. Se eliminó la lista “Mi pedido” / “Agregar consulta” para simplificar la experiencia móvil.
