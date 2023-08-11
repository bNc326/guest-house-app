import React, { useState, useRef } from "react";
import GuestHouseTabs from "./GuestHouseTabs";
import { GuestHouseModel } from "../../models/GuestHouseModel";
import { cloneDeep } from "lodash";
import Form from "../Form/Form";
import { InputValidator } from "../../models/Form/Form";
import { v4 as uuid } from "uuid";
import { Service } from "../../models/GuestHouseModel";
const EditGuestHouseForm: React.FC<{
  data: GuestHouseModel;
}> = (props) => {
  const data = props.data;
  const inputData: InputValidator = {
    hotelName: {
      pattern: /^[\s\S]{2,}$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy nevet!",
      value: data.hotelName,
    },
    price: {
      pattern: /^[1-9]+(\d{1,})?$/,
      valid: true,
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
      valid: true,
      firstTouch: false,
      error: "Add meg a szobák számát!",
      value: data.roomAmount,
    },
    maxPersonAmount: {
      pattern: /^[1-9]+(\d{1,})?$/,
      valid: true,
      firstTouch: false,
      error: "Add meg a maximum férőhelyek számát!",
      value: data.maxPersonAmount,
    },
    description: {
      pattern: /^[\s\S]{2,}$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy leírást! (min 2 karakter)",
      value: data.description,
    },
    country: {
      pattern: /^[\s\S]{2,}$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy országot!",
      value: data.country,
    },
    postalCode: {
      pattern: /^\d{1,}$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy irányítószámot!",
      value: data.postalCode,
    },
    city: {
      pattern: /[\s\S]{2,}/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy várost/falut!",
      value: data.city,
    },
    street: {
      pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy utca/házszámot!",
      value: data.street,
    },
    NTAK: {
      pattern: /^(?:MA)[0-9]{8,10}$/,
      valid: true,
      firstTouch: false,
      error: "Add meg az NTAK regisztrációd számát! pl: MA12345678",
      value: data.NTAK,
    },
  };
  const [inputValidate, setInputValidate] = useState<InputValidator>(
    cloneDeep(inputData)
  );
  const [services, setServices] = useState<Service[]>([
    {
      id: uuid(),
      value: "Étterem 500m",
      icon: "MdRestaurant",
      hidden: false,
    },
  ]);
  return (
    <Form
      id={data._id}
      inputs={{ input: inputValidate, setInput: setInputValidate }}
      sendAction={{ endpoint: "hotels", method: "PUT" }}
      withoutHotelQuery
    >
      {(props) => (
        <GuestHouseTabs
          inputValidate={inputValidate}
          changeInputHandler={props.handleChange}
          inputBlurHandler={props.handleBlur}
          services={services}
          setServices={setServices}
        />
      )}
    </Form>
  );
};

export default EditGuestHouseForm;
