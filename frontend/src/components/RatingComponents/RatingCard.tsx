import { Rating } from "flowbite-react";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  ComponentProps,
} from "react";
import { MdPerson, MdCheckCircle, MdError, MdMessage } from "react-icons/md";
import { BsIncognito } from "react-icons/bs";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import hu from "timeago.js/lib/lang/hu";

interface Props extends ComponentProps<any> {
  name: string;
  rating: number;
  createdAt: string;
  message: string;
  positives?: string;
  negatives?: string;
}

const RatingCard: React.FC<Props> = ({
  name,
  rating,
  createdAt,
  message,
  positives,
  negatives,
  className,
}) => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    const cleanup = setTimeout(() => timeago.register("hu-HU", hu), 100);
    return () => clearTimeout(cleanup);
  }, []);

  useLayoutEffect(() => {
    const renderStars = () => {
      setStars([]);
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
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
      renderStars();
    }, 100);

    return () => clearTimeout(cleanup);
  }, [rating]);
  timeago.register("hu-HU", hu);
  return (
    <div
      className={`flex flex-col w-full mobile:max-w-[calc(50%-1rem/2)] bg-palette-2 shadow-lg h-max rounded-lg overflow-hidden ${className}`}
    >
      <div className="flex justify-between items-center bg-palette-3/50 p-4">
        <div className="flex gap-2 items-center">
          <span className="shadow-sm rounded-full p-1 bg-palette-2">
            {name === "anonymus" ? (
              <BsIncognito size={48} />
            ) : (
              <MdPerson size={48} />
            )}
          </span>

          <div className="flex flex-col">
            <h3 className="font-semibold text-dynamicList">{name}</h3>
            <div className="flex items-center gap-1">
              <Rating>{stars && stars.map((star) => star)}</Rating>
              <small className="font-semibold text-dynamicSmall">
                ({rating.toFixed(1)})
              </small>
            </div>
          </div>
        </div>
        <div>
          <small className="text-dynamicMedium font-semibold">
            <TimeAgo datetime={createdAt} locale="hu-HU" />
          </small>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-col bg-palette-4/20 p-2 rounded-lg gap-1">
          <span className="flex gap-1 items-center bg-palette-4 font-semibold rounded-full text-white w-max px-2">
            <MdMessage /> <span className="text-dynamicMedium">Üzenet</span>
          </span>
          <p className="text-dynamicMedium text-palette-4 font-semibold break-words whitespace-pre-wrap">
            {message}
          </p>
        </div>
        {positives && (
          <div className="flex flex-col bg-green-600/20 p-2 rounded-lg gap-1">
            <span className="flex gap-1 items-center bg-green-600 font-semibold rounded-full text-white w-max px-2">
              <MdCheckCircle />{" "}
              <span className="text-dynamicMedium">Pozitív</span>
            </span>
            <p className="text-dynamicMedium text-green-600 font-semibold break-words whitespace-pre-wrap">
              {positives}
            </p>
          </div>
        )}
        {negatives && (
          <div className="flex flex-col bg-red-600/20 p-2 rounded-lg gap-1">
            <span className="flex gap-1 items-center bg-red-600 font-semibold rounded-full text-white w-max px-2">
              <MdError /> <span className="text-dynamicMedium">Negatív</span>
            </span>
            <p className="text-dynamicMedium text-red-600 font-semibold break-words whitespace-pre-wrap">
              {negatives}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingCard;
