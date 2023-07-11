import { Button, Modal } from "flowbite-react";
import {
  IS_SURE_ACTION,
  IS_SURE_INITIAL_STATE,
  IS_SURE_ENUM,
} from "../../models/IsSure/IsSure";
import ModalContainer from "./ModalContainer";
import Backdrop from "./Backdrop";

const ModalComp: React.FC<{
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isSure: IS_SURE_INITIAL_STATE;
  isSureDispatch: React.Dispatch<IS_SURE_ACTION>;
}> = (props) => {
  const closeModalHandler = () => {
    props.setIsShow(false);
  };

  const sureButtonHandler = () => {
    const isSure = props.isSure;
    const isSureDispatch = props.isSureDispatch;
    const setIsShow = props.setIsShow;
    if (isSure.actionType === "ACCEPT") {
      isSureDispatch({ type: IS_SURE_ENUM.ACCEPT, payload: { isSure: true } });
      setIsShow(false);
    }

    if (isSure.actionType === "EJECT") {
      isSureDispatch({ type: IS_SURE_ENUM.EJECT, payload: { isSure: true } });
      setIsShow(false);
    }

    if (isSure.actionType === "DELETE") {
      isSureDispatch({ type: IS_SURE_ENUM.DELETE, payload: { isSure: true } });
      setIsShow(false);
    }
  };
  const ejectButtonHandler = () => {
    const setIsShow = props.setIsShow;
    const isSureDispatch = props.isSureDispatch;
    isSureDispatch({ type: IS_SURE_ENUM.RESET });
    setIsShow(false);
  };
  return (
    <>
      {props.isShow && (
        <Backdrop backdropClose closeModalHandler={closeModalHandler}>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {props.isSure.actionType === "ACCEPT" &&
                "Szeretnéd elfogadni a foglalást?"}

              {props.isSure.actionType === "EJECT" &&
                "Szeretnéd elutasítani a foglalást?"}
              {props.isSure.actionType === "DELETE" &&
                "Szeretnéd törölni a képet?"}
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={sureButtonHandler} color="failure">
                Igen, szeretném!
              </Button>
              <Button onClick={ejectButtonHandler} color="gray">
                Nem, én nem!
              </Button>
            </div>
          </div>
        </Backdrop>
      )}
    </>

    // <Modal
    //   dismissible
    //   onClose={() => props.setIsShow(false)}
    //   show={props.isShow}
    //   size="md"
    //   popup={true}
    // >
    //   <Modal.Header />
    //   <Modal.Body>
    //     <div className="text-center">
    //       <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
    //         {props.isSure.actionType === "ACCEPT" &&
    //           "Szeretnéd elfogadni a foglalást?"}

    //         {props.isSure.actionType === "EJECT" &&
    //           "Szeretnéd elutasítani a foglalást?"}
    //         {props.isSure.actionType === "DELETE" &&
    //           "Szeretnéd törölni a képet?"}
    //       </h3>
    //       <div className="flex justify-center gap-4">
    //         <Button onClick={sureButtonHandler} color="failure">
    //           Igen, szeretném!
    //         </Button>
    //         <Button onClick={ejectButtonHandler} color="gray">
    //           Nem, én nem!
    //         </Button>
    //       </div>
    //     </div>
    //   </Modal.Body>
    // </Modal>
  );
};

export default ModalComp;
