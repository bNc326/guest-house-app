import React, { useState, useLayoutEffect } from "react";
import { GiToken } from "react-icons/gi";
import { Label, TextInput, Button } from "flowbite-react";
import { FaSave } from "react-icons/fa";
import EditBookingTabs from "./EditBookingTabs";
import { BookingDateObject } from "../../models/Booking/BookingDate";
import { cloneDeep } from "lodash";
import { ClipLoader } from "react-spinners";
import Form from "../Form/Form";
import { InputValidator } from "../../models/Form/Form";
const EditBookingForm: React.FC<{
  data: BookingDateObject;
}> = (props) => {
  const data = props.data;
  const [inputValidate, setInputValidate] = useState<InputValidator>(
    cloneDeep({
      startDate: {
        pattern: null,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.startDate,
      },
      endDate: {
        pattern: null,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.endDate,
      },
      nightAmount: {
        pattern: /^[1-9]{1,}[0-9]?$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.nightAmount,
      },
      personsAmount: {
        pattern: /^[1-9]{1,}[0-9]?$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.personsAmount,
      },
      name: {
        pattern: /^(\S\D{1,})$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.name,
      },
      email: {
        pattern: /^\S+@\S+\.\S+$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.email,
      },
      phone: {
        pattern: /^\+?[0-9][0-9]{10,10}$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.phone,
      },
      country: {
        pattern: /^(\S\D{1,})$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.country,
      },
      postalCode: {
        pattern: /^\d{4,}$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.postalCode,
      },
      city: {
        pattern: /^(\S\D{1,})$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.city,
      },
      street: {
        pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.street,
      },
      HUF: {
        pattern: null,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.HUF,
      },
      EUR: {
        pattern: null,
        valid: true,
        firstTouch: false,
        error: "hiba!",
        value: data.EUR,
      },
    })
  );

  return (
    <>
      <Form
        id={data._id}
        inputs={{ input: inputValidate, setInput: setInputValidate }}
        sendAction={{ endpoint: "booking", method: "PUT" }}
      >
        {(props) => (
          <EditBookingTabs
            inputChangeHandler={props.handleChange}
            inputValidate={inputValidate}
            inputBlurHandler={props.handleBlur}
          />
        )}
      </Form>
    </>
  );
};

export default EditBookingForm;

export const ButtonArea: React.FC<{
  data: BookingDateObject;
  objectsEqual: boolean;
  loading: boolean;
  resetFormHandler: (e: React.MouseEvent) => void;
}> = ({ data, objectsEqual, loading, resetFormHandler }) => {
  return (
    <div className="flex gap-2 flex-col-reverse justify-between items-end">
      <div className="flex gap-2 w-full">
        <Button
          disabled={objectsEqual}
          type="submit"
          className="w-full laptop:w-[unset] transition-all ease-in-out duration-300"
        >
          <span className="flex gap-1 items-center">
            {loading ? (
              <ClipLoader loading={true} color={"white"} size={"1rem"} />
            ) : (
              <FaSave />
            )}
            Mentés
          </span>
        </Button>
        <button
          onClick={resetFormHandler}
          type="button"
          disabled={objectsEqual}
          className="w-full px-4 rounded-lg laptop:w-[unset] border-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-30 transition-all ease-in-out duration-300"
        >
          Elvétés
        </button>
      </div>
      <div className="w-full">
        <Label htmlFor="booking-id" value="Fogalás azonosító" />
        <TextInput
          id="booking-id"
          disabled
          rightIcon={GiToken}
          value={data._id}
        />
      </div>
    </div>
  );
};
