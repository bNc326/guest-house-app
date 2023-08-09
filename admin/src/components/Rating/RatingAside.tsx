import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Rating, Textarea, Button, Label } from "flowbite-react";
import { MdSave, MdClose } from "react-icons/md";
import Form from "../Form/Form";
import { InputValidator } from "../../models/Form/Form";
import { Rating as RatingModel } from "../../models/Rating";
import { ASIDE_ACTION } from "../../models/Aside/Aside";
import { HotelContext } from "../../context/HotelContextProvider";
import { format } from "date-fns";
import { RefreshContext } from "../../context/RefreshContextProvider";
import { ASIDE_ACTION_TYPE } from "../../models/Aside/Aside";

interface Props {
  id: string;
  isShow: boolean;
  dispatchFn: React.Dispatch<ASIDE_ACTION>;
}

const RatingAside: React.FC<Props> = ({ id, isShow, dispatchFn }) => {
  const [data, setData] = useState<RatingModel>();
  const [star, setStar] = useState<React.ReactNode[]>([]);
  const [inputValidate, setInputValidate] = useState<InputValidator>({
    message: {
      pattern: /^[\s\S]{1,}/,
      valid: true,
      value: "",
      firstTouch: false,
      error: "Ki kell tölteni az üzenet mezőt!",
    },
    positives: {
      pattern: null,
      valid: true,
      value: "",
      firstTouch: false,
      error: "Igen",
    },
    negatives: {
      pattern: null,
      valid: true,
      value: "",
      firstTouch: false,
      error: "Igen",
    },
  });
  const hotelCtx = useContext(HotelContext);

  useEffect(() => {
    const fetchRating = async () => {
      const url = process.env.REACT_APP_BACKEND_API as string;

      const response = await fetch(
        `${url}/ratings/${id}?hotel=${hotelCtx.hotelId}`
      );

      if (!response.ok) {
        console.log("error");
      } else {
        const data: RatingModel = await response.json();
        renderStar(data.rating);
        setData(data);
        setInputValidate((prev) => {
          const update = { ...prev };
          update.message.value = data.message;
          update.positives.value = data.positives ? data.positives : "";
          update.negatives.value = data.negatives ? data.negatives : "";
          return update;
        });
      }
    };
    const cleanup = setTimeout(() => {
      if (!id || !hotelCtx.hotelId) return;
      setStar([]);
      fetchRating();
    }, 100);
    return () => clearTimeout(cleanup);
  }, [id]);

  useLayoutEffect(() => {
    const cleanup = setTimeout(() => {
      if (!isShow) setData(undefined);
    }, 100);
    return () => clearTimeout(cleanup);
  }, [isShow]);

  const renderHotelName = (): React.ReactNode => {
    const hotel = hotelCtx.hotels?.find((hotel) => hotel._id === data?.hotel);
    return hotel ? hotel.hotelName : "Nincs ilyen";
  };

  const renderStar = (rating: number) => {
    const updateStar = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        updateStar.push(<Rating.Star filled />);
      } else {
        updateStar.push(<Rating.Star className="fill-gray-700" />);
      }
    }
    setStar(updateStar);
  };
  return (
    <>
      {isShow && data && (
        <aside className="w-full tablet:w-1/3 absolute bg-white/50 backdrop-blur-sm top-0 right-0 desktop:static desktop:pr-4">
          <Form
            id={data._id}
            inputs={{ input: inputValidate, setInput: setInputValidate }}
            sendAction={{
              endpoint: "ratings",
              method: "PUT",
              callBack: () => dispatchFn({ type: ASIDE_ACTION_TYPE.HIDE }),
            }}
            acceptAction={{
              endpoint: "ratings",
              initialStatus: data.status,
              id: data._id,
            }}
            className="desktop:w-full"
          >
            {({ handleChange, handleBlur }) => (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center ">
                  <h2 className="text-dynamicDesc">Értékelés kezelés</h2>
                  <MdClose
                    size={20}
                    onClick={() => dispatchFn({ type: ASIDE_ACTION_TYPE.HIDE })}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-1 w-full">
                    <div>
                      <span className="text-dynamicMedium">Név</span>
                      <h3 className="text-dynamicMedium font-semibold">
                        {data.name}
                      </h3>
                    </div>
                    <div>
                      <span className="text-dynamicMedium">Kelt</span>
                      <h3 className="text-dynamicMedium font-semibold">
                        {format(new Date(data.createdAt), `p${" "}P`)}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div>
                      <span className="text-dynamicMedium">Vendégház</span>
                      <h3 className="text-dynamicMedium font-semibold">
                        {renderHotelName()}
                      </h3>
                    </div>
                    <Rating className="flex h-full items-end">
                      {star.map((star) => star)}
                    </Rating>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pb-4">
                  <div>
                    <Label htmlFor="message" value="Üzenet" />
                    <Textarea
                      rows={5}
                      className="resize-y max-h-[200px] min-h-[150px]"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={
                        inputValidate.message.value
                          ? inputValidate.message.value
                          : ""
                      }
                      name="message"
                      id="message"
                      color={`${
                        inputValidate.message.firstTouch
                          ? inputValidate.message.valid
                            ? "gray"
                            : "failure"
                          : "gray"
                      }`}
                      helperText={
                        <ErrorMessage
                          success={
                            inputValidate.message.firstTouch
                              ? inputValidate.message.valid
                                ? true
                                : false
                              : true
                          }
                          message={inputValidate.message.error}
                        />
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="positives" value="Pozitívum" />
                    <Textarea
                      rows={5}
                      className="resize-y max-h-[200px] min-h-[150px]"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={
                        inputValidate.positives.value
                          ? inputValidate.positives.value
                          : ""
                      }
                      name="positives"
                      id="positives"
                    />
                  </div>
                  <div>
                    <Label htmlFor="negatives" value="Negatívum" />
                    <Textarea
                      rows={5}
                      className="resize-y max-h-[200px] min-h-[150px]"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={
                        inputValidate.negatives.value
                          ? inputValidate.negatives.value
                          : ""
                      }
                      name="negatives"
                      id="negatives"
                    />
                  </div>
                </div>
              </div>
            )}
          </Form>
        </aside>
      )}
    </>
  );
};

export default RatingAside;

export const ErrorMessage: React.FC<{ success: boolean; message: string }> = ({
  message,
  success,
}) => {
  return (
    <>
      {!success && (
        <>
          <span className="font-medium">Hoppá!</span> {message}
        </>
      )}
    </>
  );
};
