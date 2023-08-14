import {
  useEffect,
  useState,
  useLayoutEffect,
  DragEvent,
  useContext,
} from "react";
import { useRevalidator, useOutletContext } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import ModalComp from "../../components/modal/Modal";
import useIsSure from "../../hooks/useIsSure";
import { IS_SURE_ENUM } from "../../models/IsSure/IsSure";
import { ALERT_TYPE, ALERT_ACTION_TYPE } from "../../models/Alert/AlertModels";
import useUpload from "../../hooks/useUpload";
import { UPLOAD_TYPE } from "../../models/Upload/UploadModel";
import axios from "axios";
import { Button } from "flowbite-react";
import DropZone from "../../components/Gallery/DropZone";
import PreviewUpload from "../../components/Gallery/PreviewUpload";
import UploadForm from "../../components/Gallery/UploadForm";
import { Gallery as GalleryModel } from "../../models/Gallery/Gallery";
import ImageBox from "../../components/Gallery/ImageBox";
import { Outlet } from "../../models/OutletModel";
import { useAuthHeader } from "react-auth-kit";
import useFetch from "../../hooks/useFetch";
import {
  RefreshContext,
  RefreshEnum,
} from "../../context/RefreshContextProvider";
import { ClipLoader } from "react-spinners";

const Gallery = () => {
  const { data, reFetch } = useFetch("gallery");
  const [imageSrc, setImageSrc] = useState<GalleryModel[]>([]);
  const [deletableIds, setDeletableIds] = useState<string[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [isProgress, setIsProgress] = useState<number>(0);
  const { upload, uploadDispatch } = useUpload();
  const { isSure, isSureDispatch } = useIsSure();
  const outletCtx = useOutletContext() as Outlet;
  const refreshCtx = useContext(RefreshContext);
  const accessToken = useAuthHeader();

  useEffect(() => {
    const cleanup = setTimeout(() => {
      if (refreshCtx.loading === RefreshEnum.END) return;
      reFetch();
    }, 100);
    return () => clearTimeout(cleanup);
  }, [refreshCtx.loading]);

  useEffect(() => {
    const deleteIds = async () => {
      if (isSure.actionType === "DELETE" && isSure.isSure) {
        const body = JSON.stringify(deletableIds);
        const url = process.env.REACT_APP_BACKEND_API as string;
        const response = await fetch(url + "/gallery", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: accessToken(),
          },
          body: body,
        });
        if (!response.ok) {
          console.log("error");
          console.log(response);
        } else {
          const data = await response.json();
          setTimeout(() => {
            reFetch(deletableIds);
          }, 3000);
          outletCtx.alertDispatch({
            type: ALERT_ACTION_TYPE.SHOW,
            payload: {
              alertType: ALERT_TYPE.SUCCESS,
              message: data?.message,
            },
          });
          setDeletableIds([]);
        }
      }
    };

    const cleanup = setTimeout(deleteIds, 100);
    return () => clearTimeout(cleanup);
  }, [isSure]);

  useLayoutEffect(() => {
    const cleanup = setTimeout(() => setImageSrc(data), 100);
    return () => clearTimeout(cleanup);
  }, [data]);

  useLayoutEffect(() => {
    const isEmpty = () => {
      if (upload.fileList?.length === 0 || upload.fileList === null) {
        uploadDispatch({ type: UPLOAD_TYPE.RESET });
        setIsDrag(false);
      } else {
        setIsDrag(true);
      }
    };
    const cleanup = setTimeout(() => {
      isEmpty();
    }, 100);
    return () => clearTimeout(cleanup);
  }, [upload.fileList]);

  useLayoutEffect(() => {
    const resetUploadData = () => {
      setIsDrag(false);
      uploadDispatch({ type: UPLOAD_TYPE.RESET });
      reFetch();
      setIsProgress(0);
    };

    const cleanup = setTimeout(() => {
      if (isProgress < 100) return;
      resetUploadData();
    }, 3000);

    return () => clearTimeout(cleanup);
  }, [isProgress]);

  useLayoutEffect(() => {
    const cleanup = setTimeout(() => {
      if (imageSrc.length === deletableIds.length) {
        setCheckAll(true);
      } else {
        setCheckAll(false);
      }
    }, 100);

    return () => clearTimeout(cleanup);
  }, [deletableIds]);

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    const ids: string[] = [];
    imageSrc.map((img) => ids.push(img._id));
    setDeletableIds(ids);
    if (checkAll) {
      setDeletableIds([]);
    }
  };

  const handleChangeCheckbox = (id: string) => {
    const isIn = deletableIds.includes(id);

    if (!isIn) {
      setDeletableIds((prev) => [...prev, id]);
      return;
    }

    setDeletableIds(deletableIds.filter((item) => item !== id));
  };

  const deletePreviewHandler = (e: React.MouseEvent) => {
    if (!(e.target instanceof HTMLSpanElement) || !upload.fileList) return;
    e.preventDefault();
    e.stopPropagation();

    const index = Number(e.target.dataset.index) as number;
    const dataTransfer = new DataTransfer();
    Array.from(upload.fileList).map((file, fileIndex) => {
      if (fileIndex !== index) {
        dataTransfer.items.add(file);
      }
    });

    uploadDispatch({
      type: UPLOAD_TYPE.UPDATE,
      payload: { fileList: dataTransfer.files },
    });
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const imageType = /image.*/;
    const dt = new DataTransfer();

    if (upload.fileList?.length !== 0 && upload.fileList !== null) {
      Array.from(upload.fileList).map((file) => {
        dt.items.add(file);
      });
    }

    Array.from(e.dataTransfer.files).map((file) => {
      if (file.type.match(imageType)) {
        dt.items.add(file);
      } else {
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.FAILURE,
            message:
              "Csak ezek a formátumok tölthetőek fel! (jpg, jpeg, png, webp)",
          },
        });
      }
    });

    uploadDispatch({
      type: UPLOAD_TYPE.DROP,
      payload: { fileList: dt.files },
    });
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) return;
    e.preventDefault();
    setIsDrag(false);
  };

  const uploadChangeHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const dt = new DataTransfer();
    const files = e.target.files;
    const imageType = /image.*/;

    if (upload.fileList?.length !== 0 && upload.fileList !== null) {
      Array.from(upload.fileList).map((file) => {
        dt.items.add(file);
      });
    }

    files &&
      Array.from(files).map((file) => {
        if (file.type.match(imageType)) {
          dt.items.add(file);
        } else {
          outletCtx.alertDispatch({
            type: ALERT_ACTION_TYPE.SHOW,
            payload: {
              alertType: ALERT_TYPE.FAILURE,
              message:
                "Csak ezek a formátumok tölthetőek fel! (jpg, jpeg, png, webp)",
            },
          });
        }
      });

    uploadDispatch({
      type: UPLOAD_TYPE.DROP,
      payload: { fileList: dt.files },
    });
  };

  const uploadHandler = async (e: React.FormEvent) => {
    if (!upload.fileList) return;
    e.preventDefault();
    const url = process.env.REACT_APP_BACKEND_API as string;
    const formData = new FormData();
    Array.from(upload.fileList).map((file) => {
      formData.append("images", file);
    });

    const response = await axios.post(url + "/gallery/upload", formData, {
      headers: { authorization: accessToken() },
      onUploadProgress: (p) => {
        if (!p.total) return;
        const uploadProgress = Math.ceil((p.loaded / p.total) * 100);
        setIsProgress(uploadProgress);
      },
    });

    outletCtx.alertDispatch({
      type: ALERT_ACTION_TYPE.SHOW,
      payload: {
        alertType: ALERT_TYPE.SUCCESS,
        message: response.data.message,
      },
    });
  };

  return (
    <section className="w-full flex flex-col items-center gap-4 relative">
      <div className="w-11/12 flex flex-wrap justify-center gap-4 py-4 ">
        <div className="w-full flex flex-col gap-4">
          <DropZone
            dropHandler={dropHandler}
            dragOverHandler={dragOverHandler}
            dragLeaveHandler={dragLeaveHandler}
            uploadChangeHandler={uploadChangeHandler}
            isDrag={isDrag}
          />
          <PreviewUpload
            upload={upload}
            deletePreviewHandler={deletePreviewHandler}
          />

          <UploadForm
            upload={upload}
            isProgress={isProgress}
            uploadHandler={uploadHandler}
          />
        </div>
        {deletableIds.length !== 0 && (
          <div className="w-full flex justify-between items-center bg-blue-600/30 backdrop-blur-sm p-2 rounded-md sticky top-16 z-50">
            <span>{deletableIds.length} elem kiválasztva</span>{" "}
            <div className="flex flex-col mobile:flex-row gap-1 mobile:gap-2 font-bold">
              <Button color="gray" onClick={handleCheckAll} className="w-full">
                Összes kijelölése
              </Button>
              <Button
                color="failure"
                onClick={() => {
                  isSureDispatch({ type: IS_SURE_ENUM.DELETE });
                  setIsShow(true);
                }}
              >
                <span className="flex gap-1 items-center">
                  <BiTrash />
                  Törlés
                </span>
              </Button>
            </div>
          </div>
        )}

        <ImageBox
          handleChangeCheckbox={handleChangeCheckbox}
          deletableIds={deletableIds}
          imageSrc={imageSrc}
        />
      </div>

      <ModalComp
        isShow={isShow}
        setIsShow={setIsShow}
        isSure={isSure}
        isSureDispatch={isSureDispatch}
      />
    </section>
  );
};

export default Gallery;
