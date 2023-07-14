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
    <section className="guest-house-bg w-full min-h-full flex justify-center p-4 pt-20">
      <div className="w-[1366px] h-full flex gap-4">
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
      </div>
    </section>
  );
};

export default Gallery;
