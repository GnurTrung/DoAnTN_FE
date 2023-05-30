import { DEFAULT_LIMIT } from "constants";
import { useWeb3 } from "contexts/useWeb3Context";
import { useDebounce } from "hooks";
import { useCallback } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { getActivityApi } from "services/activity";
import { addToWatchlistApi, getCollectionDetailApi } from "services/collection";
import { getNFTsByCollectionIdApi, likeNftApi } from "services/nfts";
import { v4 as uuidv4 } from "uuid";
import useSweepItem from "./Hooks/useSweepItem";
import useQuery from "hooks/useQuery";
import { useApplication } from "contexts/useApplication";

export const STATUS_FILTER = [
  {
    label: "Buy now",
    value: "buy-now",
  },
  {
    label: "Not for sale",
    value: "not-for-sale",
  },
];

export const SORT_OPTION = [
  {
    label: "Price: Low to High",
    value: 1,
  },
  {
    label: "Price: High to Low",
    value: 0,
  },
  {
    label: "Recent Listing",
    value: 5,
  },
  // {
  //   label: "Recent Listing",
  //   value: "recentListing",
  // },
  // {
  //   label: "Recent sale",
  //   value: "recentSale",
  // },
  // {
  //   label: "Recent activity",
  //   value: "recentActivity",
  // },

  // {
  //   label: "Rarity: Rare to Common",
  //   value: "rareToCommon",
  // },
  // {
  //   label: "Rarity: Common to Rare",
  //   value: "commonToRare",
  // },
];

export const DEFAULT_SEARCH_PARAMS = {
  orderBy: SORT_OPTION[0].value,
  filter: {},
  title: "",
  status: "",
  minPrice: null,
  maxPrice: null,
  minRank: null,
  maxRank: null,
};

export const CollectionDetaiLContext = createContext();
export const useCollectionDetailContext = () =>
  useContext(CollectionDetaiLContext);
