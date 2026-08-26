import Storefront from "../components/Storefront";
import { PRODUCTS } from "../../data/products";

export const metadata = {
  title: "Cómo comprar",
  description: "Conocé cómo elegir perfumes, preparar tu pedido de decants y coordinar la compra por WhatsApp con Lukaperfum.",
};

export default function ComoComprarPage() {
  return <Storefront initialProducts={PRODUCTS} page="how" />;
}
