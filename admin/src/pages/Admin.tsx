import { details } from "../models/Auth/AuthModel";
import { Alert } from "flowbite-react";
import { HiBellAlert } from "react-icons/hi2";
import { useAuthUser } from "react-auth-kit";

const Admin = () => {
  const authUser = useAuthUser();
  const user = authUser() as details;

  return (
    <div className="text-black flex flex-col gap-4 items-center justify-center text-center w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-dynamicTitle2">Kedves {user?.username}!</h2>
        <h3 className="text-dynamicTitle3">Üdvözöljük az adminfelületen!</h3>

        <Alert color="info" icon={HiBellAlert}>
          <span className="text-dynamicMedium">
            <span className="font-bold">Info! </span>
            Felhívom a figyelmét hogy az oldal még fejlesztés alatt áll, ezért
            előfordulhatnak hibák!
          </span>
        </Alert>

        <p className="font-bold text-dynamicTitle3"></p>
        <p className="text-dynamicMedium font-normal">
          Ez egy admin felület a{" "}
          <a href="https://guest-house-app.onrender.com" target="_blank">
            guest-house-app.onrender.com
          </a>{" "}
          vendégház applikációhoz!
        </p>
      </div>
      {/* <div className="flex flex-col gap-1">
        <h2 className="text-dynamicTitle2">Dear {outletContext.username}!</h2>
        <h3 className="text-dynamicTitle3">Welcome to my Admin dashboard!</h3>

        <Alert color="info" icon={HiBellAlert}>
          <span className="text-dynamicMedium">
            <span className="font-bold">Info! </span>I call attention, that site
            develop under still yet, therefore errors may occur!
          </span>
        </Alert>

        <p className="font-bold text-dynamicTitle3"></p>
        <p className="text-dynamicMedium font-normal">
          This is a admin dashboard to my{" "}
          <a href="https://guest-house-app.onrender.com">
            guest-house.app.onrender.com
          </a>{" "}
          guest house app!
        </p>
      </div> */}
    </div>
  );
};

export default Admin;
