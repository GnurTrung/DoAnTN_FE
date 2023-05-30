/* eslint-disable react-hooks/exhaustive-deps */
import { DEFAULT_LIMIT } from "constants";
import { useWeb3 } from "contexts/useWeb3Context";
import { useNFTDetails, useShowModal } from "hooks";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router";
import { getActivityApi } from "services/activity";
import { getMoreNftApi, getNftDetailApi, likeNftApi } from "services/nfts";
import { v4 as uuidv4 } from "uuid";
import { useGetListOffer } from "./Hooks";
import { useApplication } from "contexts/useApplication";
import { getCollectionDetailApi } from "services/collection";
export const NftDetailContext = createContext();
export const useNftDetailContext = () => useContext(NftDetailContext);

export const Provider = ({ children }) => {
  const [nftDetail, setNftDetail] = useState(null);
  const [dataOnchain, setDataOnchain] = useState({});
  const [moreNfts, setMoreNfts] = useState([]);
  const [showOfferText, setShowOfferText] = useState(false);
  const [showAddToCard, setShowAddToCard] = useState(true);
  const [activity, setActivity] = useState({ data: [], nextPage: false });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [tab, setTab] = useState(0);
  const [collectionDetail, setCollectionDetail] = useState(null);

  const {
    showModal: showProcessing,
    onHide: onHideProcessing,
    onShow: onShowProcessing,
  } = useShowModal();
  const {
    showModal: showMakeOffer,
    onHide: onHideMakeOffer,
    onShow: onShowMakeOffer,
  } = useShowModal();
  const {
    showModal: showCancelOffer,
    onHide: onHideCancelOffer,
    onShow: onShowCancelOffer,
    dataModal: dataCancelOffer,
  } = useShowModal();
  const {
    showModal: showAcceptOffer,
    onHide: onCancelAcceptOffer,
    onShow: onShowAcceptOffer,
    dataModal: dataAcceptOffer,
  } = useShowModal();

  const {
    showModal: showWaiting,
    onHide: onHideWaiting,
    onShow: onShowWaiting,
  } = useShowModal();
  const {
    showModal: showSuccess,
    onHide: onHideSuccess,
    onShow: onShowSuccess,
  } = useShowModal();
  const { data: dataOffers } = useGetListOffer();
  const { onShowPopupWallet } = useApplication();

  const { id } = useParams();
  const { isAuthenticated } = useWeb3();
  const [refreshState, setRefreshState] = useState(uuidv4());

  const { getNFTDetails } = useNFTDetails();

  const getDataNFTOnchain = async (isReset = true) => {
    if (isReset) setDataOnchain({});
    const data = await getNFTDetails(id);
    setDataOnchain(data);
  };

  const onHideModalSuccess = () => {
    onHideSuccess();
    window.location.reload();
  };

  const handleLikeNft = useCallback(
    async (id) => {
      if (isAuthenticated) {
        const res = await likeNftApi({ nftAddress: id });
        if (res?.data) return res.data;
      } else onShowPopupWallet();
    },
    [id, isAuthenticated]
  );

  useEffect(() => {
    if (id && refreshState) getDataNFTOnchain();
  }, [id, refreshState]);

  const getNftDetail = async (isReset = true) => {
    setLoading(true);
    if (isReset) setNftDetail(null);
    const res = await getNftDetailApi(id);
    if (res?.data?.data) setNftDetail(res?.data?.data);
    setLoading(false);
  };

  useEffect(() => {
    if (id) getNftDetail();
  }, [id, isAuthenticated, refreshState]);

  useEffect(() => {
    const getCollectionDetail = async () => {
      const res = await getCollectionDetailApi(nftDetail?.collectionAddress);
      if (res.data) setCollectionDetail(res.data.data);
    };
    if (nftDetail?.ranking && nftDetail?.collectionAddress) {
      getCollectionDetail();
    }
  }, [nftDetail?.ranking, nftDetail?.collectionAddress]);

  useEffect(() => {
    const getNftActivity = async () => {
      const res = await getActivityApi({
        searchBy: 1,
        address: id,
        ...pagination,
      });
      if (res.data)
        setActivity({ data: res.data.rows, nextPage: res.data.nextPage });
    };
    if (id && tab === 1) getNftActivity();
  }, [tab, id]);

  useEffect(() => {
    const getMoreNfts = async () => {
      const res = await getMoreNftApi({
        address: id,
        collectionAddress: nftDetail?.collectionAddress,
        limit: 5,
        page: 1,
      });

      if (res?.data?.data) setMoreNfts(res?.data?.data?.rows || []);
    };

    if (nftDetail?.collectionAddress) getMoreNfts();
  }, [nftDetail?.collectionAddress, id, refreshState]);

  const refreshNftDetail = () => {
    setTimeout(() => {
      setRefreshState(uuidv4());
    }, 3500);
  };

  const refetchNftDetail = () => {
    setLoading(true);
    setTimeout(() => {
      getNftDetail(false);
    }, 2000);
  };

  const value = useMemo(() => {
    const onSelectTab = (value) => {
      setTab(value);
    };
    return {
      nftDetail,
      moreNfts,
      refreshNftDetail,
      dataOnchain,
      showProcessing,
      onHideProcessing,
      onShowProcessing,
      getDataNFTOnchain,
      dataOffers,
      showMakeOffer,
      onHideMakeOffer,
      onShowMakeOffer,
      showOfferText,
      setShowOfferText,
      showCancelOffer,
      onHideCancelOffer,
      onShowCancelOffer,
      dataCancelOffer,
      showAcceptOffer,
      onCancelAcceptOffer,
      onShowAcceptOffer,
      dataAcceptOffer,
      showAddToCard,
      setShowAddToCard,
      handleLikeNft,
      loading,
      activity,
      tab,
      onSelectTab,
      id,
      refetchNftDetail,
      showWaiting,
      onHideWaiting,
      onShowWaiting,
      showSuccess,
      onHideModalSuccess,
      onShowSuccess,
      collectionDetail,
    };
  }, [
    nftDetail,
    moreNfts,
    dataOnchain,
    showProcessing,
    onHideProcessing,
    onShowProcessing,
    getDataNFTOnchain,
    refreshNftDetail,
    dataOffers,
    showMakeOffer,
    onHideMakeOffer,
    onShowMakeOffer,
    showOfferText,
    setShowOfferText,
    showCancelOffer,
    onHideCancelOffer,
    onShowCancelOffer,
    dataCancelOffer,
    showAcceptOffer,
    onCancelAcceptOffer,
    onShowAcceptOffer,
    dataAcceptOffer,
    showAddToCard,
    setShowAddToCard,
    showWaiting,
    onHideWaiting,
    onShowWaiting,
    showSuccess,
    onHideModalSuccess,
    onShowSuccess,
    collectionDetail,
  ]);

  return (
    <NftDetailContext.Provider value={value}>
      {children}
    </NftDetailContext.Provider>
  );
};
