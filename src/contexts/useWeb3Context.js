/* eslint-disable react-hooks/exhaustive-deps */
//import { Base64DataBuffer, Ed25519Keypair, JsonRpcProvider, RawSigner } from "@mysten/sui.js";
import { Ed25519Keypair, RawSigner } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { useWallet } from "@suiet/wallet-kit";
import { CHAIN_TYPE } from "constants/chain";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  ACCOUNT_ADDRESS,
  SUIET_NAME,
  SUIET_TAG,
  wallets,
} from "../constants/wallets";
import { EConnectStatus } from "../enums/EConnectStatus";
import { useNetwork, useSuiWallet } from "../hooks";
import { deleteData, saveData } from "../utils/storage-utils";
import { useApplication } from "./useApplication";
import useAuthentication from "./useAuthentication";
import useProviderSigner from "./useProviderSigner";
import { getCookie } from "utils/cookie-utils";
import { MESSAGE_BYTES, SIGNATURE } from "constants/authentication";
import { TOCE_COIN_TYPE } from "constants";

export const Web3Context = React.createContext();
export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const { setWalletConnect, suiWallet, walletData } = useSuiWallet();

  const { login, logout, setIsAuthenticated, isAuthenticated } =
    useAuthentication();
  const { onHidePopupWallet } = useApplication();
  const [connected, setConnected] = useState(false);
  const [msgNotice, setMsgNotice] = useState(null);
  const [account, setAccount] = useState(null);
  const [connectStatus, setConnectStatus] = useState(EConnectStatus.NONE);
  const [showWallet, setShowWallet] = useState(false);
  const [balance, setBalance] = useState(0);
  const [TOCEBalance, setTOCEBalance] = useState(0);
  const { setRPCUse, provider } = useNetwork();
  const { isConnected, currentAccount, signMessage, disconnect } =
    useWalletKit();
  const [isMounted, setIsMounted] = useState(false);

  const walletSuiet = useWallet();

  const { getBalanceByAddress } = useProviderSigner();

  const SPACE_NAME = "Spacecy Sui Wallet";

  useEffect(() => {
    // checkRPC()
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && currentAccount) {
      setConnected(true);
      setConnectStatus(EConnectStatus.CONNECTED);
      //   toast.success("Login Success");
      onLoginKit(currentAccount);
    } else {
      //isMounted && handleDisconnect()
    }
  }, [isConnected, currentAccount, isMounted]);

  const onLoginKit = async (currentAccount) => {
    //console.log('onLoginKit', isMounted, getCookie())
    //  setTimeout(async () => {
    const params = {
      network: CHAIN_TYPE,
      address: currentAccount?.address,
    };

    const cookie_message = getCookie(MESSAGE_BYTES);
    const cookie_sign = getCookie(SIGNATURE);

    if (!cookie_message || !cookie_sign) {
      try {
        const msg = `tocen::${currentAccount?.address}`;
        const msgBytes = new TextEncoder().encode(msg);
        const result = await signMessage({
          message: msgBytes,
        });
        params.messageBytes = result.messageBytes;
        params.signature = result.signature;
      } catch (error) {
        console.log("error", error);
        await disconnect();
        setConnected(false);
        return;
      }
    } else {
      const messageBytes = decodeURIComponent(cookie_message);
      const signature = decodeURIComponent(cookie_sign);
      params.messageBytes = messageBytes;
      params.signature = signature;
    }

    await login(params);
    // }, 1000)
  };

  useEffect(() => {
    // window.walletSuiet = walletSuiet;
    if (!walletSuiet.connected) return;
    const suietWallet = wallets.find((x) => x.tag == SUIET_TAG);
    setConnected(true);
    setConnectStatus(EConnectStatus.CONNECTED);
    setWalletConnect(suietWallet);
    handleLogin(suietWallet);
  }, [walletSuiet.connected]);

  const handleConnect = (wallet) => {
    if (!wallet) return;
    onConnectClick(wallet);
  };

  const onConnectClick = async (wallet) => {
    const { tag, ext } = wallet;
    const suiWallet = window[tag];

    if (!suiWallet) {
      window.open(ext, "_blank", "noopener,noreferrer");
      return;
    }

    if (tag.toLowerCase() === SUIET_TAG) {
      connectSuiet();
      return;
    }

    setConnectStatus(EConnectStatus.CONNECTING);
    try {
      let data;
      let walletTag = wallet.tag.toLowerCase();

      if (walletTag === "martian")
        data = await window.martian.sui.connect(wallet.permissions);
      else if (walletTag === "fewcha") {
        data = await window.fewcha.connect();
      } else if (walletTag === "__suiet__") {
        data = await window.__suiet__.connect(wallet.permissions);
      } else if (walletTag === "spacecy") {
        data = await window.spacecy.sui.requestPermissions();
      } else data = await suiWallet.requestPermissions();

      if (data) {
        setConnected(true);
        setConnectStatus(EConnectStatus.CONNECTED);
        setWalletConnect(wallet);
        handleLogin(wallet);
        toast.success("Login Success");
      }
    } catch (e) {
      console.log(e);
      setMsgNotice(e);
      setConnectStatus(EConnectStatus.NONE);
    } finally {
      setShowWallet(false);
    }
  };

  const handleLogin = async ({ name, tag }) => {
    try {
      //const provider = new JsonRpcProvider(network);
      const keypair = new Ed25519Keypair();
      const signer = new RawSigner(keypair, provider);
      const signData = new Buffer(
        new TextEncoder().encode("Tocen NFT Marketplace world!")
      );

      const result = await signer.signData(signData);
      console.log("signData", result);
      const suiWalletObject = getSuiWalletEntity(window[tag]);

      let account = false;
      let account_address = false;
      if (suiWalletObject.name === SPACE_NAME) {
        account = await suiWalletObject.account();
        account_address = account;
      } else {
        account = await suiWalletObject.getAccounts();
        account_address = name === SUIET_NAME ? account.data[0] : account[0];
      }

      await login({
        network: CHAIN_TYPE,
        signature: `tocen::login::${Date.now()}`, // result.signature,
        address: account_address,
      });
    } catch (ex) {
      console.log(ex);
    }
    onHidePopupWallet();
  };

  const connectSuiet = async () => {
    try {
      const { select } = walletSuiet;
      setConnectStatus(EConnectStatus.CONNECTING);
      select(SUIET_NAME);
    } catch (ex) {
      setMsgNotice(ex);
      setConnectStatus(EConnectStatus.NONE);
    } finally {
      setShowWallet(false);
    }
  };

  useEffect(() => {
    if (connected) {
      setConnectStatus(EConnectStatus.CONNECTED);
      getAccountInfo();
      // handleLogin(suiWallet)
    } else {
      setAccount(null);
    }
  }, [connected, connectStatus]);

  const getAccountInfo = async () => {
    try {
      const account_address = currentAccount?.address;
      setAccount(account_address);
      saveData(ACCOUNT_ADDRESS, account_address);
      const balance = await getBalanceByAddress(account_address);
      setBalance(balance);
      const TOCEBalance = await getBalanceByAddress(
        account_address,
        TOCE_COIN_TYPE
      );
      setTOCEBalance(TOCEBalance);
      // const suiWalletObject = getSuiWalletEntity(suiWallet)
      // let account = false;
      // let account_address = false;
      // if (suiWalletObject.name === SPACE_NAME) {
      //     account = await suiWalletObject.account();
      //     account_address = account
      // } else {
      //     account = await suiWalletObject.getAccounts();
      //     account_address = (suiWallet.name === SUIET_NAME) ? account.data[0] : account[0]
      // }
      // setAccount(account_address);
      // saveData(ACCOUNT_ADDRESS, account_address)
      // console.log('account_address', account_address)
      // const balance = await getBalanceByAddress(account_address)
      // setBalance(balance)
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    let timeout;
    if (msgNotice) {
      timeout = setTimeout(() => setMsgNotice(null), 10000);
    }
    return () => clearTimeout(timeout);
  }, [msgNotice]);

  useEffect(() => {
    try {
      if (suiWallet && suiWallet.name != SUIET_NAME) {
        window.suiWallettest = suiWallet;
        const suiWalletObject = getSuiWalletEntity(suiWallet);

        suiWalletObject.requestPermissions().then(() => {
          setConnected(true);
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }, [suiWallet]);

  const getSuiWalletEntity = (suiWallet) =>
    suiWallet.sui ? suiWallet.sui : suiWallet;

  const handleDisconnect = async () => {
    await disconnect();
    logout();
    setConnected(false);
    setConnectStatus(EConnectStatus.NONE);
    deleteData(ACCOUNT_ADDRESS);
  };

  const value = useMemo(
    () => ({
      account,
      onConnectClick,
      connectStatus,
      suiWallet,
      showWallet,
      balance,
      setShowWallet,
      handleConnect,
      handleDisconnect,
      walletData,
      setIsAuthenticated,
      isAuthenticated,
      getBalanceByAddress,
      TOCEBalance,
    }),
    [
      account,
      connectStatus,
      onConnectClick,
      suiWallet,
      showWallet,
      setShowWallet,
      handleConnect,
      handleDisconnect,
      balance,
      walletData,
      setIsAuthenticated,
      isAuthenticated,
      getBalanceByAddress,
      TOCEBalance,
    ]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
