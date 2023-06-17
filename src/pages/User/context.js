import { DEFAULT_LIMIT } from "constants";
import useProviderSigner from "contexts/useProviderSigner";
import { useWeb3 } from "contexts/useWeb3Context";
import { useRedirect } from "hooks";
import useQuery from "hooks/useQuery";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router";
import { likeNftApi } from "services/nfts";
import { getListNFTOff } from "services/userNFT";

export const UserContext = createContext();
export const STATUS_FILTER = [
  {
    label: "Listed",
    value: "listing",
  },
  {
    label: "Unlisted",
    value: "unlisting",
  },
];

export const DEFAULT_SEARCH_PARAMS = {
  title: "",
  status: "",
};

export const TABS_BY_INDEX = {
  0: "items",
  5: "favorite",
  6: "watchlist",
  1: "activity",
  2: "offers-made",
  3: "offers-received",
  4: "auction",
};

export const TABS_BY_NAME = {
  items: 0,
  favorite: 5,
  watchlist: 6,
  activity: 1,
  "offers-made": 2,
  "offers-received": 3,
  auction: 4,
};

export const OPTION_HIGHEST = [
  {
    label: "Highest Volume",
    value: "highest-volume",
  },
  {
    label: "Highest Sales",
    value: "highest-sale",
  },
  {
    label: "Highest Floor",
    value: "highest-floor",
  },
];

export const useContexts = () => useContext(UserContext);

export const Provider = ({ children }) => {
  const [collectionDetail, setCollectionDetail] = useState([null]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [userNFT, setUserNFT] = useState([]);
  const [paramsSearch, setParamsSearch] = useState(DEFAULT_SEARCH_PARAMS);
  const [userNFTOff, setUserNFTOff] = useState({ data: [], nextPage: false });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [activityStatus, setActivityStatus] = useState([]);
  const [tab, setTab] = useState(0);
  const { account } = useWeb3();

  const queries = useQuery();
  const { redirectToPage } = useRedirect();
  const { getNFTinWallet } = useProviderSigner();

  useEffect(() => {
    const getListNft = async () => {
      try {
        setLoading(true);
        const res = await getListNFTOff(id, {
          ...paramsSearch,
          ...pagination,
        });

        const walletNFTs = await getNFTinWallet(id);
        if (res.data) {
          let data = res.data.rows || [];
          if (walletNFTs && walletNFTs.length > 0) {
            for (let nft of walletNFTs) {
              if (!data.find((x) => x.nftId === nft.nftId)) data.push(nft);
            }
          }
          setUserNFTOff({ data, nextPage: res.data.nextPage });
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    if (id && tab === 0) getListNft();
  }, [paramsSearch, pagination, tab, id]);

  useEffect(() => {
    if (queries.tab) setTab(TABS_BY_NAME[queries?.tab]);
    else setTab(TABS_BY_NAME[TABS_BY_INDEX[0]]);
  }, [queries?.tab]);

  const handleLikeNft = useCallback(
    async (id) => {
      if (account) {
        const res = await likeNftApi({ nftAddress: id });
        if (res?.data) return res.data;
      }
    },
    [account]
  );

  const value = useMemo(() => {
    const onSelectTab = (value) => {
      setPagination({ page: 1, limit: DEFAULT_LIMIT });
      redirectToPage(`/profile/${id}?tab=${TABS_BY_INDEX[value]}`);
    };
    const loadMore = () => {
      setPagination({ ...pagination, limit: pagination.limit + DEFAULT_LIMIT });
    };
    return {
      userNFT,
      loading,
      setLoading,
      collectionDetail,
      id,
      setActivityStatus,
      activityStatus,
      setTab,
      onSelectTab,
      loadMore,
      userNFTOff,
      paramsSearch,
      setParamsSearch,
      pagination,
      tab,
      handleLikeNft,
    };
  }, [
    userNFT,
    loading,
    collectionDetail,
    id,
    activityStatus,
    userNFTOff,
    paramsSearch,
    pagination,
    tab,
    handleLikeNft,
    redirectToPage,
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
