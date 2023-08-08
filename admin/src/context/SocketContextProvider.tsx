import { createContext, useEffect, useState } from "react";
import opensocket from "socket.io-client";

const server = process.env.REACT_APP_SOCKET as string;

export const SocketContext = createContext<any>({});

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [io, setIo] = useState<any>();

  useEffect(() => {
    const cleanup = setTimeout(() => {
      setIo(opensocket(server));
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);

  return (
    <>
      <SocketContext.Provider value={{ io }}>{children}</SocketContext.Provider>
    </>
  );
};

export default SocketContextProvider;
