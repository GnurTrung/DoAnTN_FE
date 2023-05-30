import { JsonRpcProvider } from "@mysten/sui.js";
import { FULLNODE } from "constants/wallets";
import { useEffect, useState } from "react";

const IS_TESTNET = true;

const networkCf = IS_TESTNET
  ? (sessionStorage.getItem(FULLNODE) || `https://sui-fullnode.tocen.co/`)//'https://sui-fullnode.tocen.co/'
  : "https://fullnode.devnet.sui.io:443";
// : "https://fullnode.devnet.vincagame.com"
// : "https://suinode-testnet.belaunch.io:443"
// : "https://sui-fullnode.tocen.co"

const providerSUI = new JsonRpcProvider({
  fullnode: networkCf,
  faucet: networkCf,
  websocket: networkCf,
});

const useNetwork = () => {
  const [network, setNetwork] = useState(networkCf);
  const [provider, setProvider] = useState(providerSUI);
  const [rpc, setRPC] = useState('`https://sui-fullnode.tocen.co/')

  const setRPCUse = (fullnode) => {
    sessionStorage.setItem(FULLNODE, fullnode)
  }

  // useEffect(() => {
  //     let network = getData(NETWORK);
  //     if (!network)
  //         network = networkCf
  //     setNetwork(networkCf)
  //     const provider = new JsonRpcProvider({
  //         fullnode: network,
  //         faucet: network,
  //         websocket: network,
  //     });
  //     window.provider = provider;
  //     setProvider(provider)
  // }, [])

  // const switchToMainNet = () => { }
  // const switchToDevNet = () => {
  //     setNetwork(networkCf)
  //     saveData(NETWORK, networkCf)
  // }

  return { network, provider, setRPCUse };
};
export default useNetwork;
