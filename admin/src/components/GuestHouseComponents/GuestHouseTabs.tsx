import React, { forwardRef } from "react";
import { Tabs, TextInput, Label, Textarea } from "flowbite-react";
import { MdDriveFileRenameOutline, MdHotel } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { InputValidator } from "../../models/Form/Form";

interface ReactProps {
  inputValidate: InputValidator;
  changeInputHandler: (e: React.ChangeEvent) => void;
  inputBlurHandler: (e: React.ChangeEvent) => void;
}

const GuestHouseTabs = forwardRef(
  (props: ReactProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const { inputValidate, changeInputHandler, inputBlurHandler } = props;
    return (
      <Tabs.Group style="underline">
        <Tabs.Item title="Vendégház adatok">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col mobile:flex-row w-full gap-4">
              <div className="w-full">
                <TextInput
                  type="text"
                  addon={<MdDriveFileRenameOutline size="1.50rem" />}
                  value={inputValidate.hotelName.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="hotelName"
                  placeholder="Vendégház név"
                  color={`${
                    inputValidate.hotelName.firstTouch
                      ? inputValidate.hotelName.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }`}
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.hotelName.firstTouch
                          ? inputValidate.hotelName.valid
                            ? true
                            : false
                          : true
                      }
                      message={inputValidate.hotelName.error}
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col mobile:flex-row w-full gap-4">
              <div className="w-full">
                <Label htmlFor="price" value="Alap ár" />
                <TextInput
                  type="text"
                  addon={<span className="font-bold">Ft</span>}
                  value={inputValidate.price.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="price"
                  placeholder="40000"
                  id="price"
                  color={`${
                    inputValidate.price.firstTouch
                      ? inputValidate.price.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }`}
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.price.firstTouch
                          ? inputValidate.price.valid
                            ? true
                            : false
                          : true
                      }
                      message={inputValidate.price.error}
                    />
                  }
                />
              </div>
              <div className="w-full">
                <Label htmlFor="discountPrice" value="Akciós ár" />
                <TextInput
                  type="text"
                  addon={<span className="font-bold">Ft</span>}
                  value={inputValidate.discountPrice.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="discountPrice"
                  placeholder="40000"
                  id="discountPrice"
                />
              </div>
            </div>
            <div className="flex flex-col mobile:flex-row w-full gap-4">
              <div className="w-full">
                <Label htmlFor="roomAmount" value="Szobák száma" />
                <TextInput
                  icon={MdHotel}
                  value={inputValidate.roomAmount.value}
                  name="roomAmount"
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  type="number"
                  id="roomAmount"
                  color={`${
                    inputValidate.roomAmount.firstTouch
                      ? inputValidate.roomAmount.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }`}
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.roomAmount.firstTouch
                          ? inputValidate.roomAmount.valid
                            ? true
                            : false
                          : true
                      }
                      message={inputValidate.roomAmount.error}
                    />
                  }
                />
              </div>
              <div className="w-full">
                <Label htmlFor="maxPersonAmount" value="Max személyek száma" />
                <TextInput
                  icon={FaUsers}
                  value={inputValidate.maxPersonAmount.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="maxPersonAmount"
                  type="number"
                  id="maxPersonAmount"
                  color={`${
                    inputValidate.maxPersonAmount.firstTouch
                      ? inputValidate.maxPersonAmount.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }`}
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.maxPersonAmount.firstTouch
                          ? inputValidate.maxPersonAmount.valid
                            ? true
                            : false
                          : true
                      }
                      message={inputValidate.maxPersonAmount.error}
                    />
                  }
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full">
                <Label htmlFor="NTAK" value="NTAK regisztrációs szám" />
                <TextInput
                  type="text"
                  addon={<span className="font-bold">NTAK</span>}
                  value={inputValidate.NTAK.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="NTAK"
                  id="NTAK"
                  placeholder="MA12345678"
                  color={`${
                    inputValidate.NTAK.firstTouch
                      ? inputValidate.NTAK.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }`}
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.NTAK.firstTouch
                          ? inputValidate.NTAK.valid
                            ? true
                            : false
                          : true
                      }
                      message={inputValidate.NTAK.error}
                    />
                  }
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full">
                <Label value="Vendégház leírás" htmlFor="description" />
                <Textarea
                  className="resize-none"
                  rows={5}
                  placeholder="Leírás.."
                  id="description"
                  value={inputValidate.description.value}
                  onChange={changeInputHandler}
                  onBlur={inputBlurHandler}
                  name="description"
                  color={`${
                    inputValidate.description.firstTouch
                      ? inputValidate.description.valid
                        ? "gray"
                        : "failure"
                      : "gray"
                  }`}
                  helperText={
                    <ErrorMessage
                      success={
                        inputValidate.description.firstTouch
                          ? inputValidate.description.valid
                            ? true
                            : false
                          : true
                      }
                      message={inputValidate.description.error}
                    />
                  }
                ></Textarea>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 w-full">
                <div className="w-full">
                  <Label value="Ország" htmlFor="country" />
                  <TextInput
                    type="text"
                    id="country"
                    value={inputValidate.country.value}
                    onChange={changeInputHandler}
                    onBlur={inputBlurHandler}
                    name="country"
                    placeholder="Magyarország"
                    color={`${
                      inputValidate.country.firstTouch
                        ? inputValidate.country.valid
                          ? "gray"
                          : "failure"
                        : "gray"
                    }`}
                    helperText={
                      <ErrorMessage
                        success={
                          inputValidate.country.firstTouch
                            ? inputValidate.country.valid
                              ? true
                              : false
                            : true
                        }
                        message={inputValidate.country.error}
                      />
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col mobile:flex-row gap-4 w-full">
                <div className="w-full">
                  <Label value="Irányítószám" htmlFor="postalCode" />
                  <TextInput
                    type="text"
                    id="postalCode"
                    value={inputValidate.postalCode.value}
                    onChange={changeInputHandler}
                    onBlur={inputBlurHandler}
                    name="postalCode"
                    color={`${
                      inputValidate.postalCode.firstTouch
                        ? inputValidate.postalCode.valid
                          ? "gray"
                          : "failure"
                        : "gray"
                    }`}
                    helperText={
                      <ErrorMessage
                        success={
                          inputValidate.postalCode.firstTouch
                            ? inputValidate.postalCode.valid
                              ? true
                              : false
                            : true
                        }
                        message={inputValidate.postalCode.error}
                      />
                    }
                  />
                </div>
                <div className="w-full">
                  <Label value="Város" htmlFor="city" />
                  <TextInput
                    type="text"
                    id="city"
                    value={inputValidate.city.value}
                    onChange={changeInputHandler}
                    onBlur={inputBlurHandler}
                    name="city"
                    placeholder="Budapest"
                    color={`${
                      inputValidate.city.firstTouch
                        ? inputValidate.city.valid
                          ? "gray"
                          : "failure"
                        : "gray"
                    }`}
                    helperText={
                      <ErrorMessage
                        success={
                          inputValidate.city.firstTouch
                            ? inputValidate.city.valid
                              ? true
                              : false
                            : true
                        }
                        message={inputValidate.city.error}
                      />
                    }
                  />
                </div>
                <div className="w-full">
                  <Label value="Utca, házszám" htmlFor="street" />
                  <TextInput
                    type="text"
                    id="street"
                    value={inputValidate.street.value}
                    onChange={changeInputHandler}
                    onBlur={inputBlurHandler}
                    name="street"
                    placeholder="Petőfi Sándor utca 12"
                    color={`${
                      inputValidate.street.firstTouch
                        ? inputValidate.street.valid
                          ? "gray"
                          : "failure"
                        : "gray"
                    }`}
                    helperText={
                      <ErrorMessage
                        success={
                          inputValidate.street.firstTouch
                            ? inputValidate.street.valid
                              ? true
                              : false
                            : true
                        }
                        message={inputValidate.street.error}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Tabs.Item>
        {/* <Tabs.Item title="Szolgáltatások/Extrák">
          <div className="flex flex-col gap-4" ref={ref}>
            <div className="w-full flex flex-col gap-4">
              <div
                onClick={newListHandler}
                data-type={"service"}
                className="w-full flex justify-between bg-[#c1c1c1] p-4 rounded-md font-bold cursor-pointer"
              >
                Új Szolgáltatás hozzáadás
                <span className="pointer-events-none">
                  <BsPlusSquare size="1.5rem" className="pointer-events-none" />
                </span>
              </div>
              <ul className="space-y-4">
                {data.services.map((service, index) => (
                  <li
                    key={index}
                    className="shadow-md rounded-md flex flex-col mobile:flex-row p-2 gap-2 justify-between border border-black/10"
                    data-group={"service"}
                  >
                    <div className="mobile:w-full">
                      <TextInput
                        addon={<BsTools size="1.2rem" />}
                        value={service}
                        className="font-medium"
                        disabled={inputValidate.service[index]?.disabled}
                        onChange={changeInputHandler}
                        onBlur={inputBlurHandler}
                        data-key={"service"}
                        data-index={index}
                        color={`${
                          inputValidate.service[index]?.firstTouch
                            ? inputValidate.service[index]?.valid
                              ? "gray"
                              : "failure"
                            : "gray"
                        }`}
                        helperText={
                          <ErrorMessage
                            success={
                              inputValidate.service[index]?.firstTouch
                                ? inputValidate.service[index]?.valid
                                  ? true
                                  : false
                                : true
                            }
                            message={inputValidate.service[index]?.error}
                          />
                        }
                      />
                    </div>
                    <span
                      className="w-full flex gap-4 mobile:w-[unset] mobile:px-4 items-center"
                      data-group={"service"}
                      data-index={index}
                    >
                      <button
                        type="button"
                        className="flex justify-center py-1 rounded-lg gap-2 text-blue-600 bg-blue-600/20 w-full mobile:w-[unset] mobile:bg-inherit"
                        onClick={editListHandler}
                      >
                        {inputValidate.service[index]?.disabled && (
                          <TbEdit
                            size="1.5rem"
                            className="pointer-events-none"
                          />
                        )}
                        {!inputValidate.service[index]?.disabled && (
                          <TbEditOff
                            size="1.5rem"
                            className="pointer-events-none"
                          />
                        )}
                        <span
                          className={`pointer-events-none hidden mobile:block ${
                            !inputValidate.service[index]?.disabled &&
                            "line-through"
                          }`}
                        >
                          Szerkesztés
                        </span>
                      </button>
                      <button
                        type="button"
                        className="flex gap-2 justify-center py-1 rounded-lg text-red-600 bg-red-600/20 w-full mobile:w-[unset] mobile:bg-inherit"
                        onClick={deleteListHandler}
                      >
                        <BsTrash3
                          size="1.5rem"
                          className=" pointer-events-none"
                        />
                        <span className="pointer-events-none hidden mobile:block">
                          Törlés
                        </span>
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div
                onClick={newListHandler}
                data-type={"feature"}
                className="w-full flex justify-between bg-[#c1c1c1] p-4 rounded-md font-bold cursor-pointer"
              >
                Új Extra hozzáadás
                <span className="pointer-events-none">
                  <BsPlusSquare size="1.5rem" className="pointer-events-none" />
                </span>
              </div>
              <ul className="space-y-4">
                {data.feature.map((feature, index) => (
                  <li
                    key={index}
                    className="shadow-md rounded-md flex flex-col mobile:flex-row p-2 gap-2 justify-between border border-black/10"
                  >
                    <div className="mobile:w-full">
                      <TextInput
                        addon={<MdOutlineWorkspacePremium size="1.2rem" />}
                        value={feature}
                        className="font-medium"
                        disabled={inputValidate.feature[index]?.disabled}
                        onChange={changeInputHandler}
                        onBlur={inputBlurHandler}
                        data-key={"feature"}
                        data-index={index}
                        color={`${
                          inputValidate.feature[index]?.firstTouch
                            ? inputValidate.feature[index]?.valid
                              ? "gray"
                              : "failure"
                            : "gray"
                        }`}
                        helperText={
                          <ErrorMessage
                            success={
                              inputValidate.feature[index]?.firstTouch
                                ? inputValidate.feature[index]?.valid
                                  ? true
                                  : false
                                : true
                            }
                            message={inputValidate.feature[index]?.error}
                          />
                        }
                      />
                    </div>
                    <span
                      className="flex gap-4 w-full mobile:w-[unset] mobile:px-4 items-center"
                      data-group={"feature"}
                      data-index={index}
                    >
                      <button
                        type="button"
                        className="flex justify-center py-1 rounded-lg gap-2 text-blue-600 bg-blue-600/20 w-full mobile:w-[unset] mobile:bg-inherit"
                        onClick={editListHandler}
                      >
                        {inputValidate.feature[index]?.disabled && (
                          <TbEdit
                            size="1.5rem"
                            className="pointer-events-none"
                          />
                        )}
                        {!inputValidate.feature[index]?.disabled && (
                          <TbEditOff
                            size="1.5rem"
                            className="pointer-events-none"
                          />
                        )}

                        <span
                          className={`pointer-events-none hidden mobile:block ${
                            !inputValidate.feature[index]?.disabled &&
                            "line-through"
                          }`}
                        >
                          Szerkesztés
                        </span>
                      </button>
                      <button
                        type="button"
                        className="flex gap-2 justify-center py-1 rounded-lg text-red-600 bg-red-600/20 w-full mobile:w-[unset] mobile:bg-inherit"
                        onClick={deleteListHandler}
                      >
                        <BsTrash3
                          size="1.5rem"
                          className=" pointer-events-none"
                        />
                        <span className="pointer-events-none hidden mobile:block ">
                          Törlés
                        </span>
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Tabs.Item> */}
      </Tabs.Group>
    );
  }
);

export default GuestHouseTabs;

export const ErrorMessage: React.FC<{ success: boolean; message: string }> = ({
  message,
  success,
}) => {
  return (
    <>
      {!success && (
        <>
          <span className="font-medium">Hoppá!</span> {message}
        </>
      )}
    </>
  );
};