export const Provider = ({ children }) => {
  const [collectionDetail, setCollectionDetail] = useState(null);
  const [listNft, setListNft] = useState({ data: [], nextPage: false });
  const query = useQuery();
  const [paramsSearch, setParamsSearch] = useState({
    ...DEFAULT_SEARCH_PARAMS,
    orderBy: Number(query.sort) || DEFAULT_SEARCH_PARAMS.orderBy,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [activity, setActivity] = useState({ data: [], nextPage: false });
  const [loadingNft, setLoadingNft] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activityStatus, setActivityStatus] = useState([]);
  const [tab, setTab] = useState(0);
  const [refreshState, setRefreshState] = useState(uuidv4());
  const [filterDefaultActiveKey, setFilterDefaultActiveKey] = useState([1]);
  const { account } = useWeb3();
  const { onShowPopupWallet } = useApplication();

  const debounceMinPrice = useDebounce(paramsSearch.minPrice, 300);
  const debounceMaxPrice = useDebounce(paramsSearch.maxPrice, 300);
  const debounceMinRank = useDebounce(paramsSearch.minRank, 300);
  const debounceMaxRank = useDebounce(paramsSearch.maxRank, 300);

  const [sweepItem, setSweepItem] = useState(0);
  const {
    nftSweep,
    totalSUISweep,
    getItemSweep,
    setMinSUISweep,
    setMaxSUISweep,
    minSUISweep,
    maxSUISweep,
  } = useSweepItem();

  const { id } = useParams();
  useEffect(() => {
    const getCollectionDetail = async (id) => {
      const res = await getCollectionDetailApi(id);
      if (res.data.data) setCollectionDetail(res.data.data);
    };
    if (id) getCollectionDetail(id);
  }, [id, refreshState]);

  useEffect(() => {
    getItemSweep({ sweepItem, nfts: listNft?.data || [] });
  }, [sweepItem, listNft, minSUISweep, maxSUISweep]);

  useEffect(() => {
    const getListNft = async () => {
      setLoadingNft(true);
      const filterPropertiesKey = Object.keys(paramsSearch.filter).join(",");
      let filterPropertiesArray = [];
      for (let key in paramsSearch.filter) {
        for (let value of paramsSearch.filter[key]) {
          filterPropertiesArray.push({ key, value: value });
        }
      }
      const filterProperties = filterPropertiesArray.length
        ? JSON.stringify(filterPropertiesArray)
        : null;
      const params = {
        title: paramsSearch.title,
        orderBy: paramsSearch.orderBy,
        minPrice: paramsSearch.minPrice,
        maxPrice: paramsSearch.maxPrice,
        minRank: paramsSearch.minRank,
        maxRank: paramsSearch.maxRank,
        status: paramsSearch.status,
        filterPropertiesKey,
        filterProperties,
      };
      const res = await getNFTsByCollectionIdApi({
        collectionAddress: collectionDetail?.address,
        ...params,
        ...pagination,
      });
      if (res.data.data) {
        setListNft({
          data: res.data.data.rows,
          nextPage: res.data.data.nextPage,
        });
      }
      setLoadingNft(false);
    };
    if (collectionDetail?.address && tab === 0) getListNft();
  }, [
    paramsSearch.filter,
    debounceMaxPrice,
    debounceMinPrice,
    paramsSearch.orderBy,
    paramsSearch.status,
    paramsSearch.title,
    debounceMinRank,
    debounceMaxRank,
    collectionDetail?.address,
    tab,
    pagination.limit,
    pagination.page,
  ]);

  useEffect(() => {
    const getActivity = async () => {
      setLoading(true);
      const res = await getActivityApi({
        searchBy: 0,
        address: id,
        activityType: activityStatus,
        ...pagination,
      });
      if (res.data)
        setActivity({ data: res.data.rows, nextPage: res.data.nextPage });
      setLoading(false);
    };
    if (id && tab === 1) getActivity();
  }, [id, activityStatus, pagination, tab]);

  useEffect(() => {
    setPagination({ page: 1, limit: DEFAULT_LIMIT });
    setListNft({ data: [], nextPage: false });
  }, [
    paramsSearch.filterProperties,
    debounceMaxPrice,
    debounceMinPrice,
    paramsSearch.orderBy,
    paramsSearch.status,
    paramsSearch.title,
  ]);

  useEffect(() => {
    let filterParams = {};
    let defaultActiveKey = [];
    if (collectionDetail?.filterProperties?.length) {
      collectionDetail?.filterProperties?.forEach((filter) => {
        filter.values.forEach((value) => {
          if (value.isFiltered) {
            filterParams[filter.key] = filterParams[filter.key] || [];
            filterParams[filter.key]?.push(value.name);
            if (!defaultActiveKey.includes(filter.key))
              defaultActiveKey.push(filter.key);
          }
        });
      });
      setParamsSearch({ ...paramsSearch, filter: filterParams });
      setFilterDefaultActiveKey([
        ...filterDefaultActiveKey,
        ...defaultActiveKey,
      ]);
    }
  }, [collectionDetail?.filterProperties]);

  const handleAddToWatchlist = useCallback(async () => {
    if (!account) {
      onShowPopupWallet();
      return;
    }
    const res = await addToWatchlistApi(id);
    if (res.data) setRefreshState(uuidv4());
  }, [id]);

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
    const loadMoreNft = () => {
      setPagination({
        ...pagination,
        limit: pagination.limit + DEFAULT_LIMIT,
      });
    };
    const onSelectTab = (value) => {
      setPagination({ page: 1, limit: DEFAULT_LIMIT });
      setTab(value);
      setListNft({ data: [], nextPage: false });
    };
    return {
      collectionDetail,
      listNft,
      setParamsSearch,
      paramsSearch,
      loadingNft,
      setLoadingNft,
      pagination,
      loadMoreNft,
      activity,
      activityStatus,
      setActivityStatus,
      loading,
      onSelectTab,
      handleAddToWatchlist,
      handleLikeNft,
      sweepItem,
      setSweepItem,
      nftSweep,
      totalSUISweep,
      setMinSUISweep,
      setMaxSUISweep,
      minSUISweep,
      maxSUISweep,
      filterDefaultActiveKey,
      setFilterDefaultActiveKey,
    };
  }, [
    pagination,
    listNft,
    collectionDetail,
    paramsSearch,
    loadingNft,
    activity,
    activityStatus,
    loading,
    handleAddToWatchlist,
    handleLikeNft,
    sweepItem,
    setSweepItem,
    nftSweep,
    totalSUISweep,
    setMinSUISweep,
    setMaxSUISweep,
    minSUISweep,
    maxSUISweep,
    filterDefaultActiveKey,
    setFilterDefaultActiveKey,
  ]);

  return (
    <CollectionDetaiLContext.Provider value={value}>
      {children}
    </CollectionDetaiLContext.Provider>
  );
};
