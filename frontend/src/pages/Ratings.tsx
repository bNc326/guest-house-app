import React, { useLayoutEffect, useContext, useState } from "react";
import RatingCard from "components/RatingComponents/RatingCard";
import RatingOverview from "components/RatingComponents/RatingOverview";
import {
  json,
  LoaderFunctionArgs,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import { RatingsDetails } from "models/Ratings";
import { HotelContext } from "context/HotelContextProvider";
const Ratings = () => {
  const data = useRouteLoaderData("rating") as RatingsDetails[];
  const hotelCtx = useContext(HotelContext);
  const [searchParams] = useSearchParams();
  const [hotelName, setHotelName] = useState<string>();

  useLayoutEffect(() => {
    const findHotelName = () => {
      const hotel = hotelCtx.hotels.find(
        (hotel) => hotel._id === searchParams.get("hotel")
      );
      setHotelName(hotel?.hotelName);
    };
    const cleanup = setTimeout(() => {
      findHotelName();
    }, 100);

    return () => clearTimeout(cleanup);
  }, [hotelCtx.hotels]);
  return (
    <section className="guest-house-bg flex min-h-[100%] justify-center p-4 pt-20">
      <div className="w-[1366px] flex flex-wrap h-max gap-4 ">
        <RatingOverview
          data={data}
          hotelName={hotelName ? hotelName : ""}
          hotelId={searchParams.get("hotel")}
        />
        {data.length ? (
          data.map((rating) => (
            <RatingCard
              key={rating._id}
              name={rating.anonymus ? "anonymus" : rating.name}
              rating={rating.rating}
              createdAt={rating.createdAt}
              message={rating.message}
              positives={rating.positives}
              negatives={rating.negatives}
            />
          ))
        ) : (
          <p className="text-center w-full font-semibold text-dynamicDesc">
            Még nincsen értékelés
          </p>
        )}
      </div>
    </section>
  );
};

export default Ratings;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const hotelQuery = request.url.split("hotel=")[1];
  const url = process.env.REACT_APP_BACKEND_API as string;
  const response = await fetch(`${url}/ratings?hotel=${hotelQuery}`);
  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  } else {
    return response;
  }
}
