/* eslint-disable react-hooks/exhaustive-deps */
//import { Base64DataBuffer, Ed25519Keypair, JsonRpcProvider, RawSigner } from "@mysten/sui.js";
import { useShowModal } from "hooks";
import React, { useContext, useMemo } from "react";

export const ApplicationContext = React.createContext();
export const useApplication = () => useContext(ApplicationContext);

export const ApplicationProvider = ({ children }) => {
  const {
    showModal: showPopupWallet,
    onHide: onHidePopupWallet,
    onShow: onShowPopupWallet,
  } = useShowModal();

  const {
    showModal: showModalSwap,
    onHide: onHideModalSwap,
    onShow: onShowModalSwap,
  } = useShowModal();
  const value = useMemo(
    () => ({
      showPopupWallet,
      onHidePopupWallet,
      onShowPopupWallet,
      showModalSwap,
      onHideModalSwap,
      onShowModalSwap,
    }),
    [
      showPopupWallet,
      onHidePopupWallet,
      onShowPopupWallet,
    ]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
