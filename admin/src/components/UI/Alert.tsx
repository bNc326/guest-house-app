import React, { useEffect } from "react";
import { Alert } from "flowbite-react";
import {
  ALERT_TYPE,
  ALERT_ACTION,
  ALERT_ACTION_TYPE,
} from "../../models/Alert/AlertModels";
import { MdWarning, MdCheckCircleOutline, MdOutlineInfo } from "react-icons/md";
const AlertComponent: React.FC<{
  isShow: boolean;
  type: string;
  message: string;
  deleteAlertDispatch: React.Dispatch<ALERT_ACTION>;
}> = (props) => {
  useEffect(() => {
    if (!props.isShow) return;

    const timeout = setTimeout(() => {
      props.deleteAlertDispatch({ type: ALERT_ACTION_TYPE.HIDE });
      clearTimeout(timeout);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.isShow]);
  return (
    <>
      {props.isShow && (
        <div className="fixed bottom-8 left-0 w-full z-[10000]  flex items-center justify-center animate__animated animate__fadeInUp">
          <Alert
            color={props.type}
            onDismiss={() =>
              props.deleteAlertDispatch({ type: ALERT_ACTION_TYPE.HIDE })
            }
            className=""
          >
            <span className="px-2 flex gap-1 items-center">
              <span>
                {props.type === ALERT_TYPE.SUCCESS && (
                  <MdCheckCircleOutline size={24} />
                )}
                {props.type === ALERT_TYPE.FAILURE && <MdWarning size={24} />}
                {props.type === ALERT_TYPE.INFO && <MdOutlineInfo size={24} />}
              </span>
              <span className="font-semibold">
                {props.type === ALERT_TYPE.SUCCESS ? "Siker!" : ""}
                {props.type === ALERT_TYPE.FAILURE ? "Hoppáá!" : ""}
                {props.type === ALERT_TYPE.INFO ? "Info!" : ""}
              </span>{" "}
              {props.message}
            </span>
          </Alert>
        </div>
      )}
    </>
  );
};

export default AlertComponent;
