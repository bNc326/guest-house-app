import { Button } from "flowbite-react";
import { MdSave, MdThumbDown, MdThumbUp } from "react-icons/md";
import { ClipLoader } from "react-spinners";
interface Props {
  objectIsEqual: boolean;
  resetForm: () => void;
  loading: boolean;
  accept?: {
    accept: boolean;
    callbackFn: (e: MouseEvent, status: "Accepted" | "Ejected") => void;
  };
}
export const FormFooter: React.FC<Props> = ({
  objectIsEqual,
  resetForm,
  loading,
  accept,
}) => {
  return (
    <div className="flex gap-2 flex-col-reverse justify-between items-end">
      {accept?.accept && (
        <div className="flex justify-between gap-2 w-full">
          <Button
            type="button"
            disabled={loading}
            color="success"
            size="sm"
            onClick={(e: MouseEvent) => accept.callbackFn(e, "Accepted")}
          >
            {loading ? (
              <ClipLoader
                loading={true}
                color={"white"}
                size={"1rem"}
                className="mr-2"
              />
            ) : (
              <MdThumbUp className="mr-2" size={16} />
            )}
            <span className="font-semibold">Elfogadás</span>
          </Button>
          <Button
            type="button"
            disabled={loading}
            color="failure"
            size="sm"
            onClick={(e: MouseEvent) => accept.callbackFn(e, "Ejected")}
          >
            {loading ? (
              <ClipLoader
                loading={true}
                color={"white"}
                size={"1rem"}
                className="mr-2"
              />
            ) : (
              <MdThumbDown className="mr-2" size={16} />
            )}
            <span className="font-semibold">Elutasítás</span>
          </Button>
        </div>
      )}
      {!accept?.accept && (
        <div className="flex gap-2 w-full">
          <Button
            type="submit"
            className=" laptop:w-[unset] transition-all ease-in-out duration-300"
            size="sm"
          >
            <span className="flex gap-1 items-center">
              {loading ? (
                <ClipLoader loading={true} color={"white"} size={"1rem"} />
              ) : (
                <MdSave />
              )}
              <span className="font-semibold">Mentés</span>
            </span>
          </Button>
          <Button
            className="laptop:w-[unset] transition-all ease-in-out duration-300 font-semibold"
            onClick={resetForm}
            disabled={objectIsEqual}
            type="button"
            size="sm"
            color="failure"
          >
            <span className="">Elvétés</span>
          </Button>
        </div>
      )}
    </div>
  );
};
