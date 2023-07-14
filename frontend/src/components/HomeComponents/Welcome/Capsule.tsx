import React from "react";
import { IconType } from "react-icons/lib";
import { AnimationOnScroll } from "react-animation-on-scroll";
const Capsule: React.FC<{
  Icon?: IconType;
  text: string;
  className?: string;
  iconSize?: number;
  animationIndex?: number;
}> = (props) => {
  const { Icon, text, className, iconSize } = { ...props };
  return (
    <AnimationOnScroll
      offset={35}
      animateOnce
      animatePreScroll={false}
      animateIn={"animate__fadeInUp"}
      className={`flex items-center justify-center px-2 py-1 gap-2 bg-palette-4 rounded-full w-max shadow-md ${
        props.animationIndex === 0 ? "animate__animated animate__fadeInUp" : ""
      } ${className ? className : ""} `}
    >
      {Icon && <Icon size={iconSize ? iconSize : 24} />}
      <p>{text}</p>
    </AnimationOnScroll>
  );
};

export default Capsule;
