import Container from "components/UI/Container";
import React from "react";
import Form from "./Form";
import Map from "components/UI/svg/Map";
import Footer from "../Footer";
const Contact = () => {

  return (
    <Container color={"#B08968"}>
      <div className="flex w-full gap-8 flex-col-reverse tablet:flex-row">
        <div className="min-w-0 w-full tablet:w-1/2 max-w-none bg-[#442c15] p-8 rounded-3xl flex items-center justify-center flex-col">
          <div className="w-full flex flex-col justify-center gap-4">
            <h2 className="flex flex-col items-center justify-center w-full  text-dynamicTitle text-[#E2C8AE]">
              Kérdése van?
              <span className="w-full text-center font-bold ">
                írjon nekünk!
              </span>
            </h2>
            <Form />
          </div>
        </div>
        <div className="flex items-center justify-center self-center  mobile:w-4/6 tablet:w-1/2">
          <Map />
        </div>
      </div>
    </Container>
  );
};

export default Contact;
