import Storefront from "../components/Storefront";
import { PRODUCTS } from "../../data/products";

export const metadata = {
  title: "Asesor de fragancias",
  description: "Elegí género, perfil, ocasión y presupuesto para recibir sugerencias de perfumes disponibles en Lukaperfum.",
};

export default function AsesorPage() {
  return <Storefront initialProducts={PRODUCTS} page="advisor" />;
}
