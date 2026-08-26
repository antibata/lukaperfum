import Storefront from "./components/Storefront";
import { PRODUCTS } from "../data/products";

export default function Home() {
  return <Storefront initialProducts={PRODUCTS} page="home" />;
}
