import ReactDOM from "react-dom";
import ModalContainer from "./ModalContainer";

const Backdrop: React.FC<{
  children: JSX.Element | JSX.Element[];
  closeModalHandler: () => void;
  backdropClose?: boolean;
  header?: boolean;
  headerTitle?: string;
}> = ({ children, closeModalHandler, backdropClose, header, headerTitle }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalContainer
          children={children}
          closeModalHandler={closeModalHandler}
          backdropClose={backdropClose && backdropClose}
          header={header && header}
          headerTitle={headerTitle && headerTitle}
        />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
    </>
  );
};

export default Backdrop;
