import React from "react";
import DevelopmentSvg from "components/UI/svg/DevelopmentSvg";

const Development = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-30px)]">
      <div className="h-full w-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-5xl font-bold text-black text-center flex items-end justify-center">
          Fejlesztés alatt..
        </h2>
        <DevelopmentSvg />
      </div>
    </section>
  );
};

export default Development;
