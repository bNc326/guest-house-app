import { createContext, useState } from "react";

export enum RefreshEnum {
  START = "refresh_start",
  END = "refresh_end",
}

interface Refresh {
  isRefresh: boolean;
  loading: RefreshEnum;
  handleRefresh: (method: RefreshEnum) => void;
}

export const RefreshContext = createContext<Refresh>({
  isRefresh: false,
  loading: RefreshEnum.END,
  handleRefresh: () => {},
});

const RefreshContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<RefreshEnum>(RefreshEnum.END);
  const handleRefresh = (method: RefreshEnum) => {
    setLoading(method);
  };
  return (
    <RefreshContext.Provider value={{ isRefresh, loading, handleRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export default RefreshContextProvider;
