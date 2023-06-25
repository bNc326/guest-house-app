import React, { forwardRef, useEffect, useRef } from "react";
import { useRevalidator } from "react-router-dom";
import { Tabs, TextInput, Label, Textarea } from "flowbite-react";
import {
  MdDriveFileRenameOutline,
  MdHotel,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsPlusSquare, BsTrash3, BsTools } from "react-icons/bs";
import { TbEdit, TbEditOff } from "react-icons/tb";
import { HotelsModelObject } from "../../models/Hotels/HotelsModel";
import { InputValidate } from "./EditGuestHouseForm";

interface ReactProps {
  data: HotelsModelObject;
  newListHandler: (e: React.MouseEvent) => void;
  inputValidate: InputValidate;
  deleteListHandler: (e: React.MouseEvent) => void;
  editListHandler: (e: React.MouseEvent) => void;
  changeInputHandler: (e: React.ChangeEvent) => void;
  inputBlurHandler: (e: React.ChangeEvent) => void;
}

const EditGuestHouseTabs = forwardRef(
  (props: ReactProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const {
      data,
      newListHandler,
      inputValidate,
      deleteListHandler,
      editListHandler,
      changeInputHandler,
      inputBlurHandler,
    } = props;
    return (
      <Tabs.Group className="w-full">
        <Tabs.Item title="Vendégház adatok">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col mobile:flex-row w-full gap-4">
              <div className="w-full">
                <TextInput
                  addon={<MdDriveFileRenameOutline size="1.50rem" />}
                  value={data.hotelName}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  data-key={"hotelName"}
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
              <div className="w-full">
                <TextInput
                  addon={<span className="font-bold">FT</span>}
                  value={data.price}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  data-key={"price"}
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
            </div>
            <div className="flex w-full gap-4">
              <div className="w-full">
                <Label htmlFor="roomAmount" value="Szobák száma" />
                <TextInput
                  icon={MdHotel}
                  value={data.roomAmount}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  data-key={"roomAmount"}
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
                <Label htmlFor="costumerAmount" value="Max személyek száma" />
                <TextInput
                  icon={FaUsers}
                  value={data.maxPersonAmount}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  data-key={"maxPersonAmount"}
                  type="number"
                  id="costumerAmount"
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
                <Label
                  htmlFor="NTAK_regNumber"
                  value="NTAK regisztrációs szám"
                />
                <TextInput
                  addon={<span className="font-bold">NTAK</span>}
                  value={data.impressum.NTAK_regNumber}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  data-group={"impressum"}
                  data-key={"NTAK_regNumber"}
                  id="NTAK_regNumber"
                  color={`${
                    inputValidate.impressum.NTAK_regNumber.firstTouch
                      ? inputValidate.impressum.NTAK_regNumber.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }`}
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.impressum.NTAK_regNumber.firstTouch
                          ? inputValidate.impressum.NTAK_regNumber.valid
                            ? true
                            : false
                          : true
                      }
                      message={inputValidate.impressum.NTAK_regNumber.error}
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
                  value={data.description}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  data-key={"description"}
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
                  <Label value="Ország" htmlFor="Country" />
                  <TextInput
                    id="Country"
                    value={data.impressum.country}
                    onChange={changeInputHandler}
                    onBlur={inputBlurHandler}
                    data-group={"impressum"}
                    data-key={"country"}
                    color={`${
                      inputValidate.impressum.country.firstTouch
                        ? inputValidate.impressum.country.valid
                          ? "gray"
                          : "failure"
                        : "gray"
                    }`}
                    helperText={
                      <ErrorMessage
                        success={
                          inputValidate.impressum.country.firstTouch
                            ? inputValidate.impressum.country.valid
                              ? true
                              : false
                            : true
                        }
                        message={inputValidate.impressum.country.error}
                      />
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col mobile:flex-row gap-4 w-full">
                <div className="w-full">
                  <Label value="Irányítószám" htmlFor="PostalCode" />
                  <TextInput
                    id="PostalCode"
                    value={data.impressum.postalCode}
                    onChange={changeInputHandler}
                    onBlur={inputBlurHandler}
                    data-group={"impressum"}
                    data-key={"postalCode"}
                    color={`${
                      inputValidate.impressum.postalCode.firstTouch
                        ? inputValidate.impressum.postalCode.valid
                          ? "gray"
                          : "failure"
                        : "gray"
                    }`}
                    helperText={
                      <ErrorMessage
                        success={
                          inputValidate.impressum.postalCode.firstTouch
                            ? inputValidate.impressum.postalCode.valid
                              ? true
                              : false
                            : true
                        }
                        message={inputValidate.impressum.postalCode.error}
                      />
                    }
                  />
                </div>
                <div className="w-full">
                  <Label value="Város" htmlFor="City" />
                  <TextInput
                    id="City"
                    value={data.impressum.city}
                    onChange={changeInputHandler}
                    onBlur={inputBlurHandler}
                    data-group={"impressum"}
                    data-key={"city"}
                    color={`${
                      inputValidate.impressum.city.firstTouch
                        ? inputValidate.impressum.city.valid
                          ? "gray"
                          : "failure"
                        : "gray"
                    }`}
                    helperText={
                      <ErrorMessage
                        success={
                          inputValidate.impressum.city.firstTouch
                            ? inputValidate.impressum.city.valid
                              ? true
                              : false
                            : true
                        }
                        message={inputValidate.impressum.city.error}
                      />
                    }
                  />
                </div>
                <div className="w-full">
                  <Label value="Utca, házszám" htmlFor="street" />
                  <TextInput
                    id="street"
                    value={data.impressum.street}
                    onChange={changeInputHandler}
                    onBlur={inputBlurHandler}
                    data-group={"impressum"}
                    data-key={"street"}
                    color={`${
                      inputValidate.impressum.street.firstTouch
                        ? inputValidate.impressum.street.valid
                          ? "gray"
                          : "failure"
                        : "gray"
                    }`}
                    helperText={
                      <ErrorMessage
                        success={
                          inputValidate.impressum.street.firstTouch
                            ? inputValidate.impressum.street.valid
                              ? true
                              : false
                            : true
                        }
                        message={inputValidate.impressum.street.error}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Szolgáltatások/Extrák">
          <div className="flex flex-col gap-4" ref={ref}>
            <div className="w-full flex flex-col gap-4">
              <div
                onClick={newListHandler}
                data-type={"service"}
                className="w-full flex justify-between bg-[#c1c1c1] p-4 rounded-md font-bold cursor-pointer"
              >
                Új Szolgáltatás hozzáadás
                <span className="pointer-events-none">
                  <BsPlusSquare size="1.5rem" className="pointer-events-none" />
                </span>
              </div>
              <ul className="space-y-4">
                {data.services.map((service, index) => (
                  <li
                    key={index}
                    className="shadow-md rounded-md flex flex-col mobile:flex-row p-2 gap-2 justify-between border border-black/10"
                    data-group={"service"}
                  >
                    <div className="mobile:w-full">
                      <TextInput
                        addon={<BsTools size="1.2rem" />}
                        value={service}
                        className="font-medium"
                        disabled={inputValidate.service[index]?.disabled}
                        onChange={changeInputHandler}
                        onBlur={inputBlurHandler}
                        data-key={"service"}
                        data-index={index}
                        color={`${
                          inputValidate.service[index]?.firstTouch
                            ? inputValidate.service[index]?.valid
                              ? "gray"
                              : "failure"
                            : "gray"
                        }`}
                        helperText={
                          <ErrorMessage
                            success={
                              inputValidate.service[index]?.firstTouch
                                ? inputValidate.service[index]?.valid
                                  ? true
                                  : false
                                : true
                            }
                            message={inputValidate.service[index]?.error}
                          />
                        }
                      />
                    </div>
                    <span
                      className="w-full flex gap-4 mobile:w-[unset] mobile:px-4 items-center"
                      data-group={"service"}
                      data-index={index}
                    >
                      <button
                        type="button"
                        className="flex justify-center py-1 rounded-lg gap-2 text-blue-600 bg-blue-600/20 w-full mobile:w-[unset] mobile:bg-inherit"
                        onClick={editListHandler}
                      >
                        {inputValidate.service[index]?.disabled && (
                          <TbEdit
                            size="1.5rem"
                            className="pointer-events-none"
                          />
                        )}
                        {!inputValidate.service[index]?.disabled && (
                          <TbEditOff
                            size="1.5rem"
                            className="pointer-events-none"
                          />
                        )}
                        <span
                          className={`pointer-events-none hidden mobile:block ${
                            !inputValidate.service[index]?.disabled &&
                            "line-through"
                          }`}
                        >
                          Szerkesztés
                        </span>
                      </button>
                      <button
                        type="button"
                        className="flex gap-2 justify-center py-1 rounded-lg text-red-600 bg-red-600/20 w-full mobile:w-[unset] mobile:bg-inherit"
                        onClick={deleteListHandler}
                      >
                        <BsTrash3
                          size="1.5rem"
                          className=" pointer-events-none"
                        />
                        <span className="pointer-events-none hidden mobile:block">
                          Törlés
                        </span>
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div
                onClick={newListHandler}
                data-type={"feature"}
                className="w-full flex justify-between bg-[#c1c1c1] p-4 rounded-md font-bold cursor-pointer"
              >
                Új Extra hozzáadás
                <span className="pointer-events-none">
                  <BsPlusSquare size="1.5rem" className="pointer-events-none" />
                </span>
              </div>
              <ul className="space-y-4">
                {data.feature.map((feature, index) => (
                  <li
                    key={index}
                    className="shadow-md rounded-md flex flex-col mobile:flex-row p-2 gap-2 justify-between border border-black/10"
                  >
                    <div className="mobile:w-full">
                      <TextInput
                        addon={<MdOutlineWorkspacePremium size="1.2rem" />}
                        value={feature}
                        className="font-medium"
                        disabled={inputValidate.feature[index]?.disabled}
                        onChange={changeInputHandler}
                        onBlur={inputBlurHandler}
                        data-key={"feature"}
                        data-index={index}
                        color={`${
                          inputValidate.feature[index]?.firstTouch
                            ? inputValidate.feature[index]?.valid
                              ? "gray"
                              : "failure"
                            : "gray"
                        }`}
                        helperText={
                          <ErrorMessage
                            success={
                              inputValidate.feature[index]?.firstTouch
                                ? inputValidate.feature[index]?.valid
                                  ? true
                                  : false
                                : true
                            }
                            message={inputValidate.feature[index]?.error}
                          />
                        }
                      />
                    </div>
                    <span
                      className="flex gap-4 w-full mobile:w-[unset] mobile:px-4 items-center"
                      data-group={"feature"}
                      data-index={index}
                    >
                      <button
                        type="button"
                        className="flex justify-center py-1 rounded-lg gap-2 text-blue-600 bg-blue-600/20 w-full mobile:w-[unset] mobile:bg-inherit"
                        onClick={editListHandler}
                      >
                        {inputValidate.feature[index]?.disabled && (
                          <TbEdit
                            size="1.5rem"
                            className="pointer-events-none"
                          />
                        )}
                        {!inputValidate.feature[index]?.disabled && (
                          <TbEditOff
                            size="1.5rem"
                            className="pointer-events-none"
                          />
                        )}

                        <span
                          className={`pointer-events-none hidden mobile:block ${
                            !inputValidate.feature[index]?.disabled &&
                            "line-through"
                          }`}
                        >
                          Szerkesztés
                        </span>
                      </button>
                      <button
                        type="button"
                        className="flex gap-2 justify-center py-1 rounded-lg text-red-600 bg-red-600/20 w-full mobile:w-[unset] mobile:bg-inherit"
                        onClick={deleteListHandler}
                      >
                        <BsTrash3
                          size="1.5rem"
                          className=" pointer-events-none"
                        />
                        <span className="pointer-events-none hidden mobile:block ">
                          Törlés
                        </span>
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Tabs.Item>
      </Tabs.Group>
    );
  }
);

export default EditGuestHouseTabs;

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
