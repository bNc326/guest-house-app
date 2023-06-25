import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";
import { TextInput, Button, Label } from "flowbite-react";
import { BsFillLockFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { mapValues } from "lodash";
import useAlert from "../hooks/useAlert";
import AlertComponent from "../components/UI/Alert";
import { ALERT_ACTION_TYPE, ALERT_TYPE } from "../models/Alert/AlertModels";
import { AUTH_ACTION_TYPE } from "../models/Auth/AuthModel";
import { Outlet } from "../models/OutletModel";
interface FormData extends Record<string, any> {
  username: {
    value: string;
    valid: boolean;
    firstTouch: boolean;
    error: string;
    pattern: RegExp;
  };
  password: {
    value: string;
    valid: boolean;
    firstTouch: boolean;
    error: string;
    pattern: RegExp;
  };
}

const Login = () => {
  const { authDispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alert, alertDispatch } = useAlert();
  const [formData, setFormData] = useState<FormData>({
    username: {
      value: "",
      valid: false,
      firstTouch: false,
      error: "Adj meg egy érvényes felhasználó nevet!",
      pattern: /^[\s\S]{1,}$/,
    },
    password: {
      value: "",
      valid: false,
      firstTouch: false,
      error: "Adj meg egy érvényes jelszót!",
      pattern: /^[\s\S]{1,}$/,
    },
  });
  const outletCtx = useOutletContext() as Outlet;

  const testInput = (input: string, value: string) => {
    const pattern = formData[input].pattern;
    const testValid = pattern.test(value);
    testValid
      ? setFormData((prev) => ({
          ...prev,
          [input]: { ...prev[input], valid: true },
        }))
      : setFormData((prev) => ({
          ...prev,
          [input]: { ...prev[input], valid: false },
        }));
  };

  const inputChangeHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const value = e.target.value as string;
    const input = e.target.dataset.input as string;

    if (!formData[input].firstTouch) {
      setFormData((prev) => {
        return { ...prev, [input]: { ...prev[input], firstTouch: true } };
      });
    }

    setFormData((prev) => {
      return { ...prev, [input]: { ...prev[input], value: value } };
    });
    testInput(input, value);
  };

  const inputBlurHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const value = e.target.value as string;
    const input = e.target.dataset.input as string;

    setFormData((prev) => {
      return { ...prev, [input]: { ...prev[input], firstTouch: true } };
    });
    testInput(input, value);
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const setAllFirstTouchTrue = () => {
      setFormData((prev) => {
        const update = { ...prev };
        update.username.firstTouch = true;
        update.password.firstTouch = true;
        return update;
      });
    };

    setAllFirstTouchTrue();
    const getValidKeys = (obj: FormData) => {
      const keys = mapValues(obj, "valid");

      for (let key in keys) {
        if (!keys[key]) return false;
      }
      return true;
    };

    const valid = getValidKeys(formData);
    if (valid) {
      setIsLoading(true);
      const url = process.env.REACT_APP_BACKEND_API as string;
      const body = {
        username: formData.username.value,
        password: formData.password.value,
      };
      const header = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(url + "/auth/login", header);
      if (!response.ok) {
        setIsLoading(false);
        const error = await response.json();
        alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: { alertType: ALERT_TYPE.FAILURE, message: error.message },
        });
      } else {
        const userData = await response.json();
        const authenticate = await fetch(url + "/auth/authenticate");
        const authenticateResult = await authenticate.json();
        if (!authenticateResult.success) {
        } else {
          setIsLoading(true);
          authDispatch({ type: AUTH_ACTION_TYPE.SUCCESS, payload: userData });
          navigate("/");
        }
      }
    }
  };

  return (
    <section className="h-screen w-full flex items-center justify-center bg-[#ebebeb]">
      <form
        action=""
        className="flex flex-col gap-2 w-11/12 max-w-[500px] p-4 rounded-xl shadow-2xl bg-white"
        onSubmit={formSubmitHandler}
      >
        <h2 className="text-center font-medium text-2xl">Bejelentkezés</h2>
        <div>
          <Label htmlFor="username">Felhasználó név / email</Label>
          <TextInput
            rightIcon={FaUserAlt}
            type="text"
            data-input={"username"}
            id="username"
            name="username"
            placeholder="pelda@email.com"
            value={formData.username.value}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            color={`${
              formData.username.firstTouch
                ? formData.username.valid
                  ? "gray"
                  : "failure"
                : "gray"
            }`}
            helperText={
              <ErrorMessage
                success={
                  formData.username.firstTouch
                    ? formData.username.valid
                      ? true
                      : false
                    : true
                }
                message={formData.username.error}
              />
            }
          />
        </div>
        <div>
          <Label htmlFor="password">Jelszó</Label>
          <TextInput
            rightIcon={BsFillLockFill}
            type="password"
            data-input={"password"}
            value={formData.password.value}
            id="password"
            name="password"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            color={`${
              formData.password.firstTouch
                ? formData.password.valid
                  ? "gray"
                  : "failure"
                : "gray"
            }`}
            helperText={
              <ErrorMessage
                success={
                  formData.password.firstTouch
                    ? formData.password.valid
                      ? true
                      : false
                    : true
                }
                message={formData.password.error}
              />
            }
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center disabled:cursor-not-allowed"
        >
          <span className="flex gap-1 items-center">
            <span className="flex items-center justify-center">
              {!isLoading ? (
                <FiLogIn size={"1rem"} />
              ) : (
                <ClipLoader loading={true} color="white" size={16} />
              )}
            </span>
            Bejelentkezés
          </span>
        </Button>
      </form>
      <AlertComponent
        isShow={alert.isShow}
        type={alert.alertType}
        message={alert.message}
        deleteAlertDispatch={alertDispatch}
      />
    </section>
  );
};

export default Login;

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
