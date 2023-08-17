import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import ScrollToTop from "ScrollToTop";
import useAlert from "hooks/useAlert";
import { Outlet as OutletModel } from "models/OutletModel";
import AlertComponent from "components/UI/Alert";
const Root = () => {
  const { alert, alertDispatch } = useAlert();
  const outletCtx: OutletModel = { alertDispatch, alert };

  return (
    <>
      <ScrollToTop />
      <section className="parent relative h-screen">
        <header className="nav-header fixed w-full top-0 z-[1000] bg-palette-3 shadow-md flex flex-col items-center justify-center">
          <Navigation />
        </header>
        <main className="outlet h-full">
          <Outlet context={outletCtx} />
        </main>
        <AlertComponent
          isShow={alert.isShow}
          message={alert.message}
          type={alert.alertType}
          deleteAlertDispatch={alertDispatch}
        />
      </section>
    </>
  );
};

export default Root;
