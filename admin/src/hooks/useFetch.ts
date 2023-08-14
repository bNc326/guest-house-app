import { useState, useEffect, useContext } from "react";
import { HotelContext } from "../context/HotelContextProvider";
import { RefreshContext, RefreshEnum } from "../context/RefreshContextProvider";
import useSocket from "./useSocket";
import { SocketData } from "./useSocket";
interface Fetch {
  data: any[];
  reFetch: (ids?: string[]) => void;
}

const useFetch = (
  endpoint: string,
  fnOpt?: {
    query?: string;
    socketData?: SocketData;
  }
): Fetch => {
  const [data, setData] = useState<any[]>([]);
  const hotelCtx = useContext(HotelContext);
  const refreshCtx = useContext(RefreshContext);
  const { initSocketProvider } = useSocket(setData);

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
      `${url}/${endpoint}?hotel=${hotelCtx.hotelId}&filter=${fnOpt?.query}`
    );

    if (!response.ok) {
      console.log("error");
      refreshCtx.handleRefresh(RefreshEnum.END);
    } else {
      const dbData = await response.json();
      updateData = [...dbData];
      setData(updateData);
      refreshCtx.handleRefresh(RefreshEnum.END);
    }
    if (fnOpt?.socketData) {
      initSocketProvider(updateData, fnOpt.socketData);
    }
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
