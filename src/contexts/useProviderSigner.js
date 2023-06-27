import { JsonRpcProvider } from "@mysten/sui.js";
import { NFT_STATUS } from "constants/nft-action";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FULLNODE } from "../constants/wallets";
import useNetwork from "../hooks/useNetwork";

const useProviderSigner = (wallet) => {
  const { network, provider } = useNetwork();
  const [currentWallet, setCurrentWallet] = useState();

  useEffect(() => {
    window.JsonRpcProvider = JsonRpcProvider;
    setCurrentWallet(wallet || window.suiWallet);
  }, [wallet]);

  const getNetWork = () => {
    const network = `https://fullnode.mainnet.sui.io/`;
    return {
      fullnode: network,
      faucet: network,
      websocket: network,
    };
  };

  const getObjectsOwnedByObject = async (address) => {
    let results = [];
    if (!network || !address) return results;
    try {
      const provider = new JsonRpcProvider(getNetWork());
      const objectInfos = await provider.getObjectsOwnedByObject(address);
      return objectInfos;
    } catch (ex) {
      console.log(ex);
    }
    return results;
  };
  const getObject = async (address) => {
    let results = [];
    if (!network || !address) return results;
    try {
      const provider = new JsonRpcProvider(getNetWork());
      const request = {
        id: address,
        options: {
          showType: true,
          showContent: true,
          showBcs: true,
          showOwner: true,
          showPreviousTransaction: true,
          showStorageRebate: true,
          showDisplay: true,
          showEffects: true,
        },
      };
      const objectInfos = await provider.getObject(request);
      return objectInfos;
    } catch (ex) {
      console.log(ex);
      toast.error("Network request failed");
    }
    return results;
  };
  const getBalanceByAddress = async (address, type = "0x2::sui::SUI") => {
    if (!address) return false;
    const provider = new JsonRpcProvider(getNetWork());
    const totalBalance = await provider.getBalance({
      owner: address,
      coinType: type,
    });
    return totalBalance?.totalBalance;
  };

  const requestFaucet = async (address) => {
    try {
      const provider = new JsonRpcProvider(getNetWork());
      await provider.requestSuiFromFaucet(
        "https://faucet.testnet.sui.io/gas",
        address
      );
      //const result =  await provider.requestSuiFromFaucet(address)
      //console.log('done',result)
      toast.success("Success!");
    } catch (ex) {
      console.log(ex);
      toast.error("Network request failed");
    }
  };

  const getObjectsOwnedByAddress = async (address) => {
    let results = [];
    if (!network || !address) return results;
    try {
      const provider = new JsonRpcProvider(getNetWork());
      const objectInfos = await provider.getOwnedObjects({
        owner: address,
        // filter: '0x2::sui::SUI'
        options: { showType: true },
      });
      return objectInfos;
    } catch (ex) {
      console.log(ex);
    }
    return results;
  };

  const getObjectByID = async (objectID) => {
    let results = {};
    if (!network) return results;

    try {
      const provider = new JsonRpcProvider(getNetWork());
      const object = await provider.getObject(objectID);
      return object;
    } catch (ex) {
      console.log(ex);
    }
    return results;
  };

  const getNFT = async (address, cursor = "") => {
    try {
      const request = {
        owner: address,
        limit: 50,
        options: {
          showType: true,
          showContent: true,
          showBcs: true,
          showOwner: true,
          showPreviousTransaction: true,
          showStorageRebate: true,
          showDisplay: true,
          showEffects: true,
        },
      };
      if (cursor) request.cursor = cursor;
      const provider = new JsonRpcProvider(getNetWork());

      window.provider = provider;
      window.request = request;

      let {
        data = [],
        hasNextPage,
        nextCursor,
      } = await provider.getOwnedObjects(request);
      data = data.filter((x) => x.data);
      return {
        data: data.filter((x) => !x.data.type.startsWith("0x2::coin")),
        hasNextPage,
        nextCursor,
      };
    } catch (ex) {
      console.log(ex);
    }
    return [];
  };

  const getNFTinWallet = async (address, hasFormat = true) => {
    if (!address) return {};
    try {
      let hasNext = true;
      let cursor = "";
      let results = [];
      while (hasNext) {
        const {
          data = [],
          hasNextPage,
          nextCursor,
        } = await getNFT(address, cursor);
        hasNext = hasNextPage;
        cursor = nextCursor;
        for (let nft of data) {
          results.push(nft);
        }
      }
      return hasFormat ? formatNFTResponse(results) : results;
    } catch (ex) {
      console.log(ex);
    }
    return [];
  };

  const formatNFTResponse = (nfts) => {
    try {
      nfts = nfts.filter((x) => x?.data?.display?.data);
      return nfts.reduce((result, item) => {
        const { data } = item;
        const {
          objectId: nftId,
          owner: { AddressOwner, ObjectOwner },
        } = data;
        const {
          display: {
            data: { image_url: imageUrl, link, name: title, description },
          },
        } = data;
        const collectionAddress = data.type.split("::")[0];
        const ownerAddress = AddressOwner || ObjectOwner;
        console.log(item);
        result.push({
          nftId,
          ownerAddress,
          imageUrl,
          title,
          isListing: false,
          isOnWallet: true,
          nftStatus: NFT_STATUS.CANCEL,
          collectionAddress,
        });
        return result;
      }, []);
    } catch (ex) {
      console.log(ex);
    }
    return [];
  };
  const getBalanceByCoinType = async (address, type) => {
    if (!address) return false;
    const totalBalance = await provider.getBalance({
      owner: address,
      coinType: type,
    });
    const coinMetaData = await provider.getCoinMetadata({ coinType: type });
    return { ...totalBalance, ...coinMetaData };
  };

  const getAllCoins = async (address) => {
    if (!address) return false;
    const allCoins = await provider.getAllCoins({
      owner: address,
    });
    return allCoins?.data;
  };

  return {
    getObjectsOwnedByAddress,
    getObjectByID,
    getBalanceByAddress,
    getObjectsOwnedByObject,
    getObject,
    currentWallet,
    requestFaucet,
    getNFTinWallet,
    formatNFTResponse,
    getNetWork,
    getBalanceByCoinType,
    getAllCoins,
  };
};

export default useProviderSigner;
