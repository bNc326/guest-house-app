import Container from "components/UI/Container";
import Wave from "components/UI/svg/Wave";
import LakeImg from "../../../assets/images/lake.jpg";
import LakeImgTwo from "../../../assets/images/lak2.jpg";
import Fishermen from "components/UI/svg/Fishermen";
import Koi from "components/UI/svg/Koi";
import Lakes, { Lake } from "./Lakes";
import FishermanSilhouette from "components/UI/svg/FishermanSilhouette";
import JumpingFish from "components/UI/svg/JumpingFish";
const ForFishermen = () => {
  const CardData: Lake[] = [
    {
      id: "09ce880a-b9cd-59ea-8715-89dfb84b02c4baksa",
      lakeName: "lake",
      lakeData: ["Puerto Rico", "5 ha", "1 - 7m", "Ponty, Amúr, Harcsa"],
      lakeImg: LakeImg,
      links: {
        facebook: {
          name: "lake",
          link: "#",
        },
        maps: {
          name: "Útvonalterv",
          link: "#",
        },
      },
    },
    {
      id: "518cd744-abbd-57e2-9d93-0c261c49978asarberek",
      lakeName: "lake2",
      lakeData: ["El Salvador", "6 ha", "1 - 4m", "Ponty, Amúr, Harcsa, Csuka"],
      lakeImg: LakeImgTwo,
      links: {
        facebook: {
          name: "lake2",
          link: "#",
        },
        maps: {
          name: "Útvonalterv",
          link: "#",
        },
        web: {
          name: "www.example.hu",
          link: "#",
        },
      },
    },
  ];
  return (
    <section className="w-full overflow-hidden">
      <article className="fishermenBg-gradient flex flex-col items-center w-full relative">
        <div className="h-full w-1/2 absolute left-0 hidden tablet:block">
          <FishermanSilhouette />
        </div>
        <div className="py-16 max-w-[1440px] w-11/12 z-20 flex flex-col gap-4">
          <h3 className="text-center text-dynamicTitle font-bold text-palette-4">
            Lake
          </h3>
          <Lakes data={CardData[0]} designSvg={<Fishermen />} designBg={<FishermanSilhouette />} />
        </div>
        <div className="w-full h-full z-0">
          <Wave />
        </div>
      </article>
      <article className="bg-[#09B4C6] -mt-[1px] w-full flex items-center justify-center relative">
        <div className="h-full w-1/2 absolute left-0 hidden tablet:block">
          <JumpingFish />
        </div>
        <div className="py-16 max-w-[1440px] w-11/12 z-20 flex flex-col gap-4">
          <h3 className="text-center text-dynamicTitle font-bold text-[#0C4D5B]">
            Lake 2
          </h3>
          <Lakes data={CardData[1]} designSvg={<Koi />} designBg={<JumpingFish />} underWater />
        </div>
      </article>
    </section>
  );
};

export default ForFishermen;
