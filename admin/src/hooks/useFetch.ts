import { useState, useEffect, useContext } from "react";
import { HotelContext } from "../context/HotelContextProvider";
import { RefreshContext, RefreshEnum } from "../context/RefreshContextProvider";
import opensocket from "socket.io-client";
import { useOutletContext } from "react-router-dom";
import { Outlet } from "../models/OutletModel";
import { ALERT_ACTION_TYPE, ALERT_TYPE } from "../models/Alert/AlertModels";
import { SocketContext } from "../context/SocketContextProvider";
interface Fetch {
  data: any[];
  reFetch: (ids?: string[]) => void;
}

const useFetch = (endpoint: string, query?: string): Fetch => {
  const [data, setData] = useState<any[]>([]);
  const hotelCtx = useContext(HotelContext);
  const refreshCtx = useContext(RefreshContext);
  const outletCtx = useOutletContext() as Outlet;
  const socketCtx = useContext(SocketContext);

  const fetchData = async (options?: { ids?: string[]; data?: any[] }) => {
    let updateData: any[];
    if (!options?.data) {
      updateData = [...data];
    } else {
      updateData = options.data;
    }

    refreshCtx.handleRefresh(RefreshEnum.START);
    const url = process.env.REACT_APP_BACKEND_API as string;

    const response = await fetch(
      `${url}/${endpoint}?hotel=${hotelCtx.hotelId}&filter=${query}`
    );

    if (!response.ok) {
      console.log("error");
      refreshCtx.handleRefresh(RefreshEnum.END);
    } else {
      const dbData = await response.json();
      updateData = [...dbData]
      setData(updateData);
      refreshCtx.handleRefresh(RefreshEnum.END);
    }

    socketCtx.io.on(
      `${hotelCtx.hotelId}-${endpoint}`,
      (ioData: { action: string; payload: any }) => {
        switch (ioData.action) {
          case "new":
            updateData = [ioData.payload, ...updateData];
            setData(updateData);
            outletCtx.alertDispatch({
              type: ALERT_ACTION_TYPE.SHOW,
              payload: {
                alertType: ALERT_TYPE.INFO,
                message: `${
                  endpoint === "booking"
                    ? `Új foglalás érkezett! ${ioData.payload._id}`
                    : ""
                } ${
                  endpoint === "disabled-days"
                    ? "Egy admin létrehozott egy kizárt napot!"
                    : ""
                } ${endpoint === "ratings" ? "Új értékelés érkezett!" : ""}`,
              },
            });
            break;
          case "update":
            const index = updateData.findIndex(
              (item: any) => item._id === ioData.payload._id
            );
            const updateItem = { ...updateData[index], ...ioData.payload };

            updateData = [
              ...updateData.slice(0, index),
              updateItem,
              ...updateData.slice(index + 1),
            ];
            setData(updateData);
            outletCtx.alertDispatch({
              type: ALERT_ACTION_TYPE.SHOW,
              payload: {
                alertType: ALERT_TYPE.INFO,
                message: "Egy admin módosított egy elemet!",
              },
            });
            break;
          case "delete":
            const ids = ioData.payload;
            ids.map((id: string) => {
              const index = updateData.findIndex(
                (item: any) => item._id === id
              );
              updateData = [
                ...updateData.slice(0, index),
                ...updateData.slice(index + 1),
              ];
            });
            setData(updateData);
            outletCtx.alertDispatch({
              type: ALERT_ACTION_TYPE.SHOW,
              payload: {
                alertType: ALERT_TYPE.INFO,
                message: "Egy admin kitörölt egy/több elemet!",
              },
            });
            break;
          default:
            break;
        }
      }
    );

    socketCtx.io.on(endpoint, (ioData: any) => {
      switch (ioData.action) {
        case "new":
          updateData = [ioData.payload, ...updateData];
          setData(updateData);
          outletCtx.alertDispatch({
            type: ALERT_ACTION_TYPE.SHOW,
            payload: {
              alertType: ALERT_TYPE.INFO,
              message: "Egy admin létrehozott egy vendégházat!",
            },
          });
          break;
        case "update":
          const index = updateData.findIndex(
            (item: any) => item._id === ioData.payload._id
          );
          const updateItem = { ...updateData[index], ...ioData.payload };

          updateData = [
            ...updateData.slice(0, index),
            updateItem,
            ...updateData.slice(index + 1),
          ];
          setData(updateData);
          outletCtx.alertDispatch({
            type: ALERT_ACTION_TYPE.SHOW,
            payload: {
              alertType: ALERT_TYPE.INFO,
              message: "Egy admin módosított egy vendégházat!",
            },
          });
          break;
        case "delete":
          const ids = ioData.payload;
          ids.map((id: string) => {
            const index = updateData.findIndex((item: any) => item._id === id);
            updateData = [
              ...updateData.slice(0, index),
              ...updateData.slice(index + 1),
            ];
          });
          setData(updateData);
          outletCtx.alertDispatch({
            type: ALERT_ACTION_TYPE.SHOW,
            payload: {
              alertType: ALERT_TYPE.INFO,
              message: "Egy admin kitörölt egy vendégházat!",
            },
          });
          break;
        default:
          break;
      }
    });
  };

  const reFetch = async (ids?: string[]) => await fetchData({ ids });

  useEffect(() => {
    const cleanup = setTimeout(() => {
      const updateData: any[] = [];
      if (!hotelCtx.hotelId) return;
      fetchData({ data: updateData });
    }, 100);
    return () => clearTimeout(cleanup);
  }, [hotelCtx.hotelId]);

  return { data, reFetch };
};

export default useFetch;
