import Button from "../../UI/Button";
import woodenHouse from "assets/images/dummy-image.jpg";
import { useNavigate } from "react-router-dom";
import Container from "../../UI/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Keyboard } from "swiper";

const Hero = () => {
  const navigate = useNavigate();

  const cardStyle = "rounded-3xl shadow-shadow";
  return (
    <Container
      gradient="linear-gradient(107.56deg, #e6ccb2 0%, #ddb892 79.17%)"
      mobileWrap
      hidden
    >
      <div className="w-11/12 tablet:w-1/2 flex flex-col gap-8">
        <div className="text-palette-4 flex flex-col gap-4 tall:items-center">
          <h1 className="text-dynamicTitle font-bold">Derek's Hotel</h1>
          <p className="text-dynamicDesc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non
            odio massa. Nunc ut vestibulum ex, ac sollicitudin lorem. Phasellus
            in ante rhoncus, dignissim nunc et, accumsan dolor.
          </p>
        </div>
        <div className="w-full flex flex-col mobile:flex-row tablet:flex-col laptop:flex-row tall:text-xl tall:gap-4 gap-4">
          <Button
            onClick={() => navigate("naptar")}
            btnText="Foglalás most"
            className="w-full mobile:w-1/2 tablet:w-full py-2 laptop:max-h-[50px] tall:py-2 max-h-[44px]"
          />
          <Button
            btnText="Részletek"
            className="w-full mobile:w-1/2 tablet:w-full py-2 laptop:max-h-[50px] tall:py-2 max-h-[44px]"
            bordered
          />
        </div>
      </div>
      <div className="w-11/12 mobile:w-4/6 tablet:w-2/5 desktop:w-1/2 flex flex-col pl-0">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Keyboard]}
          keyboard={{
            enabled: true,
          }}
          className="w-full "
        >
          <SwiperSlide className={cardStyle}>
            <img src={woodenHouse} alt="Wooden house" className="w-full" />
          </SwiperSlide>
          <SwiperSlide className={cardStyle}>
            <img src={woodenHouse} alt="Wooden house" className="w-full" />
          </SwiperSlide>
          <SwiperSlide className={cardStyle}>
            <img src={woodenHouse} alt="Wooden house" className="w-full" />
          </SwiperSlide>
        </Swiper>
      </div>
    </Container>
  );
};

export default Hero;
