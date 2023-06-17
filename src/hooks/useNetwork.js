import { JsonRpcProvider } from "@mysten/sui.js";
import { FULLNODE } from "constants/wallets";
import { useState } from "react";

const IS_TESTNET = true;

const networkCf = IS_TESTNET
  ? sessionStorage.getItem(FULLNODE) || `https://sui-fullnode.tocen.co/`
  : "https://fullnode.devnet.sui.io:443";

const providerSUI = new JsonRpcProvider({
  fullnode: networkCf,
  faucet: networkCf,
  websocket: networkCf,
});

const useNetwork = () => {
  const [network, setNetwork] = useState(networkCf);
  const [provider, setProvider] = useState(providerSUI);

  const setRPCUse = (fullnode) => {
    sessionStorage.setItem(FULLNODE, fullnode);
  };

  return { network, provider, setRPCUse };
};
export default useNetwork;
