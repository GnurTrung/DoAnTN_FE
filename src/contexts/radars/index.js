/* eslint-disable react-hooks/exhaustive-deps */
import { DEFAULT_LIMIT } from "constants";
import { getAsync } from "helpers/request";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
export const DEFAULT_SEARCH_PARAMS = {
  name: "",
  typeFilter: "highest-volume",
  time: "1d",
};

export const RadarContext = createContext();
export const useContexts = () => useContext(RadarContext);
export const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [categoryName, setCategoryName] = useState("1D");
  const [paramsSearch, setParamsSearch] = useState(DEFAULT_SEARCH_PARAMS);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  const explorerNFT = async ({ ...params }) => {
    return await getAsync(`/collection/get-list`, params);
  };
  useEffect(() => {
    const getListNft = async () => {
      const res = await explorerNFT({
        ...paramsSearch,
        ...pagination,
      });
      if (res.data.data) {
        setData({ data: res.data.data.rows, nextPage: res.data.data.nextPage });
      }
    };

    getListNft();
  }, [paramsSearch, pagination]);

  const value = useMemo(() => {
    const loadMoreNft = () => {
      setPagination({
        ...pagination,
        limit: pagination.limit + DEFAULT_LIMIT,
      });
    };
    return {
      data,
      setData,
      loadMoreNft,
      textSearch,
      setTextSearch,
      paramsSearch,
      setParamsSearch,
      categoryName,
      setCategoryName,
      pagination,
    };
  }, [data, textSearch, paramsSearch, categoryName, pagination]);

  return (
    <RadarContext.Provider value={value}>{children}</RadarContext.Provider>
  );
};
