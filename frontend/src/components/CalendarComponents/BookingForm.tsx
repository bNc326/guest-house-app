import { FormInterface } from "pages/Calendar";
import React from "react";
import { Separator } from "pages/Calendar";
import { FaUsers, FaChild } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { HiMail, HiPhone, HiUser } from "react-icons/hi";
import { BsFillSendFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

const BookingForm: React.FC<{
  formInput: FormInterface;
  inputChangeHandler: (e: React.ChangeEvent) => void;
  inputBlurHandler: (e: React.ChangeEvent) => void;
  formSubmitHandler: (e: React.FormEvent) => void;
  formLoading: boolean;
  onCloseHandler: () => void;
}> = ({
  formInput,
  inputChangeHandler,
  inputBlurHandler,
  formSubmitHandler,
  formLoading,
  onCloseHandler,
}) => {
  return (
    <form
      className="w-full text-[32px] flex flex-col gap-4"
      onSubmit={formSubmitHandler}
    >
      <Separator title={"Személyek száma"} />
      <div className="flex gap-4 justify-center">
        <div className="w-1/2 max-w-[400px]">
          <Input
            value={formInput.adults.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            name={"adults"}
            icon={FaUsers}
            type="number"
            label="Felnőttek száma"
            message={formInput.adults.error}
            success={
              formInput.adults.firstTouch
                ? formInput.adults.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
        <div className="w-1/2 max-w-[400px]">
          <Input
            value={formInput.children.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            name={"children"}
            icon={FaChild}
            type="number"
            label="Gyermekek száma"
            message={formInput.children.error}
            success={
              formInput.children.firstTouch
                ? formInput.children.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
      </div>
      <Separator title={"Személyes adatok"} />
      <div className="flex flex-col mobile:flex-wrap mobile:flex-row tablet:flex-nowrap gap-4">
        <div className="w-full mobile:w-[calc(50%-1rem/2)] tablet:w-full">
          <Input
            value={formInput.name.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            name={"name"}
            placeholder="Név.."
            icon={HiUser}
            label={"Teljes név"}
            message={formInput.name.error}
            success={
              formInput.name.firstTouch
                ? formInput.name.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
        <div className="w-full order-3">
          <Input
            value={formInput.email.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            placeholder="Email.."
            name={"email"}
            icon={HiMail}
            label={"Email"}
            message={formInput.email.error}
            success={
              formInput.email.firstTouch
                ? formInput.email.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
        <div className="w-full mobile:w-[calc(50%-1rem/2)] tablet:w-full">
          <Input
            value={formInput.phone.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            placeholder="Telefonszám.."
            name={"phone"}
            icon={HiPhone}
            label={"Telefonszám"}
            message={formInput.phone.error}
            success={
              formInput.phone.firstTouch
                ? formInput.phone.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <Input
            value={formInput.country.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            placeholder="Ország.."
            name={"country"}
            label={"Ország"}
            message={formInput.country.error}
            success={
              formInput.country.firstTouch
                ? formInput.country.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
      </div>
      <div className="flex flex-wrap tablet:flex-nowrap gap-4">
        <div className="w-[calc(50%-1rem/2)] tablet:w-1/5">
          <Input
            value={formInput.postalCode.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            placeholder="Irányítószám.."
            name={"postalCode"}
            label={"Irányítószám"}
            message={formInput.postalCode.error}
            success={
              formInput.postalCode.firstTouch
                ? formInput.postalCode.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
        <div className="w-[calc(50%-1rem/2)] tablet:w-1/2">
          <Input
            value={formInput.city.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            placeholder="Város.."
            name={"city"}
            label={"Város/falu"}
            message={formInput.city.error}
            success={
              formInput.city.firstTouch
                ? formInput.city.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
        <div className="w-full tablet:w-full">
          <Input
            value={formInput.address.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            placeholder="Utca/házszám.."
            name={"address"}
            label={"Utca/házszám"}
            message={formInput.address.error}
            success={
              formInput.address.firstTouch
                ? formInput.address.valid
                  ? true
                  : false
                : true
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button send isLoading={formLoading}>
          Küldés
        </Button>
        <Button outline onCloseHandler={onCloseHandler}>
          Elvétés
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;

export const Input: React.FC<{
  className?: string;
  label?: string;
  name?: string;
  value?: string | number;
  icon?: IconType;
  placeholder?: string;
  htmlFor?: string;
  type?: string;
  onChange: (e: React.ChangeEvent) => void;
  onBlur: (e: React.ChangeEvent) => void;
  success?: boolean;
  message?: string;
}> = (props) => {
  return (
    <>
      <label
        htmlFor={props.htmlFor}
        className="block mb-2 font-medium text-dynamicMedium text-palette-2"
      >
        {props.label?.replace("száma", "")}
      </label>
      <div className="relative">
        {props.icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <props.icon
              className="w-5 h-5 text-palette-2"
              color={`${!props.success ? "red" : ""}`}
            />
          </div>
        )}

        <input
          type={props.type ? props.type : "text"}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          onBlur={props.onBlur}
          data-key={props.name}
          id={props.htmlFor}
          max={99}
          min={0}
          className={` bg-palette-4 text-dynamicFormInput border text-palette-2 placeholder:text-palette-2/80 caret-palette-2 ${
            props.success
              ? "  border-palette-2  focus:ring-palette-2 focus:border-palette-2 "
              : "border-red-600 focus:ring-red-600 focus:border-red-600"
          }  text-sm rounded-lg  block w-full  ${
            props.icon ? "pl-10" : "pl-4"
          } p-2.5`}
          placeholder={props.placeholder}
        />
      </div>
      {!props.success && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Hoppá!</span> {props.message}
        </p>
      )}
    </>
  );
};

export const Button: React.FC<{
  children: string;
  outline?: boolean;
  send?: boolean;
  isLoading?: boolean;
  onCloseHandler?: () => void;
}> = (props) => {
  return (
    <>
      <button
        type={props.send ? "submit" : "button"}
        onClick={props.onCloseHandler}
        className={`text-dynamicFormInput w-full tablet:w-max font-medium flex items-center justify-center gap-2 transition-all ease-in-out duration-300 max-h-[44px] ${
          props.outline
            ? "font-bold bg-transparent border border-palette-2 text-palette-2 hover:bg-palette-2 hover:text-palette-4 "
            : " bg-palette-2 hover:bg-palette-2/80 text-palette-4"
        }  px-4 py-2 rounded-lg`}
      >
        {props.send && (
          <>
            {props.isLoading ? (
              <ClipLoader loading color="#7F5539" size={"1rem"} />
            ) : (
              <span className="flex items-center justify-center">
                <BsFillSendFill />
              </span>
            )}
          </>
        )}

        {props.children}
      </button>
    </>
  );
};
