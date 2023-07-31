import React from "react";
import {
  DeleteCheckbox,
  Gallery as GalleryModel,
} from "../../models/Gallery/Gallery";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  changeCheckboxHandler: (e: React.ChangeEvent) => void;
  deleteCheckbox: DeleteCheckbox[];
  imageSrc: GalleryModel[];
}

const ImageBox: React.FC<Props> = ({
  changeCheckboxHandler,
  deleteCheckbox,
  imageSrc,
}) => {
  return (
    <>
      {imageSrc &&
        imageSrc.map((img, index) => (
          <div
            key={img.id}
            className="w-full mobile:w-[calc(33%-.8rem)] tablet:w-[calc(25%-.8rem)] laptop:w-[calc(20%-.8rem)] flex flex-col rounded-3xl overflow-hidden shadow-shadow relative"
          >
            <input
              onChange={changeCheckboxHandler}
              checked={deleteCheckbox[index]?.checked}
              data-id={img.id}
              type="checkbox"
              id={img.id}
              className="absolute z-10 top-[calc(1.25rem/2)] right-[calc(1.25rem/2)] w-5 h-5 rounded-3xl outline-none bg-white checked:bg-[#636060] active:ring-0 active:ring-transparent focus:ring-0 focus:ring-transparent cursor-pointer transition-all ease-in-out duration-300"
            />
            <label
              htmlFor={img.id}
              className="w-full h-full cursor-pointer relative"
            >
              <LazyLoadImage
                src={`store/images/gallery/${img.path}`}
                alt={img.alt}
                className="w-full h-full block rounded-3xl"
                effect="blur"
              />

              <div className="text-dynamicSmall text-center py-2 select-none absolute w-full bottom-0 z-0 bg-white">
                {img.trimmedPath}
              </div>
            </label>
          </div>
        ))}
    </>
  );
};

export default ImageBox;
