import Storefront from "../components/Storefront";
import { PRODUCTS } from "../../data/products";

export const metadata = {
  title: "Catálogo de perfumes y decants",
  description: "Explorá perfumes para hombre, mujer y unisex. Filtrá por marca, perfil y precio y prepará tu pedido de decants.",
};

export default function CatalogoPage() {
  return <Storefront initialProducts={PRODUCTS} page="catalog" />;
}
