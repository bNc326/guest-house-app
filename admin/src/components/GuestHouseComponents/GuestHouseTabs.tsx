import React, { useState } from "react";
import { Tabs, TextInput, Label, Textarea, Checkbox } from "flowbite-react";
import { MdDriveFileRenameOutline, MdHotel } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { InputValidator } from "../../models/Form/Form";
import * as MaterialIcon from "react-icons/md";
import ServiceModal from "../modal/ServicesComponent/ServiceModal";
import { Service } from "../../models/GuestHouseModel";
import HotelService from "./HotelService";

interface ReactProps {
  inputValidate: InputValidator;
  changeInputHandler: (e: React.ChangeEvent) => void;
  inputBlurHandler: (e: React.ChangeEvent) => void;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const GuestHouseTabs: React.FC<ReactProps> = (props) => {
  const {
    inputValidate,
    changeInputHandler,
    inputBlurHandler,
    services,
    setServices,
  } = props;

  return (
    <Tabs.Group style="underline">
      <Tabs.Item title="Vendégház adatok">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col mobile:flex-row w-full gap-4">
            <div className="w-full">
              <TextInput
                type="text"
                addon={<MdDriveFileRenameOutline size="1.50rem" />}
                value={inputValidate.hotelName.value}
                onChange={changeInputHandler}
                onBlur={inputBlurHandler}
                name="hotelName"
                placeholder="Vendégház név"
                color={`${
                  inputValidate.hotelName.firstTouch
                    ? inputValidate.hotelName.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.hotelName.firstTouch
                        ? inputValidate.hotelName.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.hotelName.error}
                  />
                }
              />
            </div>
          </div>
          <div className="flex flex-col mobile:flex-row w-full gap-4">
            <div className="w-full">
              <Label htmlFor="price" value="Alap ár" />
              <TextInput
                type="text"
                addon={<span className="font-bold">Ft</span>}
                value={inputValidate.price.value}
                onChange={changeInputHandler}
                onBlur={inputBlurHandler}
                name="price"
                placeholder="40000"
                id="price"
                color={`${
                  inputValidate.price.firstTouch
                    ? inputValidate.price.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.price.firstTouch
                        ? inputValidate.price.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.price.error}
                  />
                }
              />
            </div>
            <div className="w-full">
              <Label htmlFor="discountPrice" value="Akciós ár" />
              <TextInput
                type="text"
                addon={<span className="font-bold">Ft</span>}
                value={inputValidate.discountPrice.value}
                onChange={changeInputHandler}
                onBlur={inputBlurHandler}
                name="discountPrice"
                placeholder="40000"
                id="discountPrice"
              />
            </div>
          </div>
          <div className="flex flex-col mobile:flex-row w-full gap-4">
            <div className="w-full">
              <Label htmlFor="roomAmount" value="Szobák száma" />
              <TextInput
                icon={MdHotel}
                value={inputValidate.roomAmount.value}
                name="roomAmount"
                onChange={changeInputHandler}
                onBlur={inputBlurHandler}
                type="number"
                id="roomAmount"
                color={`${
                  inputValidate.roomAmount.firstTouch
                    ? inputValidate.roomAmount.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.roomAmount.firstTouch
                        ? inputValidate.roomAmount.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.roomAmount.error}
                  />
                }
              />
            </div>
            <div className="w-full">
              <Label htmlFor="maxPersonAmount" value="Max személyek száma" />
              <TextInput
                icon={FaUsers}
                value={inputValidate.maxPersonAmount.value}
                onChange={changeInputHandler}
                onBlur={inputBlurHandler}
                name="maxPersonAmount"
                type="number"
                id="maxPersonAmount"
                color={`${
                  inputValidate.maxPersonAmount.firstTouch
                    ? inputValidate.maxPersonAmount.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.maxPersonAmount.firstTouch
                        ? inputValidate.maxPersonAmount.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.maxPersonAmount.error}
                  />
                }
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
              <Label htmlFor="NTAK" value="NTAK regisztrációs szám" />
              <TextInput
                type="text"
                addon={<span className="font-bold">NTAK</span>}
                value={inputValidate.NTAK.value}
                onChange={changeInputHandler}
                onBlur={inputBlurHandler}
                name="NTAK"
                id="NTAK"
                placeholder="MA12345678"
                color={`${
                  inputValidate.NTAK.firstTouch
                    ? inputValidate.NTAK.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.NTAK.firstTouch
                        ? inputValidate.NTAK.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.NTAK.error}
                  />
                }
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
              <Label value="Vendégház leírás" htmlFor="description" />
              <Textarea
                className="resize-none"
                rows={5}
                placeholder="Leírás.."
                id="description"
                value={inputValidate.description.value}
                onChange={changeInputHandler}
                onBlur={inputBlurHandler}
                name="description"
                color={`${
                  inputValidate.description.firstTouch
                    ? inputValidate.description.valid
                      ? "gray"
                      : "failure"
                    : "gray"
                }`}
                helperText={
                  <ErrorMessage
                    success={
                      inputValidate.description.firstTouch
                        ? inputValidate.description.valid
                          ? true
                          : false
                        : true
                    }
                    message={inputValidate.description.error}
                  />
                }
              ></Textarea>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <Label value="Ország" htmlFor="country" />
                <TextInput
                  type="text"
                  id="country"
                  value={inputValidate.country.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="country"
                  placeholder="Magyarország"
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
                />
              </div>
            </div>
            <div className="flex flex-col mobile:flex-row gap-4 w-full">
              <div className="w-full">
                <Label value="Irányítószám" htmlFor="postalCode" />
                <TextInput
                  type="text"
                  id="postalCode"
                  value={inputValidate.postalCode.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="postalCode"
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
                />
              </div>
              <div className="w-full">
                <Label value="Város" htmlFor="city" />
                <TextInput
                  type="text"
                  id="city"
                  value={inputValidate.city.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="city"
                  placeholder="Budapest"
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
                />
              </div>
              <div className="w-full">
                <Label value="Utca, házszám" htmlFor="street" />
                <TextInput
                  type="text"
                  id="street"
                  value={inputValidate.street.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="street"
                  placeholder="Petőfi Sándor utca 12"
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
                />
              </div>
            </div>
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item title="Szolgáltatás buborékok">
        <HotelService
          services={services}
          setServices={setServices}
        />
      </Tabs.Item>
    </Tabs.Group>
  );
};

export default GuestHouseTabs;

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
