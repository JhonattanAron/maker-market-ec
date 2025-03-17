"use client";

import { Button, Typography } from "@material-tailwind/react";

export function HomeWidget(params) {
  return (
    <section className="m-10">
      <div className="bg-fondo2 shadow-xl p-10 rounded-l-xl border border-blue-gray-100 bg-[url('/image/gradient-bg-1.png')] rounded-xl bg-no-repeat lg:bg-contain bg-cover bg-right">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold mb-2"
        >
          Maker Market
        </Typography>
        <Typography variant="h3" color="blue-gray">
          {params.title}
        </Typography>
        <Typography className="mt-2 mb-6 !text-base font-normal text-gray-900">
          {params.description}
        </Typography>
        <Button
          variant="outlined"
          className="bg-primary text-white shadow-xl flex-shrink-0"
        >
          {params.button}
        </Button>
      </div>
    </section>
  );
}
export default HomeWidget;
