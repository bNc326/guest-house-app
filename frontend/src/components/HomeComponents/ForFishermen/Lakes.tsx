import React from "react";
import FacebookSvg from "components/UI/svg/FacebookSvg";
import GoogleMaps from "components/UI/svg/GoogleMaps";
import Website from "components/UI/svg/Website";
import SmallLake from "components/UI/svg/SmallLake";
import ColorfulMap from "components/UI/svg/ColorfulMap";
import Depth from "components/UI/svg/Depth";
import Carp from "components/UI/svg/Carp";
import { Link } from "react-router-dom";
import { BsFacebook, BsMapFill } from "react-icons/bs";
import { RxOpenInNewWindow } from "react-icons/rx";
import { AnimationOnScroll } from "react-animation-on-scroll";

type iconData = {
  name: string;
  link: string;
};

type LinkType = {
  facebook: iconData;
  maps: iconData;
  web?: iconData;
};
export interface Lake {
  id: string;
  lakeName: string;
  lakeData: string[];
  lakeImg: string;
  links: LinkType;
}

const listIcon = [
  { text: "Hely:", icon: <ColorfulMap /> },
  { text: "Terület:", icon: <SmallLake /> },
  { text: "Mélység:", icon: <Depth /> },
  { text: "Halállomány:", icon: <Carp /> },
];

const Lakes: React.FC<{
  data?: Lake;
  designSvg?: JSX.Element;
  designBg?: JSX.Element;
  underWater?: boolean;
}> = (props) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="w-full z-10 flex flex-col items-center tablet:flex-row-reverse gap-8">
        <div
          className={`rounded-3xl w-full mobile:w-4/5 flex tablet:items-center shadow-lg ${
            !props.underWater ? "text-palette-4 bg-palette-5/30" : ""
          } ${props.underWater ? "text-[#0C4D5B] bg-[#0C4D5B]/30" : ""}`}
        >
          <ul
            className={` flex flex-col gap-6 text-dynamicList mobile:w-full  p-2 rounded-3xl`}
          >
            {props.data?.lakeData.map((lake, index) => (
              <AnimationOnScroll
                animateOnce
                animatePreScroll={false}
                animateIn={"animate__fadeInUp"}
                key={index}
                className="flex flex-col gap-2 w-full "
              >
                <div className="flex gap-4 items-center min-h-[40px]">
                  <span className="h-dynamicIcon w-dynamicIcon  flex items-center justify-center">
                    {listIcon[index].icon}
                  </span>
                  <p>
                    {listIcon[index].text}{" "}
                    <span className="font-bold">{lake}</span>
                  </p>
                </div>
              </AnimationOnScroll>
            ))}
          </ul>
          <div className="h-full self-end tablet:hidden">{props.designBg}</div>
        </div>
        <AnimationOnScroll
          animateOnce
          animatePreScroll={false}
          animateIn={"animate__fadeInLeft"}
          className="flex flex-col gap-4 w-full mobile:w-4/5"
        >
          <img
            src={props.data?.lakeImg}
            alt={props.data?.lakeName}
            className="max-w-none w-full max-h-[280px] rounded-3xl shadow-shadow"
          />
        </AnimationOnScroll>
      </div>
      <div className="flex tablet:justify-center">
        <ul className="flex gap-3 items-center">
          {props.data?.links.facebook && (
            <AnimationOnScroll
              animateOnce
              animatePreScroll={false}
              animateIn={"animate__fadeInUp"}
            >
              <Link to={props.data.links.facebook.link} target={"_blank"}>
                <li>
                  <BsFacebook
                    className={`transition-colors ease-in-out duration-300 h-dynamicSocialIcon w-dynamicSocialIcon ${
                      props.underWater
                        ? "fill-[#0C4D5B] hover:fill-[#0C4D5B]/75"
                        : "fill-[#7F5539] hover:fill-[#7F5539]/75"
                    }`}
                  />
                </li>
              </Link>
            </AnimationOnScroll>
          )}
          {props.data?.links.maps && (
            <AnimationOnScroll
              animateOnce
              animatePreScroll={false}
              animateIn={"animate__fadeInUp"}
            >
              <Link to={props.data.links.maps.link} target={"_blank"}>
                <li>
                  <BsMapFill
                    className={`transition-colors ease-in-out duration-300 h-dynamicSocialIcon w-dynamicSocialIcon ${
                      props.underWater
                        ? "fill-[#0C4D5B] hover:fill-[#0C4D5B]/75"
                        : "fill-[#7F5539] hover:fill-[#7F5539]/75"
                    }`}
                  />
                </li>
              </Link>
            </AnimationOnScroll>
          )}
          {props.data?.links.web && (
            <AnimationOnScroll
              animateOnce
              animatePreScroll={false}
              animateIn={"animate__fadeInUp"}
            >
              <Link to={props.data.links.web.link} target={"_blank"}>
                <li>
                  <RxOpenInNewWindow
                    className={`transition-colors ease-in-out duration-300 h-dynamicSocialIcon w-dynamicSocialIcon ${
                      props.underWater
                        ? "text-[#0C4D5B] hover:text-[#0C4D5B]/75"
                        : "text-[#7F5539] hover:text-[#7F5539]/75"
                    }`}
                  />
                </li>
              </Link>
            </AnimationOnScroll>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Lakes;
