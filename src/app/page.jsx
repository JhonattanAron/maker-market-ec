import { ProductSlider } from "@/components/navigation/ProductsCarrusel";
import { HomeWidget } from "@/components/pages/home/HomeWidget";
import { MostSell } from "@/components/pages/home/MostSell";
import { cookies } from "next/headers";

export const metadata = {
  title: "Maker Market | Innovación en Productos Impresos en 3D",
  description: "Diseño, Precisión y Creatividad en Impresión 3D",
};

export function Home() {
  return (
    <>
      <HomeWidget
        title={HomeWidgetData.title}
        description={HomeWidgetData.description}
        button={HomeWidgetData.button}
      />
      <MostSell
        title={MostSellData.title}
        description={MostSellData.description}
        description2={MostSellData.description2}
      />
      <ProductSlider />
      <div className="h-[20vh]"></div>
    </>
  );
}

const HomeWidgetData = {
  title: "Maker Market | Innovación en Productos Impresos en 3D",
  description: "Diseño, Precisión y Creatividad en Impresión 3D",
  button: "Personaliza tu Mundo con Impresión 3D",
};

const MostSellData = {
  title: "Productos Más Vendidos",
  description: "Conoce los productos más vendidos en Maker Market",
  description2:
    "En Maker Market, la innovación y la calidad se unen para ofrecerte los mejores productos impresos en 3D. Descubre nuestra selección de artículos más vendidos, diseñados con precisión y materiales de alta calidad para garantizar durabilidad y estilo.",
};

export default Home;
