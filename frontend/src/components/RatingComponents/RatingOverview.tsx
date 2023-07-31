import { Rating } from "flowbite-react";
import React, { useLayoutEffect, useState } from "react";
import CountUp from "react-countup";
import { Progress } from "flowbite-react";
import { RatingsDetails } from "models/Ratings";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";

interface Ratings {
  stars: number;
  percent: number;
  amount: number;
}

const RatingOverview: React.FC<{
  data: RatingsDetails[];
  hotelName: string;
  hotelId: string | null;
}> = ({ data, hotelName, hotelId }) => {
  const [ratings, setRatings] = useState<Ratings[]>(new Array(5));
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useLayoutEffect(() => {
    const initialRating: Ratings[] = [];
    const createInitialRating = () => {
      for (let i = 1; i <= 5; i++) {
        const newStar = {
          stars: i,
          percent: 0,
          amount: 0,
        };
        initialRating.push(newStar);
      }
    };
    const calcRatings = () => {
      const total = data.length;
      createInitialRating();

      data.map((rating) => {
        for (let i = 1; i <= 5; i++) {
          if (rating.rating === i) {
            initialRating[i - 1].amount += 1;
          }
        }
      });

      initialRating.map((rating) => {
        rating.percent = (rating.amount / total) * 100;
      });
      initialRating.reverse();
      setRatings(initialRating);
    };
    const cleanup = setTimeout(calcRatings, 100);
    return () => clearTimeout(cleanup);
  });

  useLayoutEffect(() => {
    let count: number = 0;
    const calcRatingAvg = () => {
      if (data.length !== 0) {
        const calcAvg = (): number => {
          return sum / numberCount;
        };
        const numberCount: number = data.length;
        let sum: number = 0;

        data.map((rating) => {
          sum += rating.rating;
        });

        setRatingCount(calcAvg());
        count = calcAvg();
      }
    };

    const renderStars = () => {
      setStars([]);
      for (let i = 1; i <= 5; i++) {
        if (i <= count) {
          setStars((prev) => [...prev, <Rating.Star filled />]);
        } else {
          setStars((prev) => [
            ...prev,
            <Rating.Star key={i} className="fill-gray-700" />,
          ]);
        }
      }
    };

    const cleanup = setTimeout(() => {
      calcRatingAvg();
      renderStars();
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);

  return (
    <div className="flex flex-col w-full bg-palette-2 shadow-lg h-max rounded-lg p-4 gap-4">
      <div className="flex items-center flex-col">
        <h2 className="whitespace-nowrap text-dynamicDesc font-semibold">
          {hotelName}
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-dynamicTitle3">
          <CountUp end={ratingCount} decimals={2} duration={3} />
          <span className="text-dynamicMedium">/5</span>
        </p>
        <Rating className="flex flex-col gap-1" size={"lg"}>
          <div className="flex  w-full justify-center">
            {stars && stars.map((star) => star)}
          </div>
          <div className="flex flex-col items-center w-full">
            <div className={`whitespace-nowrap text-dynamicMedium`}>
              {data.length} Értékelés
            </div>
          </div>
          <NavLink
            to={`uj?hotel=${hotelId}`}
            className="flex items-center gap-1 bg-palette-4 p-2 rounded-lg text-palette-2 font-semibold"
          >
            <MdEdit size={20} />
            Értékelés írása
          </NavLink>
        </Rating>
      </div>
      <div className="flex flex-col w-full gap-1">
        {ratings &&
          ratings.map((rating) => (
            <RatingRange
              star={rating.stars}
              progress={rating.percent}
              amount={rating.amount}
            />
          ))}
      </div>
    </div>
  );
};

export default RatingOverview;

export const RatingRange: React.FC<{
  progress: number;
  star: number;
  amount: number;
}> = ({ progress, star, amount }) => {
  return (
    <Rating className="w-full flex justify-center  gap-1 ">
      <div className=" flex w-full tablet:w-1/2 items-center justify-center gap-1">
        <span className="flex items-center w-max min-w-[35px] justify-between gap-1">
          <span className="text-dynamicMedium font-semibold">{star}</span>
          <Rating.Star className="fill-gray-700" />
        </span>
        <div className="w-full">
          <Progress
            size={"lg"}
            progress={!progress ? 0 : progress}
            className="w-full"
            color="yellow"
          />
        </div>
        <span className="text-dynamicMedium font-semibold w-full max-w-[16px] flex items-center justify-center">
          {amount}
        </span>
      </div>
    </Rating>
  );
};
