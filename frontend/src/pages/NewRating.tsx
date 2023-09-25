import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import RatingWithPhone from "components/UI/svg/RatingWithPhone";
import {
  Rating,
  TextInput,
  Textarea,
  Label,
  Checkbox,
  Alert,
} from "flowbite-react";
import { InputValidate } from "models/Ratings";
import RatingCard from "components/RatingComponents/RatingCard";
import { MdWarning, MdDone } from "react-icons/md";

interface Star {
  value: number;
  filled: boolean;
  label: string;
}

const NewRating = () => {
  const [inputValidate, setInputValidate] = useState<InputValidate>({
    name: {
      pattern: /^[\s\S]{2,}$/,
      value: "",
      valid: false,
      firstTouch: false,
      error: "Adj meg egy nevet!",
      required: true,
    },
    email: {
      pattern: /^\S+@\S+\.\S+$/,
      value: "",
      valid: false,
      firstTouch: false,
      error: "Adj meg egy érvényes email címet!",
      required: true,
    },
    message: {
      pattern: /^[\s\S]{2,}$/,
      value: "",
      valid: false,
      firstTouch: false,
      error: "Adj meg üzenetet!",
      required: true,
    },
    positives: {
      value: "",
      valid: true,
      required: false,
    },
    negatives: {
      value: "",
      valid: true,
      required: false,
    },
    rating: {
      value: "",
      valid: false,
      firstTouch: false,
      error: "Értékeld a szolgáltatást a csilagok segítségével!",
      required: true,
    },
    anonymus: {
      checked: false,
      required: false,
    },
    privacy: {
      checked: false,
      firstTouch: false,
      error: "El kell fogadni az adatvédelmi irányelveket!",
      required: true,
    },
  });
  const [stars, setStars] = useState<Star[]>([
    {
      value: 1,
      filled: false,
      label: "nagyon rossz",
    },
    {
      value: 2,
      filled: false,
      label: "rossz",
    },
    {
      value: 3,
      filled: false,
      label: "semleges",
    },
    {
      value: 4,
      filled: false,
      label: "jó",
    },
    {
      value: 5,
      filled: false,
      label: "nagyon jó",
    },
  ]);
  const [searchParams] = useSearchParams();
  const [sendSuccess, setSendSuccess] = useState<null | boolean>(null);
  const navigate = useNavigate();
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const cleanup = setTimeout(() => {
      if (!searchParams.get("hotel")) {
        navigate("/vendeghazak");
      }
    });
    return () => clearTimeout(cleanup);
  }, []);

  const handleChangeInput = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    )
      return;

    const value = e.target.value.trim();
    const name = e.target.name;

    const testInput = () => {
      if (inputValidate[name].required && inputValidate[name].pattern) {
        const testValid = inputValidate[name].pattern.test(value);
        testValid
          ? setInputValidate((prev) => {
              return { ...prev, [name]: { ...prev[name], valid: true } };
            })
          : setInputValidate((prev) => {
              return { ...prev, [name]: { ...prev[name], valid: false } };
            });
      }
    };

    if (name === "anonymus" || name === "privacy") {
      setInputValidate((prev) => ({
        ...prev,
        [name]: { ...prev[name], checked: !prev[name]?.checked },
      }));
      return;
    }
    setInputValidate((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: value },
    }));
    testInput();
  };

  const handleBlurInput = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    )
      return;
    const value = e.target.value.trim();
    const name = e.target.name;

    const testInput = () => {
      if (inputValidate[name].required && inputValidate[name].pattern) {
        const testValid = inputValidate[name].pattern.test(value);
        testValid
          ? setInputValidate((prev) => {
              return { ...prev, [name]: { ...prev[name], valid: true } };
            })
          : setInputValidate((prev) => {
              return { ...prev, [name]: { ...prev[name], valid: false } };
            });
      }
    };

    if (inputValidate[name].required) {
      setInputValidate((prev) => ({
        ...prev,
        [name]: { ...prev[name], firstTouch: true },
      }));
    }

    testInput();
  };

  const handleHoverStar = (index: number) => {
    const resetStars = () => {
      stars.map((star, starIndex) =>
        setStars((prev) => {
          const update = [...prev];
          update[starIndex].filled = false;
          return update;
        })
      );
    };
    if (!inputValidate.rating.firstTouch) {
      resetStars();
      stars.map((star, starIndex) => {
        if (starIndex <= index) {
          setStars((prev) => {
            const update = [...prev];
            update[starIndex].filled = true;
            return update;
          });
        }
      });
    }
  };

  const handleHoverEndStar = (index: number) => {
    const resetStars = () => {
      stars.map((star, starIndex) =>
        setStars((prev) => {
          const update = [...prev];
          update[starIndex].filled = false;
          return update;
        })
      );
    };
    if (!inputValidate.rating.firstTouch) {
      resetStars();
    }
  };

  const handleClickStar = (index: number, value: number) => {
    const starValue = value.toString() as string;

    const resetStars = () => {
      setInputValidate((prev) => {
        const update = { ...prev };
        update.rating.firstTouch = false;
        update.rating.valid = false;
        update.rating.value = "";
        return update;
      });
    };

    if (!inputValidate.rating.firstTouch) {
      stars.map((star, starIndex) => {
        if (starIndex <= index) {
          setStars((prev) => {
            const update = [...prev];
            update[starIndex].filled = true;
            return update;
          });
        }
      });
      setInputValidate((prev) => {
        const update = { ...prev };
        update.rating.firstTouch = true;
        update.rating.valid = true;
        update.rating.value = starValue;
        return update;
      });
    } else {
      resetStars();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const timeoutHandler = (mode: boolean) => {
      const startTimeout = () => {
        clearTimeout(timer);
        setTimer(
          setTimeout(() => {
            setSendSuccess(null);
          }, 7000)
        );
      };

      if (mode) {
        setSendSuccess(true);
      }
      if (!mode) {
        setSendSuccess(false);
      }
      startTimeout();
    };

    const getValidKeys = (): boolean => {
      for (let input in inputValidate) {
        if (inputValidate[input].required) {
          if (
            inputValidate[input].valid !== undefined &&
            !inputValidate[input].valid
          )
            return false;
          if (
            inputValidate[input].checked !== undefined &&
            !inputValidate[input].checked
          )
            return false;
        }
      }

      return true;
    };

    const setAllFirstTouch = () => {
      for (let input in inputValidate) {
        setInputValidate((prev) => ({
          ...prev,
          [input]: { ...prev[input], firstTouch: true },
        }));
      }
    };

    setAllFirstTouch();
    const isValid = getValidKeys();
    console.log(isValid);

    if (isValid) {
      const body = {
        name: inputValidate.name.value,
        email: inputValidate.email.value,
        message: inputValidate.message.value,
        positives: inputValidate.positives?.value,
        negatives: inputValidate.negatives?.value,
        rating: inputValidate.rating.value,
        anonymus: inputValidate.anonymus?.checked,
        status: 'Pending'
      };
      const url = process.env.REACT_APP_BACKEND_API as string;

      const response = await fetch(
        `${url}/ratings?hotel=${searchParams.get("hotel")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.log("error");
        timeoutHandler(false);
      } else {
        const data = await response.json();
        console.log(data);
        timeoutHandler(true);
      }
    } else {
      timeoutHandler(false);
    }
  };
  return (
    <section className="guest-house-bg flex min-h-[100%] justify-center items-center p-4 pt-20">
      <div className="w-[1366px] flex flex-col-reverse laptop:flex-row h-full justify-center gap-4 bg-palette-2 shadow-md rounded-lg p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-lg flex flex-col gap-4 justify-center"
        >
          <div className="flex flex-col w-full text-palette-2 gap-2">
            <div className="flex flex-col mobile:flex-row gap-2">
              <div className="w-full">
                <Label
                  htmlFor="name"
                  value="Név"
                  className="text-palette-4 font-semibold"
                />
                <TextInput
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChangeInput}
                  onBlur={handleBlurInput}
                  placeholder="Példa Jani"
                  color={
                    inputValidate.name?.required &&
                    inputValidate.name.firstTouch
                      ? inputValidate.name.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.name.firstTouch
                          ? inputValidate.name.valid
                            ? true
                            : false
                          : true
                      }
                      message={
                        inputValidate.name.error ? inputValidate.name.error : ""
                      }
                    />
                  }
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="email"
                  value="Email"
                  className="text-palette-4 font-semibold"
                />
                <TextInput
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChangeInput}
                  onBlur={handleBlurInput}
                  placeholder="pelda.jani@exmaple.com"
                  color={
                    inputValidate.email?.required &&
                    inputValidate.email.firstTouch
                      ? inputValidate.email.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.email.firstTouch
                          ? inputValidate.email.valid
                            ? true
                            : false
                          : true
                      }
                      message={
                        inputValidate.email.error
                          ? inputValidate.email.error
                          : ""
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full">
                <Label
                  htmlFor="message"
                  value="Jellemezd pár szóban a szolgáltatást!"
                  className="text-palette-4 font-semibold"
                />
                <Textarea
                  rows={5}
                  className="resize-y max-h-[200px] min-h-[130px]"
                  placeholder="Minden jó volt!"
                  name="message"
                  id="message"
                  onChange={handleChangeInput}
                  onBlur={handleBlurInput}
                  color={
                    inputValidate.message?.required &&
                    inputValidate.message.firstTouch
                      ? inputValidate.message.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.message.firstTouch
                          ? inputValidate.message.valid
                            ? true
                            : false
                          : true
                      }
                      message={
                        inputValidate.message.error
                          ? inputValidate.message.error
                          : ""
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col mobile:flex-row gap-2">
              <div className="w-full">
                <Label
                  htmlFor="positives"
                  value="Írd le a pozitívumoka, ha vannak!"
                  className="text-palette-4 font-semibold"
                />
                <Textarea
                  rows={5}
                  className="resize-y max-h-[200px] min-h-[130px] "
                  placeholder="Nagyon szerettem a szaunát!"
                  name="positives"
                  id="positives"
                  onChange={handleChangeInput}
                  onBlur={handleBlurInput}
                  color={
                    inputValidate.positives?.required &&
                    inputValidate.positives?.firstTouch
                      ? inputValidate.positives?.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }
                />
              </div>
              <div className="w-full h-full">
                <Label
                  htmlFor="negatives"
                  value="Írd le a negatívumokat, ha vannak!"
                  className="text-palette-4 font-semibold"
                />
                <Textarea
                  rows={5}
                  className="resize-y max-h-[200px] min-h-[130px]"
                  placeholder="Túl drága!"
                  name="negatives"
                  id="negatives"
                  onChange={handleChangeInput}
                  onBlur={handleBlurInput}
                  color={
                    inputValidate.negatives?.required &&
                    inputValidate.negatives?.firstTouch
                      ? inputValidate.negatives?.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }
                />
              </div>
            </div>
            <Rating
              className="flex flex-col items-center justify-center rounded-full"
              size={"lg"}
            >
              <div className="flex">
                {stars.map((star, index) => (
                  <Rating.Star
                    key={index}
                    filled={star.filled}
                    className={`cursor-pointer ${
                      star.filled ? "" : "fill-gray-700"
                    }`}
                    onClick={() => handleClickStar(index, star.value)}
                    onMouseOver={() => handleHoverStar(index)}
                    onMouseLeave={() => handleHoverEndStar(index)}
                  />
                ))}
              </div>
              <ErrorMessage
                success={
                  inputValidate.rating.firstTouch
                    ? inputValidate.rating.valid
                      ? true
                      : false
                    : true
                }
                message={
                  inputValidate.rating.error ? inputValidate.rating.error : ""
                }
              />
            </Rating>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <Checkbox
                  id="anonymus"
                  name="anonymus"
                  checked={inputValidate.anonymus?.checked}
                  onChange={handleChangeInput}
                  onBlur={handleBlurInput}
                  className="focus:ring-palette-4 checked:bg-palette-4"
                />
                <Label
                  htmlFor="anonymus"
                  value="Nem akarom, hogy a nevem látszódjon!"
                  className="text-palette-4 font-semibold"
                />
              </div>
              <div className="flex flex-col w-full">
                <span className="flex items-center gap-1">
                  <Checkbox
                    id="privacy"
                    name="privacy"
                    checked={inputValidate.privacy?.checked}
                    onChange={handleChangeInput}
                    onBlur={handleBlurInput}
                    color={"info"}
                    className={`focus:ring-palette-4 checked:bg-palette-4 ${
                      inputValidate.privacy.required &&
                      inputValidate.privacy?.firstTouch
                        ? inputValidate.privacy?.checked
                          ? ""
                          : "border-red-400 bg-red-600/10 focus:ring-red-600"
                        : ""
                    }`}
                  />
                  <Label
                    htmlFor="privacy"
                    value="Tudomásul vettem és elfogadom az adatvédelmi irányelveket!"
                    className="text-palette-4 font-semibold"
                  />
                </span>
                <ErrorMessage
                  success={
                    inputValidate.privacy.firstTouch
                      ? inputValidate.privacy.checked
                        ? true
                        : false
                      : true
                  }
                  message={
                    inputValidate.privacy.error
                      ? inputValidate.privacy.error
                      : ""
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-palette-3 bg-palette-4 rounded-lg p-1 font-semibold hover:bg-palette-4/70 transition-colors duration-300 ease-in-out"
            >
              Elküldés
            </button>
            {sendSuccess !== null && !sendSuccess && (
              <Alert
                icon={MdWarning}
                color={"failure"}
                className="animate__animated animate__headShake"
              >
                <span>
                  <p className="flex flex-wrap items-center gap-x-2">
                    <span className="font-semibold">Hoppááá!</span>
                    <span>Nem sikerült elküldeni az űrlapot!</span>
                  </p>
                </span>
              </Alert>
            )}
            {sendSuccess !== null && sendSuccess && (
              <Alert
                icon={MdDone}
                color={"success"}
                className="animate__animated animate__jello"
              >
                <span>
                  <p className="flex flex-wrap items-center gap-x-2">
                    <span className="font-semibold">Siker!</span>
                    <span className="flex gap-2 items-center">
                      Sikeresen elküldtük az értékelést!
                    </span>
                  </p>
                </span>
              </Alert>
            )}
          </div>
          <div className="w-full">
            <h2 className="font-semibold">Előnézet</h2>
            <RatingCard
              className="mobile:max-w-full"
              name={
                inputValidate.anonymus?.checked
                  ? "anonymus"
                  : inputValidate.name.value.length <= 0
                  ? "Példa név"
                  : inputValidate.name.value
              }
              message={
                inputValidate.message.value.length <= 0
                  ? "Nincs még üzenet"
                  : inputValidate.message.value
              }
              positives={inputValidate.positives?.value}
              negatives={inputValidate.negatives?.value}
              rating={Number(inputValidate.rating.value)}
              createdAt={new Date().getTime().toLocaleString()}
            />
          </div>
        </form>
        <div className="w-full flex justify-center items-center">
          <RatingWithPhone />
        </div>
      </div>
    </section>
  );
};

export default NewRating;

export const ErrorMessage: React.FC<{ success: boolean; message: string }> = ({
  message,
  success,
}) => {
  return (
    <>
      {!success && (
        <span className=" text-red-600 text-dynamicSmall font-semibold">
          <span className="font-bold">Hoppá!</span> {message}
        </span>
      )}
    </>
  );
};
