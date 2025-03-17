"use client";

import {
  ProductsCarrusel,
  ProductSlider,
} from "@/components/navigation/ProductsCarrusel";
import { Card, CardBody, Typography } from "@material-tailwind/react";

export function MostSell(params) {
  return (
    <section className="py-10 px-8">
      <div className="mx-auto text-center mb-16">
        <Typography className="font-medium text-lg">{params.title}</Typography>
        <Typography variant="h1" className="my-4 text-4xl">
          {params.description}
        </Typography>
        <Typography className="!font-normal text-gray-500 mx-auto max-w-2xl">
          {params.description2}
        </Typography>
      </div>
    </section>
  );
}

export default MostSell;
