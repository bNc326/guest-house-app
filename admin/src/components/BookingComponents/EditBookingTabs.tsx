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
              <TextInput
                className="w-full"
                icon={HiUser}
                data-group={"costumer"}
                data-key={"name"}
                name="name"
                value={data.costumer.name}
                color={`${
                  inputValidate.costumer.name.firstTouch
                    ? inputValidate.costumer.name.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.costumer.name.firstTouch
                        ? inputValidate.costumer.name.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.costumer.name.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
            <div className="w-full">
              <TextInput
                className="w-full"
                icon={HiMail}
                data-group={"costumer"}
                data-key={"email"}
                value={data.costumer.email}
                color={`${
                  inputValidate.costumer.email.firstTouch
                    ? inputValidate.costumer.email.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.costumer.email.firstTouch
                        ? inputValidate.costumer.email.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.costumer.email.error}
                  />
                }
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
            </div>
            <div className="w-full">
              <TextInput
                className="w-full"
                icon={HiPhone}
                data-group={"costumer"}
                data-key={"phone"}
                value={data.costumer.phone}
                color={`${
                  inputValidate.costumer.phone.firstTouch
                    ? inputValidate.costumer.phone.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.costumer.phone.firstTouch
                        ? inputValidate.costumer.phone.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.costumer.phone.error}
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
                data-group={"costumer"}
                data-depth-group={"address"}
                data-key={"country"}
                shadow={true}
                value={data.costumer.address.country}
                color={`${
                  inputValidate.costumer.address.country.firstTouch
                    ? inputValidate.costumer.address.country.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.costumer.address.country.firstTouch
                        ? inputValidate.costumer.address.country.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.costumer.address.country.error}
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
                data-group={"costumer"}
                data-depth-group={"address"}
                data-key={"postalCode"}
                type="text"
                required={true}
                shadow={true}
                value={data.costumer.address.postalCode}
                color={`${
                  inputValidate.costumer.address.postalCode.firstTouch
                    ? inputValidate.costumer.address.postalCode.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.costumer.address.postalCode.firstTouch
                        ? inputValidate.costumer.address.postalCode.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.costumer.address.postalCode.error}
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
                data-group={"costumer"}
                data-depth-group={"address"}
                data-key={"city"}
                type="text"
                required={true}
                shadow={true}
                value={data.costumer.address.city}
                color={`${
                  inputValidate.costumer.address.city.firstTouch
                    ? inputValidate.costumer.address.city.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.costumer.address.city.firstTouch
                        ? inputValidate.costumer.address.city.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.costumer.address.city.error}
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
                data-group={"costumer"}
                data-depth-group={"address"}
                data-key={"street"}
                type="text"
                required={true}
                shadow={true}
                value={data.costumer.address.street}
                color={`${
                  inputValidate.costumer.address.street.firstTouch
                    ? inputValidate.costumer.address.street.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.costumer.address.street.firstTouch
                        ? inputValidate.costumer.address.street.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.costumer.address.street.error}
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
                icon={BsCalendarDateFill}
                type="date"
                id="startDate"
                data-key={"startDate"}
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
                icon={BsCalendarDateFill}
                type="date"
                id="endDate"
                data-key={"endDate"}
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
              <Label htmlFor="nightamount" value="Éjszakák száma" />
              <TextInput
                icon={MdHotel}
                type="number"
                id="nightamount"
                data-key={"nightAmount"}
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
                icon={FaUsers}
                id="personsAmount"
                data-key={"personsAmount"}
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
                addon={<span className="font-bold">FT</span>}
                type="text"
                id="HUF"
                data-group="price"
                data-key="HUF"
                value={data.price.HUF}
                disabled
              />
            </div>
            <div className="w-full">
              <Label htmlFor="EUR" value="EUR" />
              <TextInput
                addon={<FaEuroSign />}
                id="EUR"
                data-group="price"
                data-key="EUR"
                type="text"
                value={data.price.EUR}
                disabled
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
