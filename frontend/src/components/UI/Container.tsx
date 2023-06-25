import React from "react";
import styled from "styled-components";

interface SectionProps {
  color?: string;
  gradient?: string;
  bgImage?: string;
  hidden?: boolean;
}
interface ContainerProps {
  mobileWrap?: boolean;
  tabletWrap?: boolean;
  tallWrap?: boolean;
}

const Section = styled.section<SectionProps>`
  height: 100%;
  min-height: 100vh;
  padding-top: 13vh;
  padding-bottom: 13vh;
  background: ${(props) => (props.color ? props.color : props.gradient)};
  ${(props) =>
    props.bgImage &&
    `background-image: url("${props.bgImage}");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;`}
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${(props) => props.hidden && "overflow: hidden;"}
  @media (min-width: 768px) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`;
const ContainerStyle = styled.div<ContainerProps>`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1366px;
  min-with: 1200px;
  gap: 2rem;
  width: 91.666667%;
  height: 100%;
  flex-direction: column;

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
    flex-direction: row;
  }
  
  @media (min-width: 1920px) {
  }

  @media (max-height: 650px) {
  }
`;
const Container: React.FC<{
  children: JSX.Element | JSX.Element[];
  relative?: boolean;
  mobileWrap?: boolean;
  tabletWrap?: boolean;
  tallWrap?: boolean;
  color?: string;
  gradient?: string;
  bgImage?: string;
  hidden?: boolean;
}> = (props) => {
  return (
    <Section
      color={props.color}
      gradient={props.gradient}
      bgImage={props.bgImage}
      hidden={props.hidden}
    >
      <ContainerStyle
        mobileWrap={props.mobileWrap}
        tabletWrap={props.tabletWrap}
        tallWrap={props.tallWrap}
      >
        {props.children}
      </ContainerStyle>
    </Section>
  );
};

export default Container;
