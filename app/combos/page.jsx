import Storefront from "../components/Storefront";
import { PRODUCTS } from "../../data/products";

export const metadata = {
  title: "Combos de decants",
  description: "Armá un combo de decants con hasta tres fragancias y consultá disponibilidad y precio por WhatsApp.",
};

export default function CombosPage() {
  return <Storefront initialProducts={PRODUCTS} page="combos" />;
}
