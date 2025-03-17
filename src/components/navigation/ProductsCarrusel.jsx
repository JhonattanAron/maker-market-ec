"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export function ProductSlider() {
  const [isMobileView, setIsMobileView] = useState(false);

  // Detectar si la vista es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Cambiar a vista móvil si el ancho es menor o igual a 768px
    };

    handleResize(); // Ejecutar al cargar
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño

    return () => window.removeEventListener("resize", handleResize); // Limpiar el evento
  }, []);

  if (isMobileView) {
    return <MobileProductScroll />;
  }

  return <DesktopProductCarousel />;
}

function DesktopProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ITEMS_VISIBLE = 4; // Número de productos visibles al mismo tiempo
  const MAX_INDEX = CONTENTS.length - ITEMS_VISIBLE; // Índice máximo permitido

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < MAX_INDEX) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Botón de navegación izquierda */}
      <IconButton
        variant="text"
        color="black"
        className={`!absolute top-2/4 left-4 -translate-y-2/4 bg-black text-white rounded-full z-10 ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </IconButton>

      {/* Contenedor de productos con animación */}
      <motion.div
        className="flex gap-4 w-full"
        animate={{ x: `-${currentIndex * (100 / ITEMS_VISIBLE)}%` }} // Animación del desplazamiento
        transition={{ duration: 0.5, ease: "easeInOut" }} // Duración y tipo de transición
      >
        {CONTENTS.map((product, idx) => (
          <div
            key={idx}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0"
          >
            <ProductListCard
              img={product.img}
              name={product.name}
              price={product.price}
            />
          </div>
        ))}
      </motion.div>

      {/* Botón de navegación derecha */}
      <IconButton
        variant="text"
        color="black"
        className={`!absolute top-2/4 right-4 -translate-y-2/4 bg-black text-white rounded-full z-10 ${
          currentIndex >= MAX_INDEX ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleNext}
        disabled={currentIndex >= MAX_INDEX}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </IconButton>
    </div>
  );
}

function MobileProductScroll() {
  return (
    <div className="flex gap-4 overflow-x-auto scroll-smooth px-4">
      {CONTENTS.map((product, idx) => (
        <div key={idx} className="w-[80%] sm:w-[60%] md:w-[40%] flex-shrink-0">
          <ProductListCard
            img={product.img}
            name={product.name}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
}

export function ProductListCard({ img, name, price }) {
  return (
    <div className="h-[50vh] flex flex-col max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="bg-cover bg-landscape h-[60%] overflow-hidden">
        <img src={img} alt={name} className="object-cover w-full h-full" />
      </div>

      <div className="w-2/3 p-4 h-40%">
        <h1 className="text-2xl font-bold text-gray-900">Tomorow</h1>
        <p className="mt-2 text-sm text-gray-600">
          You can&#x27;t buy your future, but you can do it. Money is nothing,
          you&#x27;r everything.
        </p>
        <div className="flex mt-2 item-center">
          <svg
            className="w-5 h-5 text-gray-700 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
          </svg>
          <svg
            className="w-5 h-5 text-gray-700 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
          </svg>
          <svg
            className="w-5 h-5 text-gray-700 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
          </svg>
          <svg
            className="w-5 h-5 text-gray-500 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
          </svg>
          <svg
            className="w-5 h-5 text-gray-500 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
          </svg>
        </div>
        <div className="flex justify-between mt-3 item-center">
          <h1 className="text-xl font-bold text-gray-700">$220</h1>
          <button className="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded">
            Add to Card
          </button>
        </div>
      </div>
    </div>
  );
}
const CONTENTS = [
  {
    img: "https://img.kwcdn.com/product/fancy/bc5a4ae4-896d-4bc5-832d-c9dfe7854251.jpg?imageView2/2/w/800/q/70/format/webp",
    name: "Impresora 3D de nivel de entrada EASYTHREED",
    price: "$200",
  },
  {
    img: "https://www.material-tailwind.com/image/product-3.png",
    name: "Tweed Suit",
    price: "$2,300",
  },
  {
    img: "https://www.material-tailwind.com/image/product-5.png",
    name: "Premium Suit",
    price: "$1,240",
  },
  {
    img: "https://www.material-tailwind.com/image/product-7.png",
    name: "Modern Suit",
    price: "$2,100",
  },
  {
    img: "https://www.material-tailwind.com/image/product-8.png",
    name: "Classic Suit",
    price: "$1,900",
  },
];
