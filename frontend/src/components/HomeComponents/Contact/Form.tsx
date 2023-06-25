import React, { useState, useRef } from "react";
import WarningSvg from "../../UI/svg/WarningSvg";
import SuccessSvg from "../../UI/svg/SuccessSvg";
import emailjs from "@emailjs/browser";
import { ClipLoader } from "react-spinners";

export interface FormInterface extends Record<string, formKey> {
  name: formKey;
  email: formKey;
  phone: formKey;
  message: formKey;
}

const Form = () => {
  const form = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [sendForm, setSendForm] = useState<boolean>(false);
  const [sendSuccess, setSendSuccess] = useState<
    "no send" | "success" | "warning"
  >("no send");
  const [formInput, setFormInput] = useState<FormInterface>({
    name: {
      value: "",
      valid: false,
      error: "Adj meg egy nevet!",
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
    message: {
      value: "",
      valid: false,
      error: "Adj meg egy üzenetet!",
      firstTouch: false,
      pattern: /^([\s\S]{2,})$/,
    },
  });

  const resetInput = () => {
    const inputs = ["name", "email", "phone", "message"];

    inputs.map((input) =>
      setFormInput((prevState) => {
        return {
          ...prevState,
          [input]: { ...prevState[input], value: "" },
        };
      })
    );
    inputs.map((input) =>
      setFormInput((prevState) => {
        return {
          ...prevState,
          [input]: { ...prevState[input], firstTouch: false },
        };
      })
    );
    inputs.map((input) =>
      setFormInput((prevState) => {
        return {
          ...prevState,
          [input]: { ...prevState[input], valid: false },
        };
      })
    );
  };

  const inputChangeHandler = (e: React.ChangeEvent<EventTarget>) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }

    const type = e.target.dataset.type as string;
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

  const inputBlurHandler = (e: React.ChangeEvent<EventTarget>) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }

    const type = e.target.dataset.type as string;

    if (!formInput[type].firstTouch) {
      setFormInput((prevState) => {
        return {
          ...prevState,
          [type]: { ...prevState[type], firstTouch: true },
        };
      });
    }
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const timeoutHandler = (mode: string) => {
      let timeout;
      const startTimeout = () => {
        timeout = setTimeout(() => {
          setSendSuccess("no send");
        }, 7000);
      };
      if (mode === "success") {
        clearTimeout(timeout);
        setSendSuccess("success");
        startTimeout();
      }
      if (mode === "warning") {
        clearTimeout(timeout);
        setSendSuccess("warning");
        startTimeout();
      }
    };

    const serviceId = process.env.REACT_APP_SERVICE_ID as string;
    const templateId = process.env.REACT_APP_TEMPLATE_ID as string;
    const publicKey = process.env.REACT_APP_PUBLIC_KEY as string;
    const inputs = ["name", "email", "phone", "message"];
    if (
      !formInput.name.valid ||
      !formInput.email.valid ||
      !formInput.phone.valid ||
      !formInput.message.valid
    ) {
      timeoutHandler("warning");
      inputs.map((input) =>
        setFormInput((prevState) => {
          return {
            ...prevState,
            [input]: { ...prevState[input], firstTouch: true },
          };
        })
      );
    }
    if (
      formInput.name.valid &&
      formInput.email.valid &&
      formInput.phone.valid &&
      formInput.message.valid
    ) {
      setSendForm(true);
      const sendEmail = () => {
        emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
          (result) => {
            setSendForm(false);
            resetInput();
            timeoutHandler("success");
          },
          (error) => {
            setSendForm(false);
            timeoutHandler("warning");
          }
        );
      };
      sendEmail();
    }
  };
  return (
    <ContactForm
      className="w-full text-[32px] flex flex-col gap-4"
      submitHandler={formSubmitHandler}
      formRef={form}
      sendForm={sendForm}
      sendSuccess={sendSuccess}
    >
      <div className="flex flex-col justify-center mobile:flex-wrap mobile:flex-row tablet:flex-col gap-4">
        <FormInput
          formInput={formInput.name}
          name={"name"}
          inputBlurHandler={inputBlurHandler}
          inputChangeHandler={inputChangeHandler}
        />
        <FormInput
          formInput={formInput.email}
          name={"email"}
          inputBlurHandler={inputBlurHandler}
          inputChangeHandler={inputChangeHandler}
        />
        <FormInput
          name={"phone"}
          formInput={formInput.phone}
          inputBlurHandler={inputBlurHandler}
          inputChangeHandler={inputChangeHandler}
          order
        />
      </div>
      <FormTextarea
        name="message"
        formInput={formInput.message}
        inputBlurHandler={inputBlurHandler}
        inputChangeHandler={inputChangeHandler}
      />
    </ContactForm>
  );
};

export default Form;

export type formKey = {
  type?: string;
  value: string | number;
  valid: boolean;
  error: string;
  firstTouch: boolean;
  pattern?: RegExp;
};

interface FormInput {
  noBorder?: boolean;
  order?: boolean;
  formInput: formKey;
  name: string;
  inputBlurHandler: (e: React.ChangeEvent<EventTarget>) => void;
  inputChangeHandler: (e: React.ChangeEvent<EventTarget>) => void;
}

interface ContactFormInterface {
  children?: JSX.Element[];
  submitHandler?: (e: React.FormEvent) => void;
  formRef?: React.MutableRefObject<HTMLFormElement>;
  className?: string;
  sendForm?: boolean;
  sendSuccess?: "no send" | "success" | "warning";
}

