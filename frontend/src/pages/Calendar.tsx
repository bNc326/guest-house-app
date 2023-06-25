import { useState, useContext, useEffect } from "react";
import { useRevalidator } from "react-router-dom";
import Weather from "components/CalendarComponents/Weather";
import CalendarComponent from "components/CalendarComponents/Calendar";
import { formKey } from "components/HomeComponents/Contact/Form";
import { BookingContext } from "context/BookingContextProvider";
import BookingPreview from "components/CalendarComponents/BookingPreview";
import BookingForm from "components/CalendarComponents/BookingForm";
import { cloneDeep, mapValues } from "lodash";
import { SendBookingModel } from "../models/SendBookingModel";
import HelperBox from "components/CalendarComponents/HelperBox";
import { ScaleLoader } from "react-spinners";

export interface FormInterface extends Record<string, formKey> {
  name: formKey;
  email: formKey;
  phone: formKey;
  country: formKey;
  address: formKey;
  city: formKey;
  postalCode: formKey;
  adults: formKey;
  children: formKey;
}
const Calendar = () => {
  const revalidator = useRevalidator();
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<FormInterface>({
    name: {
      value: "",
      valid: false,
      error: "Adj meg egy vezetéknevet!",
      firstTouch: false,
      pattern: /^(\S\D{1,})$/,
    },
    email: {
      value: "",
      valid: false,
      error: "Adj meg egy érvényes emailt!",
      firstTouch: false,
      pattern: /^\S+@\S+\.\S+$/,
    },
    phone: {
      value: "",
      valid: false,
      error: "Adj meg egy érvényes telefonszámot!",
      firstTouch: false,
      pattern: /^\+?[0-9][0-9]{10,10}$/,
    },
    country: {
      value: "",
      valid: false,
      error: "Adj meg egy országot!",
      firstTouch: false,
      pattern: /^(\S\D{1,})$/,
    },
    address: {
      value: "",
      valid: false,
      error: "Adj meg egy címet!",
      firstTouch: false,
      pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
    },
    city: {
      value: "",
      valid: false,
      error: "Adj meg egy várost/falut!",
      firstTouch: false,
      pattern: /^(\S\D{1,})$/,
    },
    postalCode: {
      value: "",
      valid: false,
      error: "Adj meg egy irányítószámot!",
      firstTouch: false,
      pattern: /^\d{4,}$/,
    },
    adults: {
      value: 0,
      type: "number",
      valid: false,
      error: "Adja meg a felnőttek számát!",
      firstTouch: false,
      pattern: /^[1-9]{1,}$/,
    },
    children: {
      value: 0,
      type: "number",
      valid: true,
      error: "Adja meg gyermekeinek számát!",
      firstTouch: false,
      pattern: /^[0-9]{1,}$/,
    },
  });
  const [backup, setBackup] = useState(cloneDeep(formInput));
  const bookingCtx = useContext(BookingContext);

  const inputChangeHandler = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }

    const type = e.target.dataset.key as string;
    const inputValue = e.target.value as string;

    setFormInput((prevState) => {
      return {
        ...prevState,
        [type]: { ...prevState[type], firstTouch: true },
      };
    });

    setFormInput((prevState) => {
      return {
        ...prevState,
        [type]: { ...prevState[type], value: inputValue },
      };
    });
    if (formInput[type].pattern) {
      if (formInput[type].pattern?.test(inputValue)) {
        setFormInput((prevState) => {
          return {
            ...prevState,
            [type]: { ...prevState[type], valid: true },
          };
        });
      } else {
        setFormInput((prevState) => {
          return {
            ...prevState,
            [type]: { ...prevState[type], valid: false },
          };
        });
      }
    }
  };

  const inputBlurHandler = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }

    const type = e.target.dataset.key as string;

    if (!formInput[type].firstTouch) {
      setFormInput((prevState) => {
        return {
          ...prevState,
          [type]: { ...prevState[type], firstTouch: true },
        };
      });
    }
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormInput((prev) => {
      const inputs = { ...prev };
      for (let input in inputs) {
        inputs[input].firstTouch = true;
      }
      return inputs;
    });

    const resetData = () => {
      setFormInput(backup);
      bookingCtx.hideFormHandler();
      revalidator.revalidate();
    };

    const getValidKeys = (obj: FormInterface) => {
      const keys = mapValues(obj, "valid");

      for (let key in keys) {
        if (!keys[key]) {
          return false;
        }
      }
      return true;
    };

    const valid = getValidKeys(formInput);

    if (valid) {
      setIsLoading(true);
      const personsAmount =
        Number(formInput.adults.value as number) +
        Number(formInput.children.value as number);
      const bookingBody: SendBookingModel = {
        price: {
          EUR: bookingCtx.price.EUR,
          HUF: bookingCtx.price.HUF,
        },
        costumer: {
          address: {
            country: formInput.country.value as string,
            postalCode: formInput.postalCode.value as number,
            city: formInput.city.value as string,
            street: formInput.address.value as string,
          },
          name: formInput.name.value as string,
          email: formInput.email.value as string,
          phone: formInput.phone.value as string,
        },
        startDate: bookingCtx.date.firstDate,
        endDate: bookingCtx.date.endDate,
        nightAmount: bookingCtx.nightAmount,
        personsAmount: personsAmount,
        status: "Pending",
      };

      const url = `${process.env.REACT_APP_BACKEND_API}/booking`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingBody),
      });
      if (!response.ok) {
        console.log("error");
      } else {
        const data = await response.json();
        setIsLoading(false);
        resetData();
      }
    }
  };

  const onCloseHandler = () => {
    bookingCtx.hideFormHandler();
    setFormInput(backup);
    revalidator.revalidate();
  };


  return (
    <>
      <section className="flex flex-col-reverse gap-8 justify-center items-center py-32 h-full min-h-screen bg-palette-3">
        {bookingCtx.isShowForm && (
          <BookingPreview bookingCtx={bookingCtx}>
            <BookingForm
              formInput={formInput}
              inputChangeHandler={inputChangeHandler}
              inputBlurHandler={inputBlurHandler}
              formSubmitHandler={formSubmitHandler}
              formLoading={isLoading}
              onCloseHandler={onCloseHandler}
            />
          </BookingPreview>
        )}
        {!bookingCtx.isShowForm && (
          <>
            <HelperBox />
            <div className="relative flex flex-col laptop:flex-row gap-16 laptop:gap-8 w-11/12 rounded-3xl max-w-[1920px] overflow-hidden">
              {/* <Weather  /> */}

              {isSelecting && (
                <div className="w-full h-full bg-black/30 absolute top-0 left-0 z-20 flex items-center justify-center">
                  <ScaleLoader loading color="#E6CCB2" />
                </div>
              )}

              <CalendarComponent
                isSelecting={isSelecting}
                setIsSelecting={setIsSelecting}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Calendar;

export const Separator: React.FC<{ title: string }> = (props) => {
  return (
    <div className="flex items-center justify-center w-full gap-4 whitespace-nowrap text-palette-2 font-medium text-dynamicDesc">
      <span className="w-full h-[1px] bg-palette-2/50"></span>
      {props.title}
      <span className="w-full h-[1px] bg-palette-2/50"></span>
    </div>
  );
};
