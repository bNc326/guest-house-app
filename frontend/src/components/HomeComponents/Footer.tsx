import { MdPrivacyTip, MdCookie } from "react-icons/md";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center py-4 px-2 w-full bg-palette-4 text-palette-2">
      <div className="w-full max-w-[1366px] flex flex-col gap-2">
        <p className="flex mobile:gap-2 flex-col mobile:flex-row mobile:justify-center text-lg text-center font-bold">
          <span>
            <span className="text-center pr-1">&#169;</span>Website of Random
            Háznév,
          </span>
          All Rights Reserved!
        </p>
        <ul className="flex gap-2 flex-row flex-wrap w-full text-dynamicFooter">
          <Link
            to={"#"}
            className="flex gap-1 items-center w-[calc(50%-0.5rem/2)] laptop:w-[calc(33%-0.5rem/2)] justify-center bg-palette-2 text-palette-4 py-[0.75px] rounded-lg hover:opacity-75 transition ease-in-out duration-300"
          >
            <li>Impresszum</li>
          </Link>
          <Link
            to={"#"}
            className="flex gap-1 items-center w-[calc(50%-0.5rem/2)] laptop:w-[calc(33%-0.5rem/2)] justify-center bg-palette-2 text-palette-4 py-[0.75px] rounded-lg hover:opacity-75 transition ease-in-out duration-300"
          >
            <span>
              <MdCookie size={"1.250rem"} />
            </span>
            <li>Cookie's (Sütik)</li>
          </Link>
          <Link
            to={"#"}
            className="flex gap-1 items-center order-3 laptop:w-[calc(33%-0.5rem/2)] w-full justify-center bg-palette-2 text-palette-4 py-[0.75px] rounded-lg hover:opacity-75 transition ease-in-out duration-300"
          >
            <span>
              <MdPrivacyTip size={"1.250rem"} />
            </span>
            <li>Privacy Policy (Adatvédelmi irányelvek)</li>
          </Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
