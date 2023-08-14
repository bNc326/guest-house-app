import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContextProvider";
import { useOutletContext } from "react-router-dom";
import { Outlet } from "../models/OutletModel";
import { HotelContext } from "../context/HotelContextProvider";
import { ALERT_ACTION_TYPE, ALERT_TYPE } from "../models/Alert/AlertModels";

export interface SocketData {
  socketEndpoint: string;
  alert?: { new?: string; update?: string; delete?: string };
}

const useSocket = (setData: React.Dispatch<React.SetStateAction<any>>) => {
  const [initialData, setInitialData] = useState<any[]>([]);
  const [socketData, setSocketData] = useState<SocketData>();
  const socketCtx = useContext(SocketContext);
  const outletCtx = useOutletContext() as Outlet;

  useEffect(() => {
    if (!socketData) return;

    let updateData: any[] = [...initialData];
    socketCtx.io.on(
      socketData.socketEndpoint,
      (ioData: { action: string; payload: any }) => {
        switch (ioData.action) {
          case "new":
            updateData = [ioData.payload, ...updateData];
            setData(updateData);
            outletCtx.alertDispatch({
              type: ALERT_ACTION_TYPE.SHOW,
              payload: {
                alertType: ALERT_TYPE.INFO,
                message: socketData.alert?.new
                  ? socketData.alert.new
                  : "Új elem lett létrehozva!",
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
                message: socketData.alert?.update
                  ? socketData.alert.update
                  : "Egy admin módosított egy elemet!",
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
                message: socketData.alert?.delete
                  ? socketData.alert.delete
                  : "Egy admin kitörölt egy/több elemet!",
              },
            });
            break;
          default:
            break;
        }
      }
    );
  }, [initialData]);

  const initSocketProvider = (data: any[], socketData: SocketData) => {
    setInitialData(data);
    setSocketData(socketData);
  };

  return { initSocketProvider };
};

export default useSocket;
