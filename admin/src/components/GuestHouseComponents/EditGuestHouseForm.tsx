import React, { useState, useEffect, useRef } from "react";
import {
  useRevalidator,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import EditGuestHouseTabs from "./EditGuestHouseTabs";
import { HotelsModelObject } from "../../models/Hotels/HotelsModel";
import { cloneDeep, update } from "lodash";
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

export interface InputValidate extends Record<string, any> {
  hotelName: {
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
  price: {
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
  roomAmount: {
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
  maxPersonAmount: {
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
  description: {
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
  impressum: {
    country: {
      pattern: RegExp;
      valid: boolean;
      firstTouch: boolean;
      error: string;
    };
    postalCode: {
      pattern: RegExp;
      valid: boolean;
      firstTouch: boolean;
      error: string;
    };
    city: {
      pattern: RegExp;
      valid: boolean;
      firstTouch: boolean;
      error: string;
    };
    street: {
      pattern: RegExp;
      valid: boolean;
      firstTouch: boolean;
      error: string;
    };
    NTAK_regNumber: {
      pattern: RegExp;
      valid: boolean;
      firstTouch: boolean;
      error: string;
    };
  };
  service: Array<{
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
    disabled: boolean;
  }>;
  feature: Array<{
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
    disabled: boolean;
  }>;
}
const EditGuestHouseForm: React.FC<{
  data: HotelsModelObject;
}> = (props) => {
  const data = props.data;
  const inputData: InputValidate = {
    hotelName: {
      pattern: /^[\s\S]{2,}$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy nevet!",
    },
    price: {
      pattern: /^[0-9]{1,}$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy éj/árat!",
    },
    roomAmount: {
      pattern: /^[0-9]{1,2}$/,
      valid: false,
      firstTouch: false,
      error: "Add meg a szobák számát!",
    },
    maxPersonAmount: {
      pattern: /^[0-9]{1,2}$/,
      valid: false,
      firstTouch: false,
      error: "Add meg a maximum férőhelyek számát!",
    },
    description: {
      pattern: /^[\s\S]{2,}$/,
      valid: false,
      firstTouch: false,
      error: "Adj meg egy leírást! (min 2 karakter)",
    },
    impressum: {
      country: {
        pattern: /^[\s\S]{2,}$/,
        valid: false,
        firstTouch: false,
        error: "Adj meg egy országot!",
      },
      postalCode: {
        pattern: /^[0-9]{4}$/,
        valid: false,
        firstTouch: false,
        error: "Adj meg egy irányítószámot!",
      },
      city: {
        pattern: /[\s\S]{2,}/,
        valid: false,
        firstTouch: false,
        error: "Adj meg egy várost/falut!",
      },
      street: {
        pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
        valid: false,
        firstTouch: false,
        error: "Adj meg egy utca/házszámot!",
      },
      NTAK_regNumber: {
        pattern: /^(?:MA)[0-9]{8,10}$/,
        valid: false,
        firstTouch: false,
        error: "Add meg az NTAK regisztárciód számát! pl: MA12345678",
      },
    },
    service: [],
    feature: [],
  };
  const navigate = useNavigate();
  const [isMount, setIsMount] = useState<boolean>(false);
  const [editableData, setEditableData] = useState(cloneDeep(props.data));
  const backup = cloneDeep(props.data);
  const [objectsEqual, setObjectsEqual] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const revalidator = useRevalidator();
  const [newList, setNewList] = useState<"service" | "feature" | null>(null);
  const [inputValidate, setInputValidate] = useState<InputValidate>(
    cloneDeep(inputData)
  );
  const inputBackup = cloneDeep(inputData);
  const focusRef = useRef<HTMLDivElement>(null);
  const outletCtx = useOutletContext() as Outlet;

  useEffect(() => {
    const setArrayData = () => {
      const updatedArray = { ...inputValidate };
      const resetArrays = () => {
        updatedArray.service = [];
        updatedArray.feature = [];
      };
      resetArrays();

      editableData.services.map(() => {
        const update = {
          pattern: /^[\s\S]{2,}$/,
          valid: true,
          firstTouch: false,
          error: "Adj meg egy szolgáltatást/extrát! min 2 karakter!",
          disabled: true,
        };
        updatedArray.service.push(update);
      });
      editableData.feature.map(() => {
        const update = {
          pattern: /^[\s\S]{2,}$/,
          valid: true,
          firstTouch: false,
          error: "Adj meg egy szolgáltatást/extrát! min 2 karakter!",
          disabled: true,
        };
        updatedArray.feature.push(update);
      });
      setInputValidate(updatedArray);
    };
    const cleanup = setTimeout(() => {
      setIsMount(true);
      setArrayData();
    }, 0);

    return () => {
      clearTimeout(cleanup);
    };
  }, []);

  useEffect(() => {
    const getRefElements = (key: "service" | "feature", refIndex: number) => {
      const input = focusRef.current?.querySelectorAll(`[data-key="${key}"]`)[
        refIndex
      ] as HTMLInputElement;
      return input;
    };
    const setArrayData = () => {
      const updatedArray = { ...inputValidate };
      const baseObject = {
        pattern: /^[\s\S]{2,}$/,
        valid: true,
        firstTouch: false,
        error: "Adj meg egy szolgáltatást/extrát! min 2 karakter!",
        disabled: true,
      };
      if (newList === "service") {
        updatedArray.service.push(baseObject);
        updatedArray.service[updatedArray.service.length - 1].disabled = false;
        getRefElements("service", updatedArray.service.length - 1).focus();
      }
      if (newList === "feature") {
        updatedArray.feature.push(baseObject);
        updatedArray.feature[updatedArray.feature.length - 1].disabled = false;
        getRefElements("feature", updatedArray.feature.length - 1).focus();
      }
      setInputValidate(updatedArray);
    };
    const cleanup = setTimeout(() => {
      if (!isMount) return;
      setArrayData();
      revalidator.revalidate();
    }, 0);

    return () => {
      clearTimeout(cleanup);
    };
  }, [editableData.services.length, editableData.feature.length]);

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

  const newListHandler = (e: React.MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    e.stopPropagation();
    const type = e.target.dataset.type;

    if (type === "service") {
      setEditableData((prev) => {
        return { ...prev, services: [...prev.services, ""] };
      });
      setNewList("service");
    }
    if (type === "feature") {
      setEditableData((prev) => {
        return { ...prev, feature: [...prev.feature, ""] };
      });
      setNewList("feature");
    }
  };

  const editListHandler = (e: React.MouseEvent) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (!(e.target.parentElement instanceof HTMLSpanElement)) return;
    e.stopPropagation();
    const group = e.target.parentElement.dataset.group as string;
    const index = Number(e.target.parentElement.dataset.index) as number;
    setNewList(null);

    const getRefElements = (key: "service" | "feature", refIndex: number) => {
      const input = focusRef.current?.querySelectorAll(`[data-key="${key}"]`)[
        refIndex
      ] as HTMLInputElement;
      return input;
    };

    const resetDisabledInput = () => {
      const filterInput = (item: {
        pattern: RegExp;
        valid: boolean;
        firstTouch: boolean;
        error: string;
        disabled: boolean;
      }) => {
        if (item.valid && item.firstTouch) {
          return item;
        }
      };
      inputValidate.service
        .filter(filterInput)
        .map((item) => (item.disabled = true));
      inputValidate.feature
        .filter(filterInput)
        .map((item) => (item.disabled = true));
    };

    const isEdit = inputValidate[group][index].disabled;
    resetDisabledInput();

    if (isEdit) {
      if (group === "service") {
        setInputValidate((prev) => {
          const update = { ...prev };
          update.service[index].disabled = false;
          return prev;
        });
        setTimeout(() => {
          getRefElements("service", index).focus();
        }, 0);
      }
      if (group === "feature") {
        setInputValidate((prev) => {
          const update = { ...prev };
          update.feature[index].disabled = false;
          return prev;
        });
        setTimeout(() => {
          getRefElements("feature", index).focus();
        }, 0);
      }
    } else {
      resetDisabledInput();
    }

    revalidator.revalidate();
  };

  const deleteListHandler = (e: React.MouseEvent) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (!(e.target.parentElement instanceof HTMLSpanElement)) return;
    e.stopPropagation();
    setNewList(null);
    const group = e.target.parentElement.dataset.group;
    const index = Number(e.target.parentElement.dataset.index) as number;

    const resetDisabledInput = () => {
      const filterInput = (item: {
        pattern: RegExp;
        valid: boolean;
        firstTouch: boolean;
        error: string;
        disabled: boolean;
      }) => {
        if (item.valid && item.firstTouch) {
          return item;
        }
      };
      inputValidate.service
        .filter(filterInput)
        .map((item) => (item.disabled = true));
      inputValidate.feature
        .filter(filterInput)
        .map((item) => (item.disabled = true));
    };

    resetDisabledInput();

    if (group === "service") {
      setEditableData((prev) => {
        return {
          ...prev,
          services: [
            ...prev.services.slice(0, index),
            ...prev.services.slice(index + 1),
          ],
        };
      });
      setInputValidate((prev) => {
        return {
          ...prev,
          service: [
            ...prev.service.slice(0, index),
            ...prev.service.slice(index + 1),
          ],
        };
      });
    }

    if (group === "feature") {
      setEditableData((prev) => {
        return {
          ...prev,
          feature: [
            ...prev.feature.slice(0, index),
            ...prev.feature.slice(index + 1),
          ],
        };
      });
      setInputValidate((prev) => {
        return {
          ...prev,
          feature: [
            ...prev.feature.slice(0, index),
            ...prev.feature.slice(index + 1),
          ],
        };
      });
    }
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
    const group = e.target.dataset.group as string;
    const objectKey = e.target.dataset.key as string;
    const index = Number(e.target.dataset.index) as number;

    const testInput = (deepestGroup: string | null, isArray?: boolean) => {
      if (deepestGroup === group) {
        if (inputValidate[group][objectKey].pattern !== null) {
          const testValid = inputValidate[group][objectKey].pattern.test(value);
          testValid
            ? setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [group]: {
                    ...prevState[group],
                    [objectKey]: {
                      ...prevState[group][objectKey],
                      valid: true,
                    },
                  },
                };
              })
            : setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [group]: {
                    ...prevState[group],
                    [objectKey]: {
                      ...prevState[group][objectKey],
                      valid: false,
                    },
                  },
                };
              });
        }
        return;
      }

      if (deepestGroup === null && !isArray) {
        if (inputValidate[objectKey].pattern !== null) {
          const testValid = inputValidate[objectKey].pattern.test(value);
          testValid
            ? setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [objectKey]: { ...prevState[objectKey], valid: true },
                };
              })
            : setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [objectKey]: { ...prevState[objectKey], valid: false },
                };
              });
        }
        return;
      }

      if (inputValidate[objectKey][index].pattern !== null) {
        const testValid = inputValidate[objectKey][index].pattern.test(value);
        testValid
          ? setInputValidate((prevState) => {
              const update = { ...prevState };
              update[objectKey][index].valid = true;
              return update;
            })
          : setInputValidate((prevState) => {
              const update = { ...prevState };
              update[objectKey][index].valid = false;
              return update;
            });
      }
    };

    if (group) {
      setEditableData((prev) => {
        return { ...prev, [group]: { ...prev[group], [objectKey]: value } };
      });
      setInputValidate((prev) => {
        return {
          ...prev,
          [group]: {
            ...prev[group],
            [objectKey]: { ...prev[group][objectKey], firstTouch: true },
          },
        };
      });
      testInput(group, false);
      return;
    }

    if (objectKey === "service" || objectKey === "feature") {
      setEditableData((prev) => {
        if (objectKey === "service") {
          return {
            ...prev,
            services: [
              ...prev.services.slice(0, index),
              value,
              ...prev.services.slice(index + 1),
            ],
          };
        }
        if (objectKey === "feature") {
          return {
            ...prev,
            feature: [
              ...prev.feature.slice(0, index),
              value,
              ...prev.feature.slice(index + 1),
            ],
          };
        }

        return prev;
      });
      testInput(null, true);
      return;
    }

    setEditableData((prev) => {
      return { ...prev, [objectKey]: value };
    });
    setInputValidate((prev) => {
      return { ...prev, [objectKey]: { ...prev[objectKey], firstTouch: true } };
    });
    testInput(null, false);
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
    const group = e.target.dataset.group as string;
    const objectKey = e.target.dataset.key as string;
    const index = Number(e.target.dataset.index) as number;

    const testInput = (deepestGroup: string | null, isArray?: boolean) => {
      if (deepestGroup === group) {
        if (inputValidate[group][objectKey].pattern !== null) {
          const testValid = inputValidate[group][objectKey].pattern.test(value);
          testValid
            ? setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [group]: {
                    ...prevState[group],
                    [objectKey]: {
                      ...prevState[group][objectKey],
                      valid: true,
                    },
                  },
                };
              })
            : setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [group]: {
                    ...prevState[group],
                    [objectKey]: {
                      ...prevState[group][objectKey],
                      valid: false,
                    },
                  },
                };
              });
        }
        return;
      }

      if (deepestGroup === null && !isArray) {
        if (inputValidate[objectKey].pattern !== null) {
          const testValid = inputValidate[objectKey].pattern.test(value);
          testValid
            ? setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [objectKey]: { ...prevState[objectKey], valid: true },
                };
              })
            : setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [objectKey]: { ...prevState[objectKey], valid: false },
                };
              });
        }
        return;
      }

      if (inputValidate[objectKey][index].pattern !== null) {
        const testValid = inputValidate[objectKey][index].pattern.test(value);
        testValid
          ? setInputValidate((prevState) => {
              const update = { ...prevState };
              update[objectKey][index].valid = true;
              return update;
            })
          : setInputValidate((prevState) => {
              const update = { ...prevState };
              update[objectKey][index].valid = false;
              return update;
            });
      }
    };

    if (group) {
      setInputValidate((prevState) => {
        return {
          ...prevState,
          [group]: {
            ...prevState[group],
            [objectKey]: {
              ...prevState[group][objectKey],
              firstTouch: true,
            },
          },
        };
      });
      testInput(group);
      return;
    }

    if (objectKey === "service" || objectKey === "feature") {
      setEditableData((prev) => {
        if (objectKey === "service") {
          return {
            ...prev,
            services: [
              ...prev.services.slice(0, index),
              value,
              ...prev.services.slice(index + 1),
            ],
          };
        }
        if (objectKey === "feature") {
          return {
            ...prev,
            feature: [
              ...prev.feature.slice(0, index),
              value,
              ...prev.feature.slice(index + 1),
            ],
          };
        }

        return prev;
      });
      setInputValidate((prev) => {
        const update = { ...prev };
        if (objectKey === "service") {
          update.service.map((item, itemIndex) => {
            if (itemIndex === index) {
              item.firstTouch = true;
            }
          });
        }
        if (objectKey === "feature") {
          update.feature.map((item, itemIndex) => {
            if (itemIndex === index) {
              item.firstTouch = true;
            }
          });
        }
        return update;
      });
      testInput(null, true);

      return;
    }

    setInputValidate((prevState) => {
      return {
        ...prevState,
        [objectKey]: { ...prevState[objectKey], firstTouch: true },
      };
    });
    testInput(null);
  };

  const submitEditGuestHouseHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const getValidKeys = (obj: InputValidate): boolean => {
      const baseKeys = mapValues(obj, "valid");

      for (let baseKey in baseKeys) {
        if (!baseKeys[baseKey] && baseKeys[baseKey] !== undefined) {
          return false;
        }

        if (baseKeys[baseKey] === undefined) {
          const depthKeys = mapValues(obj[baseKey], "valid");
          for (let depthKey in depthKeys) {
            if (!depthKeys[depthKey] && depthKeys[depthKey] !== undefined) {
              return false;
            }
            if (depthKeys[depthKey] === undefined) {
              const deepestKeys = mapValues(obj[baseKey][depthKey], "valid");
              for (let deepestKey in deepestKeys) {
                if (
                  !deepestKeys[deepestKey] &&
                  deepestKeys[deepestKey] !== undefined
                ) {
                  return false;
                }
              }
            }
          }
        }
      }

      return true;
    };

    const setAllFirstTouchTrue = (obj: InputValidate) => {
      const baseKeys = mapValues(obj, "firstTouch");
      const updatedObject = { ...inputValidate };

      for (let baseKey in baseKeys) {
        if (baseKeys[baseKey] !== undefined && !baseKeys[baseKey]) {
          updatedObject[baseKey].firstTouch = true;
        } else if (baseKey === "service" || baseKey === "feature") {
          updatedObject[baseKey].map((item) => (item.firstTouch = true));
        } else if (baseKeys[baseKey] === undefined) {
          const depthKeys = mapValues(obj[baseKey], "firstTouch");
          for (let depthKey in depthKeys) {
            if (!depthKeys[depthKey]) {
              updatedObject[baseKey][depthKey].firstTouch = true;
            }
          }
        }
      }
      setInputValidate(inputValidate);
    };

    const testAllInput = (obj: InputValidate) => {
      const updated = { ...obj };
      for (let input in updated) {
        if (updated[input] instanceof Array) return;
        const pattern = updated[input].pattern;
        const value = editableData[input];

        if (pattern === undefined) {
          for (let depthInput in updated[input]) {
            const depthPattern = updated[input][depthInput].pattern;
            const depthValue = editableData[input][depthInput];
            if (depthPattern.test(depthValue)) {
              updated[input][depthInput].valid = true;
            } else {
              updated[input][depthInput].valid = false;
            }
          }
        } else {
          if (pattern.test(value)) {
            updated[input].valid = true;
          } else {
            updated[input].valid = false;
          }
        }
      }
      setInputValidate(updated);
    };

    testAllInput(inputValidate);

    setAllFirstTouchTrue(inputValidate);
    const valid = getValidKeys(inputValidate);
    if (valid) {
      const url = process.env.REACT_APP_BACKEND_API as string;
      setIsLoading(true);
      const response = await fetch(url + `/hotels/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
            message: data.message + " 5 másodperc múlva visszirányítunk!",
          },
        });
        setTimeout(() => {
          navigate("..");
        }, 5000);
      }
    }
  };

  return (
    <form
      onSubmit={submitEditGuestHouseHandler}
      className="w-full w-full laptop:w-4/5 desktop:w-1/2"
    >
      <EditGuestHouseTabs
        data={editableData}
        inputValidate={inputValidate}
        newListHandler={newListHandler}
        deleteListHandler={deleteListHandler}
        editListHandler={editListHandler}
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
  data: HotelsModelObject;
  objectsEqual: boolean;
  loading: boolean;
  resetFormHandler: (e: React.MouseEvent) => void;
}> = ({ data, objectsEqual, loading, resetFormHandler }) => {
  return (
    <div className="flex flex-col-reverse gap-2 px-4 justify-between items-end">
      <div className="flex gap-2 w-full">
        <Button
          disabled={objectsEqual}
          type="submit"
          className="w-full laptop:w-[unset]"
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
        <Button
          onClick={resetFormHandler}
          type="button"
          disabled={objectsEqual}
          outline
          className="w-full laptop:w-[unset] bg-red-600 hover:bg-red-600 disabled:hover:pointer-events-none disabled:pointer-events-none"
        >
          Elvétés
        </Button>
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
