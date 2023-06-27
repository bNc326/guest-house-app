import { useState, useLayoutEffect, DragEvent } from "react";
import {
  useRevalidator,
  json,
  useRouteLoaderData,
  useOutletContext,
} from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import ModalComp from "../../components/modal/Modal";
import useIsSure from "../../hooks/useIsSure";
import { IS_SURE_ENUM } from "../../models/IsSure/IsSure";
import useAlert from "../../hooks/useAlert";
import AlertComponent from "../../components/UI/Alert";
import { ALERT_TYPE, ALERT_ACTION_TYPE } from "../../models/Alert/AlertModels";
import useUpload from "../../hooks/useUpload";
import { UPLOAD_TYPE } from "../../models/Upload/UploadModel";
import axios from "axios";
import { Button } from "flowbite-react";
import DropZone from "../../components/Gallery/DropZone";
import PreviewUpload from "../../components/Gallery/PreviewUpload";
import UploadForm from "../../components/Gallery/UploadForm";
import {
  DeleteCheckbox,
  Gallery as GalleryModel,
} from "../../models/Gallery/Gallery";
import ImageBox from "../../components/Gallery/ImageBox";
import { Outlet } from "../../models/OutletModel";

const Gallery = () => {
  const imageSrc = useRouteLoaderData("gallery") as GalleryModel[];
  const [deleteCheckbox, setDeleteCheckbox] = useState<DeleteCheckbox[]>([]);
  const [deletableIds, setDeletableIds] = useState<string[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [isProgress, setIsProgress] = useState<number>(0);
  const { upload, uploadDispatch } = useUpload();
  const { isSure, isSureDispatch } = useIsSure();
  const revalidator = useRevalidator();
  const outletCtx = useOutletContext() as Outlet;

  useLayoutEffect(() => {
    const getDeleteCheckbox = () => {
      const updateCheckbox: DeleteCheckbox[] = [];
      imageSrc.map((img) => {
        const update: DeleteCheckbox = {
          id: img.id,
          checked: false,
        };
        updateCheckbox.push(update);
      });

      setDeleteCheckbox(updateCheckbox);
    };

    const cleanup = setTimeout(() => {
      getDeleteCheckbox();
    }, 100);

    return () => clearTimeout(cleanup);
  }, [imageSrc]);

  useLayoutEffect(() => {
    const deleteIds = async () => {
      if (isSure.actionType === "DELETE" && isSure.isSure) {
        const body = JSON.stringify(deletableIds);
        const url = process.env.REACT_APP_BACKEND_API as string;
        const response = await fetch(url + "/gallery", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });
        if (!response.ok) {
          console.log("error");
          console.log(response);
        } else {
          const data = await response.json();
          console.log(data);
          setDeletableIds([]);
          outletCtx.alertDispatch({
            type: ALERT_ACTION_TYPE.SHOW,
            payload: {
              alertType: ALERT_TYPE.SUCCESS,
              message: data?.message,
            },
          });
          setTimeout(() => {
            revalidator.revalidate();
          }, 5000);
        }
      }
    };
    const cleanup = setTimeout(() => {
      deleteIds();
    }, 100);
    return () => clearTimeout(cleanup);
  }, [isSure]);

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
      revalidator.revalidate();
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
      if (deletableIds.length < imageSrc.length) {
        setAllSelected(false);
      }
    }, 100);

    return () => clearTimeout(cleanup);
  }, [deletableIds]);

  const checkAllCheckboxHandler = (e: React.MouseEvent) => {
    if (!allSelected) {
      setDeletableIds([]);
      setDeleteCheckbox((prev) => {
        const update = [...prev];
        update.map((checkbox) => (checkbox.checked = true));
        return update;
      });
      setDeletableIds((prev) => {
        const update = [...prev];
        imageSrc.map((img) => {
          update.push(img.id);
        });
        return update;
      });
      setAllSelected(true);

      return;
    }

    setDeletableIds([]);

    setDeleteCheckbox((prev) => {
      const update = [...prev];
      update.map((checkbox) => (checkbox.checked = false));
      return update;
    });

    setAllSelected(false);
  };

  const changeCheckboxHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const checked = e.target.checked;
    const id = e.target.dataset.id as string;

    if (checked) {
      setDeleteCheckbox((prev) => {
        const update = [...prev];
        update.map((item) => {
          if (item.id === id) {
            item.checked = true;
          }
        });
        return update;
      });
      setDeletableIds((prev) => {
        return [...prev, id];
      });
      return;
    }

    setDeleteCheckbox((prev) => {
      const update = [...prev];
      update.map((item) => {
        if (item.id === id) {
          item.checked = false;
        }
      });
      return update;
    });
    setDeletableIds((prev) => {
      const deleteIndex = prev.findIndex((item) => item === id);
      return [...prev.slice(0, deleteIndex), ...prev.slice(deleteIndex + 1)];
    });
    return;
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
    if (upload.fileList?.length !== 0 && upload.fileList !== null) {
      const dt = new DataTransfer();

      Array.from(upload.fileList).map((file) => {
        dt.items.add(file);
      });

      Array.from(e.dataTransfer.files).map((file) => {
        dt.items.add(file);
      });

      uploadDispatch({
        type: UPLOAD_TYPE.DROP,
        payload: { fileList: dt.files },
      });
      return;
    }

    const { files } = e.dataTransfer;
    if (files.length > 0) {
      uploadDispatch({
        type: UPLOAD_TYPE.DROP,
        payload: { fileList: files },
      });
    }
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

    if (upload.fileList?.length !== 0 && upload.fileList !== null) {
      const dt = new DataTransfer();
      const files = e.target.files;

      Array.from(upload.fileList).map((file) => {
        dt.items.add(file);
      });

      files &&
        Array.from(files).map((file) => {
          dt.items.add(file);
        });

      uploadDispatch({
        type: UPLOAD_TYPE.DROP,
        payload: { fileList: dt.files },
      });
      return;
    }

    const files = e.target.files;
    if (files && files.length > 0) {
      uploadDispatch({
        type: UPLOAD_TYPE.DROP,
        payload: { fileList: files },
      });
    }
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
          <div className="w-full flex justify-between items-center bg-blue-600/30 backdrop-blur-sm p-2 rounded-t-md sticky top-16 z-50E">
            <span>{deletableIds.length} elem kiválasztva</span>{" "}
            <div className="flex flex-col mobile:flex-row gap-1 mobile:gap-2 font-bold">
              <Button
                color="gray"
                onClick={checkAllCheckboxHandler}
                className="w-full"
              >
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
          changeCheckboxHandler={changeCheckboxHandler}
          deleteCheckbox={deleteCheckbox}
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

export async function loader() {
  const url = process.env.REACT_APP_BACKEND_API as string;
  const response = await fetch(url + `/gallery`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("fetch faild", response);
    throw json({ message: "fetch failed" }, { status: 500 });
  } else {
    return response;
  }
}
