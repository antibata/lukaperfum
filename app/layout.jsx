import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lukaperfum | Perfumes originales y decants",
    template: "%s | Lukaperfum",
  },
  description: "Perfumes originales y decants de 3, 5 y 10 ml. Buscá, compará, elegí tu presentación y coordiná tu compra por WhatsApp con Lukaperfum.",
  keywords: ["perfumes", "decants", "perfumes originales", "Lukaperfum", "fragancias"],
  openGraph: {
    title: "Lukaperfum | Perfumes originales y decants",
    description: "Explorá perfumes originales y elegí tu decant y consultá directamente por WhatsApp.",
    type: "website",
    images: [{ url: "/images/logo-lukaperfum.png", alt: "Lukaperfum" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lukaperfum",
    description: "Perfumes originales y decants.",
    images: ["/images/logo-lukaperfum.png"],
  },
};

export const viewport = {
  themeColor: "#0d1420",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
