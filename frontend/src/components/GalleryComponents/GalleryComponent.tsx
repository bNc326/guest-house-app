import { Gallery } from "models/GalleryModel";
import { LIGHTBOX_ACTION, LIGHTBOX_TYPE } from "models/IsLightboxModel";
import React from "react";
import { SlideImage } from "yet-another-react-lightbox";

const GalleryComponent: React.FC<{
  gallery: SlideImage[];
  lightboxDispatch: React.Dispatch<LIGHTBOX_ACTION>;
}> = ({ gallery, lightboxDispatch }) => {
  return (
    <div className=" text-black flex flex-wrap gap-4 justify-center">
      {gallery &&
        gallery.map((img, index) => (
          <img
            key={index}
            onClick={() => {
              lightboxDispatch({ type: LIGHTBOX_TYPE.SHOW, index: index });
            }}
            src={img.src}
            alt={img.alt}
            className="w-[calc(100%-1rem)] mobile:w-[calc(50%-1rem)] tablet:w-[calc(33%-1rem)] laptop:w-[calc(25%-1rem)] rounded-xl shadow-shadow hover:scale-105 transition ease-in-out duration-300 cursor-pointer "
          />
        ))}
    </div>
  );
};

export default GalleryComponent;
