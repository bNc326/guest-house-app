import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useRevalidator, useOutletContext } from "react-router-dom";
import { FormFooter } from "./FormFooter";
import { Input, FormProps } from "../../models/Form/Form";
import { cloneDeep, isEqual, mapValues } from "lodash";
import { HotelContext } from "../../context/HotelContextProvider";
import { useAuthHeader } from "react-auth-kit";
import { ALERT_ACTION_TYPE, ALERT_TYPE } from "../../models/Alert/AlertModels";
import { Outlet } from "../../models/OutletModel";
import {
  RefreshContext,
  RefreshEnum,
} from "../../context/RefreshContextProvider";

const Form: React.FC<FormProps> = ({
  id,
  inputs,
  sendAction,
  children,
  withoutHotelQuery,
  className,
  acceptAction,
  passData,
}) => {
  //TODO FIX Backup
  const [backup, setBackup] = useState<any>({});
  const [objectIsEqual, setObjectIsEqual] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const hotelCtx = useContext(HotelContext);
  const outletCtx = useOutletContext() as Outlet;
  const refreshCtx = useContext(RefreshContext);
  const accessToken = useAuthHeader();
  const revalidator = useRevalidator();

  useLayoutEffect(() => {
    setBackup(cloneDeep({ ...inputs.input, ...passData }));
  }, []);

  useLayoutEffect(() => {
    const cleanup = setTimeout(() => {
      if (Object.keys(backup).length === 0) return;
      const input = inputs.input;
      if (objectIsEqual) {
        if (!isEqual(input, backup)) {
          setObjectIsEqual(false);
        }
      } else {
        if (isEqual(input, backup)) {
          setObjectIsEqual(true);
        }
      }
    }, 100);
    return () => clearTimeout(cleanup);
  }, [inputs.input]);

  const resetForm = () => {
    inputs.setInput(backup);
  };

  const testInput = (name: string, value: string) => {
    if (inputs.input[name].pattern !== null) {
      const testValid = inputs.input[name].pattern?.test(value);
      testValid
        ? inputs.setInput((prev) => {
            return { ...prev, [name]: { ...prev[name], valid: true } };
          })
        : inputs.setInput((prev) => {
            return { ...prev, [name]: { ...prev[name], valid: false } };
          });
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    )
      return;

    const value = e.target.value;
    const name = e.target.name;

    if (!inputs.input[name].firstTouch) {
      inputs.setInput((prev) => ({
        ...prev,
        [name]: { ...prev[name], firstTouch: true },
      }));
    }

    inputs.setInput((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: value },
    }));

    testInput(name, value);
  };

  const handleBlur = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    )
      return;
    const value = e.target.value.trimEnd();
    const name = e.target.name;

    inputs.setInput((prev) => ({
      ...prev,
      [name]: { ...prev[name], firstTouch: true },
    }));
    testInput(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    inputs.setInput((prev) => {
      const update = cloneDeep(prev);
      Object.keys(update).map((key) => (update[key].firstTouch = true));
      return update;
    });

    const getValidKeys = (): boolean => {
      const baseKeys = mapValues(inputs.input, "valid");
      for (let baseKey in baseKeys) {
        if (!baseKeys[baseKey] && baseKeys[baseKey] !== undefined) {
          return false;
        }
      }
      return true;
    };

    const generateBody = (): BodyInit => {
      const input = inputs.input;
      let body: { [key: string]: any } = {};
      for (let key in input) {
        body[key] = input[key].value;
      }
      if (passData) body = { ...body, ...passData };
      return JSON.stringify(body);
    };

    const valid = getValidKeys();
    if (valid) {
      const url = process.env.REACT_APP_BACKEND_API as string;
      setLoading(true);
      const body = generateBody();
      const response = await fetch(
        `${url}/${sendAction?.endpoint}${id ? "/" + id : ""}${
          !withoutHotelQuery ? `?hotel=${hotelCtx.hotelId}` : ""
        }`,
        {
          method: sendAction?.method,
          headers: {
            "Content-Type": "application/json",
            authorization: accessToken(),
          },
          body: body,
        }
      );
      if (!response.ok) {
        revalidator.revalidate();
        setLoading(false);
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.FAILURE,
            message: `Valami hiba történt! Próbáld újra!`,
          },
        });
      } else {
        const data = await response.json();
        setObjectIsEqual(true);
        setLoading(false);
        console.log("asd");
        revalidator.revalidate();
        refreshCtx.handleRefresh(RefreshEnum.START);
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.SUCCESS,
            message: data.message,
          },
        });
        sendAction?.callBack && sendAction.callBack();
        if (sendAction?.method === "POST") {
          inputs.setInput(backup);
        }

        if (sendAction?.method === "PUT") {
          setBackup(inputs.input);
        }
      }
    } else {
      setLoading(false);
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: {
          alertType: ALERT_TYPE.FAILURE,
          message: `Minden mezőt helyesen ki kell tölteni!`,
        },
      });
    }
  };

  const handleAccept = async (
    e: MouseEvent,
    status: "Accepted" | "Ejected"
  ) => {
    e.preventDefault();
    const body = { status };
    if (!acceptAction) return;
    setLoading(true);
    const url = process.env.REACT_APP_BACKEND_API as string;
    try {
      const response = await fetch(
        `${url}/${acceptAction.endpoint}/${acceptAction.id}?hotel=${hotelCtx.hotelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: accessToken(),
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setLoading(false);
      refreshCtx.handleRefresh(RefreshEnum.START);
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: {
          alertType: ALERT_TYPE.SUCCESS,
          message: data.message,
        },
      });
      sendAction?.callBack && sendAction.callBack();
    } catch (error) {
      setLoading(false);
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: {
          alertType: ALERT_TYPE.FAILURE,
          message: `Valami hiba történt! Póbáld újra!`,
        },
      });
    }
  };
  console.log("backup", backup);
  return (
    <article
      className={`p-4 border-gray-300 border flex flex-col space-y-8 rounded-lg w-full laptop:w-4/5 desktop:w-1/2 ${className}`}
    >
      <form onSubmit={handleSubmit}>
        {children({ handleChange, handleBlur })}
        <FormFooter
          objectIsEqual={objectIsEqual}
          resetForm={resetForm}
          loading={loading}
          accept={{
            accept:
              acceptAction && acceptAction.initialStatus === "Pending"
                ? true
                : false,
            callbackFn: handleAccept,
          }}
        />
      </form>
    </article>
  );
};

export default Form;
