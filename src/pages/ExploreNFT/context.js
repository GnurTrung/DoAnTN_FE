import { DEFAULT_LIMIT } from "constants";
import { useWeb3 } from "contexts/useWeb3Context";
import { useMounted } from "hooks";
import useQuery from "hooks/useQuery";
import { useCallback } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { explorerNFT, likeNftApi } from "services/nfts";

export const STATUS_FILTER = [
  {
    label: "Buy now",
    value: "buy-now",
  },
  {
    label: "Not for sale",
    value: "not-for-sale",
  },
  {
    label: "Verified",
    value: "verify",
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
  orderBy: SORT_OPTION[2].value,
  title: "",
  status: [STATUS_FILTER[2].value, STATUS_FILTER[0].value].join(","),
  minPrice: null,
  maxPrice: null,
};

export const CollectionDetaiLContext = createContext();
export const useCollectionDetailContext = () =>
  useContext(CollectionDetaiLContext);
export const Provider = ({ children }) => {
  const query = useQuery();
  const [listNft, setListNft] = useState({ data: [], nextPage: false });
  const [paramsSearch, setParamsSearch] = useState({
    ...DEFAULT_SEARCH_PARAMS,
    orderBy: Number(query.sort) || DEFAULT_SEARCH_PARAMS.orderBy,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [loadingNft, setLoadingNft] = useState(false);
  const [tab, setTab] = useState(0);
  const { isMounted } = useMounted();
  const { account } = useWeb3();

  useEffect(() => {
    if (!isMounted) return;
    const getListNft = async () => {
      setLoadingNft(true);

      const res = await explorerNFT({
        // collectionAddress: "0x21a32433509c050c8776c2c340cdd349740ec2f3",
        ...paramsSearch,
        ...pagination,
      });
      if (res.data.data) {
        setListNft({
          data: res.data.data.rows,
          nextPage: res.data.data.nextPage,
        });
        setLoadingNft(false);
      }
    };

    getListNft();
  }, [paramsSearch, pagination, tab, isMounted]);

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
    };
    return {
      listNft,
      setParamsSearch,
      paramsSearch,
      loadingNft,
      setLoadingNft,
      pagination,
      loadMoreNft,
      onSelectTab,
      handleLikeNft,
    };
  }, [listNft, paramsSearch, loadingNft, pagination, handleLikeNft]);

  return (
    <CollectionDetaiLContext.Provider value={value}>
      {children}
    </CollectionDetaiLContext.Provider>
  );
};
