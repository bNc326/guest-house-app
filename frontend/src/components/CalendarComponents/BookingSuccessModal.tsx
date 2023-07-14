import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottiePlayer } from "lottie-react";
import BookingSuccess from "../../assets/Lotties/booking_success.json";
const BookingSuccessModal: React.FC<{
  message: string;
  bookingId: string;
  name: string;
  setBookingSuccess: React.Dispatch<
    React.SetStateAction<{
      isSuccess: boolean;
      name: string;
      message: string;
      bookingId: string;
    }>
  >;
}> = (props) => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black/50 z-[1500] backdrop-blur-sm">
      <div className="bg-palette-3 rounded-lg w-11/12 max-w-[630px]  p-4 py-8 shadow-xl flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20">
            <Lottie animationData={BookingSuccess} loop={false} />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-dynamicTitle3">
              Köszönjük, kedves{" "}
              <span className="whitespace-nowrap">{props.name}</span>
            </h2>
            <p className="text-dynamicList flex gap-1 opacity-50">
              Foglalás:<span className="font-semibold">{props.bookingId}</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-dynamicList ">{props.message}</p>
            <p className="text-dynamicMedium ">
              A jóváhagyás után e-mailben értesítünk!
            </p>
          </div>
          <button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              props.setBookingSuccess({
                isSuccess: false,
                name: "",
                message: "",
                bookingId: "",
              });
              navigate("/naptar");
            }}
            className="p-2 rounded-lg bg-palette-4 text-palette-2"
          >
            visszalépés
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
