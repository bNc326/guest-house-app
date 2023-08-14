import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Backdrop from "../Backdrop";
import { Button, TextInput } from "flowbite-react";
import { MdClose } from "react-icons/md";
import * as MaterialDesignIcon from "react-icons/md";
import { AutoSizer, Grid, ColumnSizer } from "react-virtualized";
import {
  IconTypes,
  DynamicIconComp,
} from "../../../models/HotelService/HotelService";
import { Service } from "../../../models/GuestHouseModel";

interface Props {
  iconsProps: IconTypes;
  closeModalHandler: () => void;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const ServiceModal: React.FC<Props> = ({
  closeModalHandler,
  iconsProps,
  setServices,
}) => {
  const [icons, setIcons] = useState<IconTypes>({});
  const [iconsName, setIconsName] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string>("MdPerson");
  const [openIconPicker, setOpenIconPicker] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const filteredIcons = iconsName.filter((icon) =>
    icon.toLowerCase().includes(searchValue)
  );

  useEffect(() => {
    const cleanup = setTimeout(async () => {
      setIcons(iconsProps);
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);

  useLayoutEffect(() => {
    const cleanup = setTimeout(() => {
      if (Object.keys(icons).length > 0) {
        generateSelectableIcons();
      }
    }, 100);
    return () => clearTimeout(cleanup);
  }, [icons]);

  const DynamicIcon = ({
    name,
    size,
    onClick,
    className,
    style,
  }: DynamicIconComp): JSX.Element => {
    const Icon = icons && icons[name];

    if (!Icon) {
      return (
        <MaterialDesignIcon.MdPerson
          size={size}
          onClick={onClick}
          className={className}
        />
      );
    }
    return (
      <Icon size={size} onClick={onClick} className={className} style={style} />
    );
  };

  const generateSelectableIcons = () => {
    const updateIconsName: string[] = [];

    for (let icon in icons) {
      updateIconsName.push(icon);
    }

    setIconsName(updateIconsName);
  };

  const handleSearchIcon = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    console.log("type");

    const value = e.target.value.toLowerCase().trim();

    setSearchValue(value);
  };

  const iconRender = ({ columnIndex, key, rowIndex, style }: any) => {
    const index = rowIndex * 6 + columnIndex;
    if (index >= filteredIcons.length) return null;

    return (
      <DynamicIcon
        style={style}
        name={filteredIcons[index]}
        size={32}
        className="cursor-pointer hover:opacity-50 transition-all ease-in-out duration-150"
        onClick={() => setSelectedIcon(filteredIcons[index])}
      />
    );
  };

  const handleChangeInput = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const value = e.target.value;

    setInputValue(value);
  };

  const saveService = (e: MouseEvent) => {
    const service = new Service(inputValue, selectedIcon);
    setServices((prev) => [service, ...prev]);
    closeModalHandler();
  };
  //TODO submit new service
  return (
    <Backdrop closeModalHandler={closeModalHandler}>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-dynamicMedium">
            Új szolgáltatás
          </span>
          <MdClose
            size={20}
            onClick={closeModalHandler}
            className="cursor-pointer"
          />
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col gap-2 h-full">
            <TextInput
              theme={{
                addon:
                  "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-sm text-gray-900",
              }}
              type="text"
              addon={
                <div
                  className="h-full px-2 flex items-center justify-center cursor-pointer"
                  onClick={() => setOpenIconPicker((prev) => !prev)}
                >
                  <DynamicIcon name={selectedIcon} size={24} />
                </div>
              }
              className="w-full"
              onChange={handleChangeInput}
            />
            {openIconPicker && (
              <div className="flex flex-col gap-2 left-0 w-full h-[300px]">
                <TextInput
                  type="text"
                  sizing={"sm"}
                  placeholder="Search icon name in Eng"
                  onChange={handleSearchIcon}
                />
                <AutoSizer className="w-full h-full bg-white">
                  {({ height, width }) => {
                    return (
                      <ColumnSizer
                        columnMaxWidth={100}
                        columnMinWidth={32}
                        columnCount={6}
                        width={width}
                      >
                        {({ adjustedWidth, getColumnWidth, registerChild }) => (
                          <Grid
                            ref={registerChild}
                            cellRenderer={iconRender}
                            columnCount={6}
                            columnWidth={getColumnWidth}
                            height={height - 50}
                            rowCount={Math.ceil(filteredIcons.length / 6)}
                            rowHeight={50}
                            width={adjustedWidth}
                          />
                        )}
                      </ColumnSizer>
                    );
                  }}
                </AutoSizer>
              </div>
            )}
          </div>
        </div>
        <div>
          <Button
            type="button"
            onClick={saveService}
            disabled={!inputValue.length}
          >
            <MaterialDesignIcon.MdSave className="mr-2" />
            Mentés
          </Button>
        </div>
      </div>
    </Backdrop>
  );
};

export default ServiceModal;
