import React, { useState, useEffect, useContext } from "react";
import { useRevalidator, useOutletContext } from "react-router-dom";
import { GiToken } from "react-icons/gi";
import { Label, TextInput, Button } from "flowbite-react";
import { FaSave } from "react-icons/fa";
import EditBookingTabs from "./EditBookingTabs";
import { BookingDateObject } from "../../models/Booking/BookingDate";
import { cloneDeep, isEqual, keys, mapKeys, mapValues } from "lodash";
import { ClipLoader } from "react-spinners";
import {
  ALERT_ACTION,
  ALERT_ACTION_TYPE,
  ALERT_TYPE,
} from "../../models/Alert/AlertModels";
import { Outlet } from "../../models/OutletModel";
import { HotelContext } from "../../context/HotelContextProvider";

export interface InputValidate extends Record<string, any> {
  costumer: {
    address: {
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
    };
    name: {
      pattern: RegExp;
      valid: boolean;
      firstTouch: boolean;
      error: string;
    };
    email: {
      pattern: RegExp;
      valid: boolean;
      firstTouch: boolean;
      error: string;
    };
    phone: {
      pattern: RegExp;
      valid: boolean;
      firstTouch: boolean;
      error: string;
    };
  };
  startDate: {
    pattern: null;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
  endDate: {
    pattern: null;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
  nightAmount: {
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
  personsAmount: {
    pattern: RegExp;
    valid: boolean;
    firstTouch: boolean;
    error: string;
  };
}

const EditBookingForm: React.FC<{
  data: BookingDateObject;
}> = (props) => {
  const data = props.data;
  const inputData: InputValidate = {
    costumer: {
      address: {
        country: {
          pattern: /^(\S\D{1,})$/,
          valid: true,
          firstTouch: false,
          error: "hiba!",
        },
        postalCode: {
          pattern: /^\d{4,}$/,
          valid: true,
          firstTouch: false,
          error: "hiba!",
        },
        city: {
          pattern: /^(\S\D{1,})$/,
          valid: true,
          firstTouch: false,
          error: "hiba!",
        },
        street: {
          pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
          valid: true,
          firstTouch: false,
          error: "hiba!",
        },
      },
      name: {
        pattern: /^(\S\D{1,})$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
      },
      email: {
        pattern: /^\S+@\S+\.\S+$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
      },
      phone: {
        pattern: /^\+?[0-9][0-9]{10,10}$/,
        valid: true,
        firstTouch: false,
        error: "hiba!",
      },
    },
    startDate: {
      pattern: null,
      valid: true,
      firstTouch: false,
      error: "hiba!",
    },
    endDate: {
      pattern: null,
      valid: true,
      firstTouch: false,
      error: "hiba!",
    },
    nightAmount: {
      pattern: /^[1-9]{1,}[0-9]?$/,
      valid: true,
      firstTouch: false,
      error: "hiba!",
    },
    personsAmount: {
      pattern: /^[1-9]{1,}[0-9]?$/,
      valid: true,
      firstTouch: false,
      error: "hiba!",
    },
  };
  const [editableData, setEditableData] = useState(cloneDeep(data));
  const backup = cloneDeep(props.data);
  const [objectsEqual, setObjectsEqual] = useState(true);
  const revalidator = useRevalidator();
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [inputValidate, setInputValidate] = useState<InputValidate>(
    cloneDeep(inputData)
  );
  const inputBackup = cloneDeep(inputData);
  const outletCtx = useOutletContext() as Outlet;
  const hotelCtx = useContext(HotelContext);

  // ! SIDE EFFECT: backup equal with editableDate?

  useEffect(() => {
    const cleanup = setTimeout(() => {
      setEditableData(cloneDeep(data));
    }, 100);

    return () => clearTimeout(cleanup);
  }, [data]);

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

  const inputChangeHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const value = e.target.value;
    const group = e.target.dataset.group as string;
    const depthGroup = e.target.dataset.depthGroup as string;
    const objectKey = e.target.dataset.key as string;

    const testInput = (deepestGroup: string | null) => {
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
      }

      if (deepestGroup === depthGroup) {
        if (inputValidate[group][depthGroup][objectKey].pattern !== null) {
          const testValid =
            inputValidate[group][depthGroup][objectKey].pattern.test(value);
          testValid
            ? setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [group]: {
                    ...prevState[group],
                    [depthGroup]: {
                      ...prevState[group][depthGroup],
                      [objectKey]: {
                        ...prevState[group][depthGroup][objectKey],
                        valid: true,
                      },
                    },
                  },
                };
              })
            : setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [group]: {
                    ...prevState[group],
                    [depthGroup]: {
                      ...prevState[group][depthGroup],
                      [objectKey]: {
                        ...prevState[group][depthGroup][objectKey],
                        valid: false,
                      },
                    },
                  },
                };
              });
        }
      }

      if (deepestGroup === null) {
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
      }
    };

    if (group && !depthGroup) {
      setEditableData((prevState) => {
        return {
          ...prevState,
          [group]: { ...prevState[group], [objectKey]: value },
        };
      });

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
    }

    if (group && depthGroup) {
      setEditableData((prevState) => {
        return {
          ...prevState,
          [group]: {
            ...prevState[group],
            [depthGroup]: {
              ...prevState[group][depthGroup],
              [objectKey]: value,
            },
          },
        };
      });

      setInputValidate((prevState) => {
        return {
          ...prevState,
          [group]: {
            ...prevState[group],
            [depthGroup]: {
              ...prevState[group][depthGroup],
              [objectKey]: {
                ...prevState[group][depthGroup][objectKey],
                firstTouch: true,
              },
            },
          },
        };
      });

      testInput(depthGroup);
    }

    if (!group && !depthGroup) {
      if (objectKey === "startDate" || objectKey === "endDate") {
        const isoFormat = `${value}T23:00:00.000Z`;
        setEditableData((prevState) => ({
          ...prevState,
          [objectKey]: value,
        }));

        testInput(null);
      } else {
        setEditableData((prevState) => ({
          ...prevState,
          [objectKey]: value,
        }));

        setInputValidate((prevState) => {
          return {
            ...prevState,
            [objectKey]: { ...prevState[objectKey], firstTouch: true },
          };
        });

        testInput(null);
      }
    }
  };

  const inputBlurHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const value = e.target.value;
    const group = e.target.dataset.group as string;
    const depthGroup = e.target.dataset.depthGroup as string;
    const objectKey = e.target.dataset.key as string;

    const testInput = (deepestGroup: string | null) => {
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
      }

      if (deepestGroup === depthGroup) {
        if (inputValidate[group][depthGroup][objectKey].pattern !== null) {
          const testValid =
            inputValidate[group][depthGroup][objectKey].pattern.test(value);
          testValid
            ? setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [group]: {
                    ...prevState[group],
                    [depthGroup]: {
                      ...prevState[group][depthGroup],
                      [objectKey]: {
                        ...prevState[group][depthGroup][objectKey],
                        valid: true,
                      },
                    },
                  },
                };
              })
            : setInputValidate((prevState) => {
                return {
                  ...prevState,
                  [group]: {
                    ...prevState[group],
                    [depthGroup]: {
                      ...prevState[group][depthGroup],
                      [objectKey]: {
                        ...prevState[group][depthGroup][objectKey],
                        valid: false,
                      },
                    },
                  },
                };
              });
        }
      }

      if (deepestGroup === null) {
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
      }
    };

    if (group && !depthGroup) {
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
    }

    if (group && depthGroup) {
      setInputValidate((prevState) => {
        return {
          ...prevState,
          [group]: {
            ...prevState[group],
            [depthGroup]: {
              ...prevState[group][depthGroup],
              [objectKey]: {
                ...prevState[group][depthGroup][objectKey],
                firstTouch: true,
              },
            },
          },
        };
      });

      testInput(depthGroup);
    }

    if (!group && !depthGroup) {
      setInputValidate((prevState) => {
        return {
          ...prevState,
          [objectKey]: { ...prevState[objectKey], firstTouch: true },
        };
      });

      testInput(null);
    }
  };

  const submitEditHandler = async (e: React.FormEvent) => {
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

    const valid = getValidKeys(inputValidate);
    if (valid) {
      const url = process.env.REACT_APP_BACKEND_API as string;
      setEditLoading(true);
      const response = await fetch(
        url + `/booking/${data._id}?hotel=${hotelCtx.hotelUUID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableData),
        }
      );

      if (!response.ok) {
        revalidator.revalidate();
        setEditLoading(false);
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.FAILURE,
            message: `Valami hiba történt! Próbáld újra!`,
          },
        });
      } else {
        setObjectsEqual(true);
        setEditLoading(false);
        revalidator.revalidate();
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.SUCCESS,
            message: `Sikeresen szerkesztetted a ${editableData._id} azonosítójú foglalást!`,
          },
        });
      }
    }
  };

  return (
    <article className="p-4 bg-gray-200 laptop:shadow-lg flex flex-col space-y-8 laptop:rounded-3xl w-full laptop:w-4/5 desktop:w-1/2">
      <form onSubmit={submitEditHandler}>
        <EditBookingTabs
          data={editableData}
          inputChangeHandler={inputChangeHandler}
          inputValidate={inputValidate}
          inputBlurHandler={inputBlurHandler}
        />
        <ButtonArea
          data={data}
          objectsEqual={objectsEqual}
          loading={editLoading}
          resetFormHandler={resetFormHandler}
        />
      </form>
    </article>
  );
};

export default EditBookingForm;

export const ButtonArea: React.FC<{
  data: BookingDateObject;
  objectsEqual: boolean;
  loading: boolean;
  resetFormHandler: (e: React.MouseEvent) => void;
}> = ({ data, objectsEqual, loading, resetFormHandler }) => {
  return (
    <div className="flex gap-2 flex-col-reverse justify-between items-end">
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
        <Label htmlFor="booking-id" value="Fogalás azonosító" />
        <TextInput
          id="booking-id"
          disabled
          rightIcon={GiToken}
          value={data._id}
        />
      </div>
    </div>
  );
};
