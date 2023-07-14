import Container from "components/UI/Container";
import React from "react";
import Form from "./Form";
import Map from "components/UI/svg/Map";
import VectorMap from "components/UI/svg/VectorMap";
import Footer from "../Footer";
import { AnimationOnScroll } from "react-animation-on-scroll";
const Contact = () => {
  return (
    <Container color={"#B08968"}>
      <div className="flex w-full gap-8 flex-col-reverse tablet:flex-row">
        <div className="min-w-0 w-full tablet:w-1/2 max-w-none bg-[#442c15] p-8 rounded-3xl flex items-center justify-center flex-col">
          <div className="w-full flex flex-col justify-center gap-4">
            <AnimationOnScroll animateOnce animatePreScroll={false} animateIn={'animate__fadeInUp'} className="flex flex-col items-center justify-center w-full  text-dynamicTitle text-[#E2C8AE]">
              Kérdése van?
              <span className="w-full text-center font-bold ">
                írjon nekünk!
              </span>
            </AnimationOnScroll>
            <Form />
          </div>
        </div>
        <AnimationOnScroll
          animateOnce
          animatePreScroll={false}
          animateIn={"animate__fadeInRight"}
          className="flex items-center justify-center self-center  mobile:w-4/6 tablet:w-1/2"
        >
          <VectorMap />
        </AnimationOnScroll>
      </div>
    </Container>
  );
};

export default Contact;
