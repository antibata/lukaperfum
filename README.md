# Lukaperfum V7 — Next.js

Catálogo mobile-first de perfumes y decants desarrollado con **Next.js App Router + React**.

## Ejecutar

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`.

## Navegación por páginas

- `/` — inicio
- `/catalogo` — buscador, filtros, comparación y compra directa por WhatsApp
- `/combos` — constructor de combos
- `/asesor` — recomendador de fragancias
- `/como-comprar` — explicación del proceso
- `/perfumes/[slug]` — ficha individual de cada perfume

En celular aparece una barra inferior fija con Inicio, Catálogo, Combos, Asesor y Cómo comprar.

## Flujo de compra

No hay carrito ni “Agregar consulta”. En cada perfume se elige la presentación y se continúa directamente a WhatsApp con el producto, tamaño y precio incluidos en el mensaje.

Los combos se mantienen separados porque allí sí tiene sentido seleccionar varias fragancias antes de consultar.

## Clasificación final del catálogo

El catálogo usa `Hombre`, `Mujer` y `Unisex`, según las correcciones indicadas para esta tienda.

Correcciones aplicadas en esta versión:

- Oud for Glory — Hombre
- Attar Al Wesal Gold — Hombre
- Khamrah — Hombre
- Club de Nuit Untold — Mujer
- Club de Nuit Sillage — Hombre
- Amber Oud Gold Edition — Hombre
- His Confession — Unisex
- Club de Nuit Precieux I — Hombre
- Xerjoff Erba Pura — Hombre
- Vulcan Feu — Hombre

## Editar perfumes a mano

Todo el catálogo está en:

```text
data/products.js
```

Para agregar uno nuevo, copiá una entrada existente, cambiá sus datos y colocá la foto en:

```text
public/images/
```

## Publicar cambios en GitHub

Dentro del repositorio:

```bash
git add .
git commit -m "Actualizar Lukaperfum"
git push
```

Si Vercel está conectado al repositorio, el nuevo despliegue se inicia automáticamente.

## SEO y dominio

Copiá `.env.example` a `.env.local` y configurá:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Antes de publicar, comprobá:

```bash
npm run build
```

## V8 - Fotos corregidas
- Se eliminó de las 35 fotos la franja negra inferior que venía incorporada en los screenshots originales.
- Se ajustaron las relaciones de aspecto principales a 3:4 para respetar mejor el encuadre de las fotos, especialmente en celular.
- La vista rápida usa `object-fit: contain` para mostrar la fotografía completa.
