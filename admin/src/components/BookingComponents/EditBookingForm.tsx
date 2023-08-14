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
  const [inputValidate, setInputValidate] = useState<InputValidator>({
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
  });

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
