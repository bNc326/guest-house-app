import { Gallery } from "models/GalleryModel";
import { LIGHTBOX_ACTION, LIGHTBOX_TYPE } from "models/IsLightboxModel";
import React from "react";
import { SlideImage } from "yet-another-react-lightbox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const GalleryComponent: React.FC<{
  gallery: SlideImage[];
  lightboxDispatch: React.Dispatch<LIGHTBOX_ACTION>;
}> = ({ gallery, lightboxDispatch }) => {
  return (
    <div className=" text-black flex flex-wrap gap-4">
      {gallery &&
        gallery.map((img, index) => (
          <div className=" w-[calc(100%)] mobile:w-[calc(50%-1rem/2)] tablet:w-[calc(33%-1rem/2)] laptop:w-[calc(25%-.75rem)] rounded-xl shadow-shadow hover:scale-105 transition ease-in-out duration-300 cursor-pointer ">
            <LazyLoadImage
              effect="blur"
              key={index}
              onClick={() => {
                lightboxDispatch({ type: LIGHTBOX_TYPE.SHOW, index: index });
              }}
              src={`${img.src}`}
              alt={img.alt}
              className="h-full w-full rounded-xl"
            />
          </div>
        ))}
    </div>
  );
};

export default GalleryComponent;
