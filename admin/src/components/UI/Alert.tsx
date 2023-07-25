import React, { useEffect } from "react";
import { Alert } from "flowbite-react";
import {
  ALERT_TYPE,
  ALERT_ACTION,
  ALERT_ACTION_TYPE,
} from "../../models/Alert/AlertModels";
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
            <span className="px-2">
              <span className="font-bold">
                {props.type === ALERT_TYPE.SUCCESS ? "Siker!" : ""}
                {props.type === ALERT_TYPE.FAILURE ? "Hoppáá!" : ""}
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
