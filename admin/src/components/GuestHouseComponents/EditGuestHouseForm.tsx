import React, { useState, useEffect, useRef } from "react";
import {
  useRevalidator,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import EditGuestHouseTabs from "./EditGuestHouseTabs";
import { GuestHouseModel, InputValidate } from "../../models/GuestHouseModel";
import { cloneDeep } from "lodash";
import { TextInput, Button, Label } from "flowbite-react";
import { FaSave } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { mapValues } from "lodash";
import { GiToken } from "react-icons/gi";
import {
  ALERT_ACTION,
  ALERT_ACTION_TYPE,
  ALERT_TYPE,
} from "../../models/Alert/AlertModels";
import { isEqual } from "lodash";
import { Outlet } from "../../models/OutletModel";
import { useAuthHeader } from "react-auth-kit";
const EditGuestHouseForm: React.FC<{
  data: GuestHouseModel;
}> = (props) => {
  const data = props.data;
  const inputData: InputValidate = {
    hotelName: {
      pattern: /^[\s\S]{2,}$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy nevet!",
    },
    price: {
      pattern: /^[1-9]+(\d{1,})?$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy éj/árat!",
    },
    roomAmount: {
      pattern: /^[1-9]+(\d{1,})?$/,
      valid: false,
      firstTouch: false,
      error: "Add meg a szobák számát!",
    },
    maxPersonAmount: {
      pattern: /^[1-9]+(\d{1,})?$/,
      valid: false,
      firstTouch: false,
      error: "Add meg a maximum férőhelyek számát!",
    },
    description: {
      pattern: /^[\s\S]{2,}$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy leírást! (min 2 karakter)",
    },
    country: {
      pattern: /^[\s\S]{2,}$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy országot!",
    },
    postalCode: {
      pattern: /^\d{1,}$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy irányítószámot!",
    },
    city: {
      pattern: /[\s\S]{2,}/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy várost/falut!",
    },
    street: {
      pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
      valid: true,
      firstTouch: false,
      error: "Adj meg egy utca/házszámot!",
    },
    NTAK: {
      pattern: /^(?:MA)[0-9]{8,10}$/,
      valid: true,
      firstTouch: false,
      error: "Add meg az NTAK regisztrációd számát! pl: MA12345678",
    },
  };
  const navigate = useNavigate();
  const [isMount, setIsMount] = useState<boolean>(false);
  const [editableData, setEditableData] = useState(cloneDeep(props.data));
  const backup = cloneDeep(props.data);
  const [objectsEqual, setObjectsEqual] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const revalidator = useRevalidator();
  const [inputValidate, setInputValidate] = useState<InputValidate>(
    cloneDeep(inputData)
  );
  const inputBackup = cloneDeep(inputData);
  const focusRef = useRef<HTMLDivElement>(null);
  const outletCtx = useOutletContext() as Outlet;
  const accessToken = useAuthHeader();

  useEffect(() => {
    if (objectsEqual) {
      if (!isEqual(backup, editableData)) {
        setObjectsEqual(false);
      }
    } else {
      if (isEqual(backup, editableData)) {
        setObjectsEqual(true);
      }
    }
  }, [editableData]);

  const resetFormHandler = (e: React.MouseEvent) => {
    setEditableData(backup);
    setInputValidate(inputBackup);
  };

  const changeInputHandler = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    )
      return;
    const value = e.target.value;
    const name = e.target.name as string;
    if (!inputValidate[name].firstTouch) {
      setInputValidate((prev) => ({
        ...prev,
        [name]: { ...prev[name], firstTouch: true },
      }));
    }

    const testInput = () => {
      if (inputValidate[name].pattern !== null) {
        const testValid = inputValidate[name].pattern.test(value);
        testValid
          ? setInputValidate((prev) => {
              return { ...prev, [name]: { ...prev[name], valid: true } };
            })
          : setInputValidate((prev) => {
              return { ...prev, [name]: { ...prev[name], valid: false } };
            });
      }
    };

    setEditableData((prev) => ({ ...prev, [name]: value }));
    testInput();
  };

  const inputBlurHandler = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    )
      return;
    const value = e.target.value;
    const name = e.target.name as string;

    const testInput = () => {
      if (inputValidate[name].pattern !== null) {
        const testValid = inputValidate[name].pattern.test(value);
        testValid
          ? setInputValidate((prev) => {
              return { ...prev, [name]: { ...prev[name], valid: true } };
            })
          : setInputValidate((prev) => {
              return { ...prev, [name]: { ...prev[name], valid: false } };
            });
      }
    };

    setInputValidate((prevState) => {
      return {
        ...prevState,
        [name]: { ...prevState[name], firstTouch: true },
      };
    });
    testInput();
  };

  const submitEditGuestHouseHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setInputValidate((prev) => {
      const inputs = { ...prev };
      for (let input in inputs) {
        inputs[input].firstTouch = true;
      }
      return inputs;
    });

    const getValidKeys = (obj: InputValidate): boolean => {
      const baseKeys = mapValues(obj, "valid");
      console.log(baseKeys);
      for (let baseKey in baseKeys) {
        if (!baseKeys[baseKey] && baseKeys[baseKey] !== undefined) {
          return false;
        }
      }

      return true;
    };

    const valid = getValidKeys(inputValidate);

    if (valid) {
      const url = process.env.REACT_APP_BACKEND_API as string;
      setIsLoading(true);
      const response = await fetch(url + `/hotels/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken(),
        },
        body: JSON.stringify(editableData),
      });
      if (!response.ok) {
        revalidator.revalidate();
        setIsLoading(false);
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.FAILURE,
            message: `Valami hiba történt! Próbáld újra!`,
          },
        });
      } else {
        const data = await response.json();
        setObjectsEqual(true);
        setIsLoading(false);
        revalidator.revalidate();
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.SUCCESS,
            message: data.message,
          },
        });
      }
    } else {
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: {
          alertType: ALERT_TYPE.FAILURE,
          message: `Minden mezőt helyesen ki kell tölteni!`,
        },
      });
    }
  };

  return (
    <form
      onSubmit={submitEditGuestHouseHandler}
      className="w-full laptop:w-4/5 desktop:w-1/2"
    >
      <EditGuestHouseTabs
        data={editableData}
        inputValidate={inputValidate}
        changeInputHandler={changeInputHandler}
        inputBlurHandler={inputBlurHandler}
        ref={focusRef}
      />
      <ButtonArea
        data={data}
        objectsEqual={objectsEqual}
        loading={isLoading}
        resetFormHandler={resetFormHandler}
      />
    </form>
  );
};

export default EditGuestHouseForm;
export const ButtonArea: React.FC<{
  data: GuestHouseModel;
  objectsEqual: boolean;
  loading: boolean;
  resetFormHandler: (e: React.MouseEvent) => void;
}> = ({ data, objectsEqual, loading, resetFormHandler }) => {
  return (
    <div className="flex flex-col-reverse gap-2 justify-between items-end">
      <div className="flex gap-2 w-full">
        <Button
          disabled={objectsEqual}
          type="submit"
          className="w-full laptop:w-[unset] transition-all ease-in-out duration-300"
        >
          <span className="flex gap-1 items-center">
            {loading ? (
              <ClipLoader loading={true} color={"white"} size={"1rem"} />
            ) : (
              <FaSave />
            )}
            Mentés
          </span>
        </Button>
        <button
          onClick={resetFormHandler}
          type="button"
          disabled={objectsEqual}
          className="w-full px-4 rounded-lg laptop:w-[unset] border-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-30 transition-all ease-in-out duration-300"
        >
          Elvétés
        </button>
      </div>
      <div className="w-full">
        <Label htmlFor="guest-house-id" value="Vendégház azonosító" />
        <TextInput
          id="guest-house-id"
          disabled
          rightIcon={GiToken}
          value={data._id}
        />
      </div>
    </div>
  );
};
