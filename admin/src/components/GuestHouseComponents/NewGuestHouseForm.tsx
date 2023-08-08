import React, { useState, useRef } from "react";
import { GuestHouseModel } from "../../models/GuestHouseModel";
import { cloneDeep } from "lodash";
import Form from "../Form/Form";
import { InputValidator } from "../../models/Form/Form";
import GuestHouseTabs from "./GuestHouseTabs";
const NewGuestHouseForm: React.FC<{}> = (props) => {
  const data: GuestHouseModel = {
    hotelName: "",
    country: "",
    postalCode: 0,
    city: "",
    street: "",
    NTAK: "",
    services: [],
    feature: [],
    price: 0,
    discountPrice: 0,
    roomAmount: 0,
    maxPersonAmount: 0,
    description: "",
  };

  const inputData: InputValidator = {
    hotelName: {
      pattern: /^[\s\S]{2,}$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy nevet!",
      value: data.hotelName,
    },
    price: {
      pattern: /^[1-9]+(\d{1,})?$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy éj/árat!",
      value: data.price,
    },
    discountPrice: {
      pattern: null,
      valid: true,
      firstTouch: false,
      error: "",
      value: data.discountPrice,
    },
    roomAmount: {
      pattern: /^[1-9]+(\d{1,})?$/,
      valid: false,
      firstTouch: false,
      error: "Add meg a szobák számát!",
      value: data.roomAmount,
    },
    maxPersonAmount: {
      pattern: /^[1-9]+(\d{1,})?$/,
      valid: false,
      firstTouch: false,
      error: "Add meg a maximum férőhelyek számát!",
      value: data.maxPersonAmount,
    },
    description: {
      pattern: /^[\s\S]{2,}$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy leírást! (min 2 karakter)",
      value: data.description,
    },
    country: {
      pattern: /^[\s\S]{2,}$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy országot!",
      value: data.country,
    },
    postalCode: {
      pattern: /^\d{1,}$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy irányítószámot!",
      value: data.postalCode,
    },
    city: {
      pattern: /[\s\S]{2,}/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy várost/falut!",
      value: data.city,
    },
    street: {
      pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy utca/házszámot!",
      value: data.street,
    },
    NTAK: {
      pattern: /^(?:MA)[0-9]{8,10}$/,
      valid: false,
      firstTouch: false,
      error: "Add meg az NTAK regisztrációd számát! pl: MA12345678",
      value: data.NTAK,
    },
  };

  const [inputValidate, setInputValidate] = useState<InputValidator>(
    cloneDeep(inputData)
  );

  const focusRef = useRef<HTMLDivElement>(null);

  return (
    <Form
      id={data._id}
      inputs={{ input: inputValidate, setInput: setInputValidate }}
      sendAction={{ endpoint: "hotels", method: "POST" }}
      withoutHotelQuery
    >
      {(props) => (
        <GuestHouseTabs
          inputValidate={inputValidate}
          changeInputHandler={props.handleChange}
          inputBlurHandler={props.handleBlur}
          ref={focusRef}
        />
      )}
    </Form>
  );
};

export default NewGuestHouseForm;
