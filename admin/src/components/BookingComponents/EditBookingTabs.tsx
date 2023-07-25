import React, { useEffect, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import { Tabs, TextInput, Label, Textarea } from "flowbite-react";
import { HiUser, HiMail, HiPhone } from "react-icons/hi";
import { FaUsers, FaEuroSign } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdHotel, MdSubject } from "react-icons/md";
import { format } from "date-fns";
import { BookingDateObject } from "../../models/Booking/BookingDate";
import { InputValidate } from "./EditBookingForm";

const EditBookingTabs: React.FC<{
  data: BookingDateObject;
  inputValidate: InputValidate;
  inputChangeHandler: (e: React.ChangeEvent) => void;
  inputBlurHandler: (e: React.ChangeEvent) => void;
}> = ({ data, inputChangeHandler, inputBlurHandler, inputValidate }) => {
  return (
    <Tabs.Group style="underline">
      <Tabs.Item title={"Személyes információ"}>
        <article className="flex flex-col  gap-4">
          <div className="flex flex-col mobile:flex-row gap-4">
            <div className="w-full">
              <Label htmlFor="name" value="Név" />
              <TextInput
                className="w-full"
                name="name"
                id="name"
                type="text"
                value={data.name}
                color={`${
                  inputValidate.name.firstTouch
                    ? inputValidate.name.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.name.firstTouch
                        ? inputValidate.name.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.name.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email" value="Email" />
              <TextInput
                className="w-full"
                icon={HiMail}
                name="email"
                id="email"
                value={data.email}
                type="text"
                color={`${
                  inputValidate.email.firstTouch
                    ? inputValidate.email.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.email.firstTouch
                        ? inputValidate.email.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.email.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="phone" value="Telefonszám" />
              <TextInput
                className="w-full"
                name="phone"
                id="phone"
                type="text"
                value={data.phone}
                color={`${
                  inputValidate.phone.firstTouch
                    ? inputValidate.phone.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.phone.firstTouch
                        ? inputValidate.phone.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.phone.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor="country" value="Ország" />
              <TextInput
                id="country"
                type="text"
                required={true}
                name="country"
                shadow={true}
                value={data.country}
                color={`${
                  inputValidate.country.firstTouch
                    ? inputValidate.country.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.country.firstTouch
                        ? inputValidate.country.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.country.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
          </div>
          <div className="flex flex-col mobile:flex-row gap-4">
            <div className="w-full">
              <Label htmlFor="postalCode" value="Irányszítószám" />
              <TextInput
                id="postalCode"
                name="postalCode"
                type="text"
                required={true}
                shadow={true}
                value={data.postalCode}
                color={`${
                  inputValidate.postalCode.firstTouch
                    ? inputValidate.postalCode.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.postalCode.firstTouch
                        ? inputValidate.postalCode.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.postalCode.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="city" value="Város/falu" />
              <TextInput
                id="city"
                name="city"
                type="text"
                required={true}
                shadow={true}
                value={data.city}
                color={`${
                  inputValidate.city.firstTouch
                    ? inputValidate.city.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.city.firstTouch
                        ? inputValidate.city.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.city.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="street" value="utca/házszám" />
              <TextInput
                id="street"
                name="street"
                type="text"
                required={true}
                shadow={true}
                value={data.street}
                color={`${
                  inputValidate.street.firstTouch
                    ? inputValidate.street.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.street.firstTouch
                        ? inputValidate.street.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.street.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
          </div>
        </article>
      </Tabs.Item>
      <Tabs.Item title={"Foglalási adatok"}>
        <article className="flex flex-col gap-4">
          <div className="flex flex-col mobile:flex-row gap-4">
            <div className="w-full">
              <Label htmlFor="startDate" value="Érkezés" />
              <TextInput
                disabled
                icon={BsCalendarDateFill}
                type="date"
                id="startDate"
                name="startDate"
                value={format(new Date(data.startDate), "yyyy-MM-dd")}
                onChange={inputChangeHandler}
                min={"2022-11-13"}
                max={"2099-12-31"}
                helperText={
                  <span className="text-base">
                    Nézd meg a naptárt mielőtt megváltoztatod{": "}
                    <span className="font-bold text-blue-600">
                      <Link
                        to="https://guest-house-app.onrender.com/naptar"
                        target="_blank"
                      >
                        naptár
                      </Link>
                    </span>{" "}
                  </span>
                }
              />
            </div>
            <div className="w-full">
              <Label htmlFor="endDate" value="Távozás" />
              <TextInput
                disabled
                icon={BsCalendarDateFill}
                type="date"
                id="endDate"
                name="endDate"
                value={format(new Date(data.endDate), "yyyy-MM-dd")}
                onChange={inputChangeHandler}
                min={"2022-11-13"}
                max={"2099-12-31"}
                helperText={
                  <span className="text-base">
                    Nézd meg a naptárt mielőtt megváltoztatod{": "}
                    <span className="font-bold text-blue-600">
                      <Link
                        to="https://guest-house-app.onrender.com/naptar"
                        target="_blank"
                      >
                        naptár
                      </Link>
                    </span>{" "}
                  </span>
                }
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor="nightAmount" value="Éjszakák száma" />
              <TextInput
                disabled
                icon={MdHotel}
                type="number"
                id="nightAmount"
                name="nightAmount"
                min={0}
                value={data.nightAmount}
                color={`${
                  inputValidate.nightAmount.firstTouch
                    ? inputValidate.nightAmount.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.nightAmount.firstTouch
                        ? inputValidate.nightAmount.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.nightAmount.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="personsAmount" value="Személyek száma" />
              <TextInput
                disabled
                icon={FaUsers}
                id="personsAmount"
                name="personsAmount"
                min={0}
                type="number"
                value={data.personsAmount}
                color={`${
                  inputValidate.personsAmount.firstTouch
                    ? inputValidate.personsAmount.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.personsAmount.firstTouch
                        ? inputValidate.personsAmount.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.personsAmount.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor="HUF" value="HUF" />
              <TextInput
                disabled
                addon={<span className="font-bold">FT</span>}
                type="text"
                id="HUF"
                name="HUF"
                value={data.HUF}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="EUR" value="EUR" />
              <TextInput
                disabled
                addon={<FaEuroSign />}
                id="EUR"
                name="EUR"
                type="text"
                value={data.EUR}
              />
            </div>
          </div>
        </article>
      </Tabs.Item>
      {/* <Tabs.Item title={"Üzenet a foglalónak"}>
        <article className="flex gap-4 flex-col">
          <div className="w-full">
            <Label htmlFor="email" value="Email" />
            <TextInput
              icon={HiMail}
              type="email"
              id="email"
              placeholder="pelda@email.com"
              value={""}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="subject" value="Tárgy" />
            <TextInput
              icon={MdSubject}
              type="subject"
              id="subject"
              placeholder=""
              value={""}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="message" value="Üzenet" />
            <Textarea id="message" placeholder="" value={""} rows={6} />
          </div>
        </article>
      </Tabs.Item> */}
    </Tabs.Group>
  );
};

export default EditBookingTabs;

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
