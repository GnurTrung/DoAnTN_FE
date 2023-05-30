import React, { useContext, useEffect, useMemo, useState } from "react";
import BaseSocket from "services/socket";
import { useWeb3 } from "./useWeb3Context";
import { io } from "socket.io-client";
const SocketContext = React.createContext();
export const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null);
  const { isAuthenticated, account } = useWeb3();
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Initialize socket!");
      const instance = new BaseSocket();
      instance.joinRoom(account);
      setSocketInstance(instance);
    } else {
      if (socketInstance) socketInstance.socket.disconnect();
    }
    return () => {
      if (socketInstance) socketInstance.socket.disconnect();
    };
  }, [isAuthenticated, account]);

  const value = useMemo(() => ({ socketInstance }), [socketInstance]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
