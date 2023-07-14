import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const [countdown, setCountdown] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = setInterval(() => {
      if (countdown !== 0) {
        setCountdown((prev) => prev - 1);
      } else {
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(cleanup);
  });
  return (
    <section className="guest-house-bg h-screen w-full flex items-center justify-center">
      <div className="text-dynamicTitle2 flex flex-col gap-2 items-center relative1 pointer-events-none">
        <span className="font-semibold text-[15rem] text-palette-4">
          Hopááá..
        </span>
        <span className="font-bold text-[50rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-palette-4/30">
          404
        </span>
        <span className="text-dynamicTitle2 text-calendar">
          Az oldal nem található!
        </span>
        <span className="text-dynamicTitle3 text-calendar">
          {countdown} másodperc múlva visszairányítunk!
        </span>
      </div>
    </section>
  );
};

export default Error;