export const FormInput: React.FC<FormInput> = (props) => {
  return (
    <div
      className={`relative flex flex-col gap-2 transition-all   ${
        props.order ? "mobile:order-3 mobile:basis-full" : "w-full mobile:max-w-[calc(50%-1rem/2)] tablet:max-w-none"
      }`}
    >
      <div className={`flex flex-col  relative`}>
        <input
          type={props.formInput.type ? props.formInput.type : "text"}
          min={0}
          id={props.name}
          name={props.name}
          value={props.formInput.value}
          className={`block px-2.5 py-2 w-full text-dynamicFormInput text-white ${
            !props.formInput.valid && props.formInput.firstTouch
              ? " border-red-600 focus:border-red-600"
              : " border-[#E2C8AE] focus:border-blue-600"
          } ${"bg-transparent"} rounded-2xl border-[2px] appearance-none focus:outline-none focus:ring-0 autofill:transition-[color,background-color] autofill:duration-[5000s] autofill:delay-[0s] peer`}
          placeholder=" "
          onBlur={props.inputBlurHandler}
          onChange={props.inputChangeHandler}
          data-type={props.name}
        />

        <label
          htmlFor={props.name}
          className={` absolute text-dynamicFormLabel ${
            !props.formInput.valid && props.formInput.firstTouch
              ? "text-red-600 peer-placeholder-shown:scale-75 peer-focus:text-red-600"
              : "text-[#E2C8AE] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:text-blue-600"
          }   duration-300 transform -translate-y-dynamicFormY translate-x-2 scale-75 top-2 z-10 origin-[0] bg-[#442c15]  px-2 peer-focus:px-2   peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-dynamicFormY left-1`}
        >
          {(props.name === "name" && "Név") ||
            (props.name === "email" && "Email") ||
            (props.name === "phone" && "Telefon") ||
            (props.name === "country" && "Ország") ||
            (props.name === "address" && "utca, házszám") ||
            (props.name === "city" && "Város/falu") ||
            (props.name === "postalCode" && "irányítószám") ||
            (props.name === "adults" && "Felnőttek száma") ||
            (props.name === "children" && "Gyermek/ek száma")}
        </label>
      </div>
      <div>
        <p className=" text-dynamicHelperText text-red-600">
          {!props.formInput.valid && props.formInput.firstTouch
            ? props.formInput.error
            : ""}
        </p>
      </div>
    </div>
  );
};

export const FormTextarea: React.FC<FormInput> = (props) => {
  return (
    <div className="relative flex flex-col gap-2 transition-all">
      <div className="flex flex-col relative">
        <textarea
          id={props.name}
          name={props.name}
          value={props.formInput.value}
          rows={6}
          className={`block px-2.5 py-2 w-full text-dynamicFormInput text-white ${
            !props.formInput.valid && props.formInput.firstTouch
              ? " border-red-600 focus:border-red-600"
              : " border-[#E2C8AE] focus:border-blue-600"
          } bg-transparent rounded-2xl border-[2px] appearance-none focus:outline-none focus:ring-0 resize-none peer`}
          onChange={props.inputChangeHandler}
          data-type={props.name}
          placeholder=" "
          onBlur={props.inputBlurHandler}
        />
        <label
          htmlFor={props.name}
          className={`absolute text-dynamicFormLabel  duration-300 transform ${
            !props.formInput.valid &&
            props.formInput.firstTouch &&
            "text-red-600 -translate-y-dynamicFormY scale-75 peer-focus:text-red-600"
          } ${
            props.formInput.valid &&
            "-translate-y-dynamicFormY scale-75 text-[#E2C8AE] peer-focus:text-blue-600"
          } ${
            !props.formInput.valid &&
            !props.formInput.firstTouch &&
            "translate-y-0 scale-100 text-[#E2C8AE] peer-focus:text-blue-600"
          } translate-x-2  top-2 z-10 origin-[0] bg-[#442c15]  px-2 peer-focus:px-2  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-dynamicFormY left-1 `}
        >
          {props.name === "message" && "Üzenet"}
        </label>
      </div>
      <div>
        <p className="text-dynamicHelperText text-red-600">
          {!props.formInput.valid && props.formInput.firstTouch
            ? props.formInput.error
            : ""}
        </p>
      </div>
    </div>
  );
};

export const ContactForm: React.FC<ContactFormInterface> = (props) => {
  return (
    <form
      className={props.className}
      onSubmit={props.submitHandler}
      ref={props.formRef}
    >
      {props.children}
      <div className="w-full flex flex-col gap-4">
        <button
          disabled={props.sendForm}
          className=" flex items-center justify-center text-xl gap-2 bg-[#E2C8AE] hover:bg-[#E2C8AE]/80 transition-colors duration-300 rounded-2xl font-bold text-[#442c15] w-full py-1 tablet:py-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-palette-blue-5 disabled:hover:opacity-50"
        >
          {props.sendForm && (
            <ClipLoader loading={true} color={"#442c15"} size="1rem" />
          )}
          Küldés
        </button>
        {props.sendSuccess === "warning" && (
          <div
            className="flex items-center gap-4 p-4 mb-4 text-sm text-red-600 border border-red-600 bg-transparent rounded-2xl animate__animated animate__shakeX"
            role="alert"
          >
            <WarningSvg />
            <div>
              <span className="font-medium">Hiba!</span> Nem sikerült elküldeni
              az űrlapot!
            </div>
          </div>
        )}
        {props.sendSuccess === "success" && (
          <div
            className="flex items-center gap-4 p-4 mb-4 text-sm text-green-500 border border-green-500 bg-transparent rounded-2xl animate__animated animate__fadeInDown"
            role="alert"
          >
            <SuccessSvg />
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Siker!</span> Sikeresen elküldtük az
              űrlapot! :D
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
