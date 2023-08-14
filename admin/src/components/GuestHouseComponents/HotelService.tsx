import React, { useState, useEffect } from "react";
import ServiceModal from "../modal/ServicesComponent/ServiceModal";
import * as MaterialDesignIcon from "react-icons/md";
import { VscBlank } from "react-icons/vsc";
import { Service } from "../../models/GuestHouseModel";
import { TextInput, Checkbox } from "flowbite-react";
import {
  IconTypes,
  DynamicIconComp,
} from "../../models/HotelService/HotelService";
import { IconType } from "react-icons";

interface Props {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const HotelService: React.FC<Props> = ({ services, setServices }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [icons, setIcons] = useState<IconTypes>({});
  const [editEnabled, setEditEnabled] = useState<boolean>(false);

  useEffect(() => {
    const cleanup = setTimeout(async () => {
      const updateIcons: IconTypes = {};
      updateIcons[VscBlank.name] = VscBlank;
      for (let [index, icon] of Object.entries(MaterialDesignIcon)) {
        updateIcons[icon.name] = icon;
      }
      setIcons(updateIcons);
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);

  const showServiceModal = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const handleEnabledEdit = () => {
    setEditEnabled((prev) => !prev);
  };

  const handleDeleteService = (id: string) => {
    const index = services.findIndex((prev) => prev.id === id);

    setServices((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const handleChangeService = ({
    e,
    id,
    type,
  }: {
    e: React.ChangeEvent;
    id: string;
    type: "text" | "checkbox";
  }) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const value = e.target.value;
    const checked = e.target.checked;
    const index = services.findIndex((service) => service.id === id);
    if (type === "text") {
      setServices((prev) => {
        const update = [...prev];
        update[index].value = value;
        return update;
      });
    }

    if (type === "checkbox") {
      setServices((prev) => {
        const update = [...prev];
        update[index].hidden = !checked;
        return update;
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {showModal && (
        <ServiceModal
          closeModalHandler={closeModalHandler}
          iconsProps={icons}
          setServices={setServices}
        />
      )}
      <div className="flex justify-end items-center gap-1">
        <div
          className="text-blue-600 flex justify-center items-center gap-1 font-semibold rounded-md hover:bg-blue-600/30 p-1 cursor-pointer transform ease-in-out duration-300"
          onClick={handleEnabledEdit}
        >
          módosítás
          <MaterialDesignIcon.MdEdit />
        </div>
        <div
          className="flex justify-center items-center gap-1 font-semibold rounded-md hover:bg-gray-200 p-1 cursor-pointer transform ease-in-out duration-300"
          onClick={showServiceModal}
        >
          új szolgáltatás
          <MaterialDesignIcon.MdAddCircle />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 w-full">
        {icons &&
          services &&
          services.map((service, index) => (
            <div
              key={service.id}
              className="w-[calc(33%-1rem/2)] flex items-center"
            >
              <div className="w-full flex items-center gap-1">
                <TextInput
                  sizing={"sm"}
                  addon={
                    <Checkbox
                      className="cursor-pointer"
                      checked={!service.hidden}
                      onChange={(e: React.ChangeEvent) =>
                        handleChangeService({
                          e,
                          id: service.id,
                          type: "checkbox",
                        })
                      }
                    />
                  }
                  icon={icons[service.icon]}
                  value={service.value}
                  disabled={!editEnabled}
                  onChange={(e: React.ChangeEvent) =>
                    handleChangeService({ e, id: service.id, type: "text" })
                  }
                  className="w-full"
                />
                <div className="flex gap-1">
                  <MaterialDesignIcon.MdClose
                    onClick={() => handleDeleteService(service.id)}
                    className="cursor-pointer fill-red-600 hover:opacity-50"
                    size={20}
                  />
                </div>
              </div>
            </div>
          ))}
        {services.length === 0 && <div>Nincs még szolgáltatás</div>}
      </div>
    </div>
  );
};

export default HotelService;
