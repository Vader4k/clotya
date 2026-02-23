import React from "react";

const Banner = () => {
  return (
    <div className="w-ful min-h-40 lg:min-h-82 shopBg flex flex-col gap-6 p-10 md:p-16">
      <h2 className="font-jost text-2xl md:text-4xl">
        Plus-Size Style for <br />
        Every Season
      </h2>
      <p className="text-sm max-w-100 font-light text-neutral-700">
        We have carefully curated all attires for every season to keep your
        comfy and beautiful.
      </p>
    </div>
  );
};

export default Banner;
