import { useProviderSigner } from "contexts";
import { useWeb3 } from "contexts/useWeb3Context";
import { useShowModal } from "hooks";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import {
  getINOPool,
  getINOUser,
  getProjectCMSByCode,
  getRankINO,
} from "services/nfts";

export const NftDetailContext = createContext();
export const useNftDetailContext = () => useContext(NftDetailContext);
export const getStoreKey = (code) => {
  return "INO_PROJECT_" + code;
};
export const Provider = ({ children }) => {
  const [nftData, setNFTData] = useState([]);
  const [rankingData, setRankingData] = useState({
    data: [],
    hasNextPage: false,
  });
  const [twitterVerify, setTwitterVerify] = useState("");
  const [shareObject, setShareObject] = useState([]);
  const [accNftData, setAccNFTData] = useState([]);
  const [nftDataPool, setNFTDataPool] = useState({});
  const { id } = useParams();
  const { suiWallet, isAuthenticated } = useWeb3();
  const { getObject } = useProviderSigner(suiWallet);
  const [gas, setGas] = useState(0.5);
  const [lastPL, setLastPL] = useState(0);
  const [lastWL, setLastWL] = useState(0);
  const [lastPV, setLastPV] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const {
    showModal: showModalWaitingForSignature,
    toggleModal: toggleModalWaitingForSignature,
    onHide: onHideModalWaitingForSignature,
  } = useShowModal();

  useEffect(() => {
    let interval;
    if (nftData?.attributes?.SCData?.SO_collection) {
      interval = setInterval(
        () => getDataSo(nftData?.attributes?.SCData?.SO_collection),
        5000
      );
    }
    return () => {
      clearInterval(interval);
    };
  }, [nftData?.attributes?.SCData?.SO_collection]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    try {
      const res = await getProjectCMSByCode(id);
      setNFTData(res?.data);
      const SO = await getObject(res?.data?.attributes?.SCData?.SO_collection);
      setTwitterVerify(
        !!localStorage.getItem(getStoreKey(res?.data?.attributes?.code))
      );
      setLastPL(shareObject?.option_mint_public?.fields?.sum_nft || 0);
      setLastWL(shareObject?.option_mint_whitelist?.fields?.sum_nft || 0);
      setLastPV(shareObject?.option_mint_public?.fields?.sum_nft || 0);
      setShareObject(SO?.data?.content?.fields);
      const options = {
        project: id,
      };
      const response = await getINOPool(options);
      setNFTDataPool(response?.data || []);
      const dataUser = await getINOUser();
      setAccNFTData(dataUser?.data || {});
    } catch (ex) {
      console.log(ex);
    }
  };

  const getDataSo = async (id) => {
    const SO = await getObject(id);
    setShareObject(SO?.data?.content?.fields);
  };

  useEffect(() => {
    const getRankData = async () => {
      const rank = await getRankINO({
        id,
        page: pagination.page,
        limit: pagination.limit,
      });
      setRankingData({
        data: rank?.data?.data || [],
        hasNextPage: rank?.data?.hasNextPage,
      });
    };
    if (id) getRankData();
  }, [id, pagination]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthenticated]);

  const value = useMemo(() => {
    const loadMore = () => {
      setPagination({ ...pagination, limit: pagination.limit + 10 });
    };
    return {
      nftData,
      accNftData,
      nftDataPool,
      getData,
      shareObject,
      setShareObject,
      twitterVerify,
      setTwitterVerify,
      rankingData,
      gas,
      setGas,
      showModalWaitingForSignature,
      toggleModalWaitingForSignature,
      onHideModalWaitingForSignature,
      loadMore,
      lastPL,
      lastWL,
      lastPV,
    };
  }, [
    nftData,
    accNftData,
    nftDataPool,
    getData,
    shareObject,
    twitterVerify,
    rankingData,
    gas,
    showModalWaitingForSignature,
    toggleModalWaitingForSignature,
    onHideModalWaitingForSignature,
    pagination,
    lastPL,
    lastWL,
    lastPV,
  ]);

  return (
    <NftDetailContext.Provider value={value}>
      {children}
    </NftDetailContext.Provider>
  );
};
