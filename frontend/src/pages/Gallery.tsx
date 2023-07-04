import Container from "components/UI/Container";
import { useEffect, useState, useRef, useReducer } from "react";
import { Gallery as GalleryModel } from "models/GalleryModel";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import {
  Thumbnails,
  Counter,
  Zoom,
  Slideshow,
  Fullscreen,
  Captions,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";
import {
  LIGHTBOX_TYPE,
  LIGHTBOX_ACTION,
  LIGHTBOX_INITIAL_STATE as INITIAL_STATE,
} from "models/IsLightboxModel";
import GalleryComponent from "components/GalleryComponents/GalleryComponent";

const LIGHTBOX_INITIAL_STATE: INITIAL_STATE = {
  isShow: false,
  index: 0,
};

const lightboxReducer = (state: INITIAL_STATE, action: LIGHTBOX_ACTION) => {
  switch (action.type) {
    case LIGHTBOX_TYPE.SHOW:
      if (!action.index && action.index !== 0) return state;
      return {
        isShow: true,
        index: action.index,
      };
    case LIGHTBOX_TYPE.HIDE: {
      return {
        isShow: false,
        index: 0,
      };
    }
    default:
      return state;
  }
};

const Gallery = () => {
  const [lightBoxSrc, setLightBoxSrc] = useState<SlideImage[]>([]);
  const [isLightBox, lightboxDispatch] = useReducer(
    lightboxReducer,
    LIGHTBOX_INITIAL_STATE
  );

  useEffect(() => {
    const getGallery = async () => {
      const url = process.env.REACT_APP_BACKEND_API as string;

      const response = await fetch(url + "/gallery");

      if (!response.ok || response.status !== 200) {
      } else {
        const data: GalleryModel[] = await response.json();

        const srcArray: SlideImage[] = [];
        data.map((img) => {
          const update = {
            src: `store/images/gallery/${img.path}`,
            alt: img.alt,
          };
          srcArray.push(update);
        });
        setLightBoxSrc(srcArray);
      }
    };

    const cleanup = setTimeout(() => {
      getGallery();
    }, 100);

    return () => {
      clearTimeout(cleanup);
    };
  }, []);

  return (
    <Container
      gradient="linear-gradient(107.56deg, #e6ccb2 0%, #ddb892 79.17%)"
      bgImage="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1200' height='630' preserveAspectRatio='none' viewBox='0 0 1200 630'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1055%26quot%3b)' fill='none'%3e%3crect width='1200' height='630' x='0' y='0' fill='rgba(221%2c 184%2c 146%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c449.947C82.734%2c439.85%2c145.293%2c379.132%2c220.31%2c342.809C307.995%2c300.352%2c419.197%2c295.906%2c478.217%2c218.395C540.584%2c136.489%2c553.345%2c24.431%2c540.512%2c-77.714C527.556%2c-180.839%2c488.842%2c-288.801%2c406.523%2c-352.254C327.675%2c-413.032%2c216.474%2c-386.214%2c118.365%2c-403.116C33.729%2c-417.697%2c-46.704%2c-463.145%2c-130.603%2c-444.792C-217.085%2c-425.874%2c-288.941%2c-367.501%2c-347.59%2c-301.189C-406.659%2c-234.403%2c-447.633%2c-154.316%2c-464.88%2c-66.84C-482.759%2c23.84%2c-484.641%2c119.727%2c-447.243%2c204.249C-409.628%2c289.261%2c-339.284%2c356.396%2c-257.807%2c401.156C-179.567%2c444.138%2c-88.612%2c460.761%2c0%2c449.947' fill='%23d19f6b'%3e%3c/path%3e%3cpath d='M1200 1210.813C1311.396 1216.693 1437.267 1200.2530000000002 1515.164 1120.405 1591.363 1042.298 1570.335 915.963 1591.9859999999999 809.014 1608.384 728.015 1631.748 651.124 1626.8690000000001 568.626 1621.627 479.988 1602.719 394.94399999999996 1562.805 315.628 1513.171 216.99599999999998 1469.445 100.68299999999999 1368.674 55.548 1265.937 9.533000000000015 1137.494 26.817999999999984 1038.775 80.91700000000003 946.017 131.74900000000002 926.3399999999999 252.964 859.236 334.726 794.6410000000001 413.43100000000004 687.187 455.50800000000004 652.712 551.312 615.478 654.783 618.226 774.804 665.071 874.294 711.716 973.36 812.8340000000001 1029.9189999999999 905.517 1088.225 997.377 1146.013 1091.626 1205.092 1200 1210.813' fill='%23e9d2b9'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1055'%3e%3crect width='1200' height='630' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e"
    >
      <GalleryComponent
        gallery={lightBoxSrc}
        lightboxDispatch={lightboxDispatch}
      />
      <Lightbox
        open={isLightBox.isShow}
        plugins={[Thumbnails, Counter, Zoom, Slideshow, Fullscreen]}
        close={() => lightboxDispatch({ type: LIGHTBOX_TYPE.HIDE })}
        index={isLightBox.index}
        slides={lightBoxSrc}
        controller={{ closeOnPullDown: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
          thumbnail: { border: "none", backgroundColor: "transparent" },
          thumbnailsContainer: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
        }}
      />
    </Container>
  );
};

export default Gallery;
