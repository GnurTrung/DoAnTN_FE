/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useContexts, Provider } from "../contexts/radars";
import { Link, useLocation } from "react-router-dom";
import { Search } from "components/RadarComponents";
import logoDefault from "assets/images/ranking/ranking-df.png";
import Meta from "components/Meta";
import CustomSelect from "components/input/Select";
import InfiniteScroll from "react-infinite-scroll-component";
import { mystToSui } from "utils/wallet-utils";
import NoData from "components/NoData";
import { VERIFIED_TYPE } from "constants";
import IconVerified from "assets/icons/IconVerified";

function RankingImpl() {
  const location = useLocation();
  const {
    data,
    categoryName,
    setCategoryName,
    paramsSearch,
    setParamsSearch,
    loadMoreNft,
    pagination,
  } = useContexts();
  const router = location.pathname.replace("/", "");
  const onSortChange = async (e) => {
    const value = e;
    if (!value) return;
    setParamsSearch({ ...paramsSearch, typeFilter: value });
  };

  const onSortDateChange = async (e) => {
    const value = e;
    setCategoryName(value.toUpperCase());
    if (!value) return;
    setParamsSearch({ ...paramsSearch, time: value });
  };

  const renderLogo = (src) => {
    const condition =
      src && (src.startsWith("https://") || src.startsWith("http://"));
    return condition ? src : logoDefault;
  };

  const renderTable = () => {
    try {
      if (!data?.data || data?.data.length === 0) {
        return (
          <div
            className="flex transition-shadow hover:shadow-lg w-full"
            role="row"
          >
            <div
              className="border-jacarta-600 flex w-[28%] items-center border-t py-4 px-4 flex-1 justify-center"
              role="cell"
            >
              <span className="">
                <div className="col-span-full mt-8">
                  <NoData description="Data not found!" />
                </div>
              </span>
            </div>
          </div>
        );
      }
      const ui = (
        router == "ranking" ? data?.data : data?.data.slice(0, 15)
      ).map((item, index) => {
        return (
          <InfiniteScroll
            dataLength={pagination.limit}
            next={loadMoreNft}
            hasMore={data.nextPage}
            key={index}
          >
            <div
              className={`!text-white flex rounded-2xl my-[0.6rem] hover:bg-[#1B2333]`}
              role="row"
            >
              <div
                className={`border-jacarta-600 w-[5%] flex pl-[1rem] items-center py-[12px] px-8 pointer-events-none`}
                role="cell"
              >
                <div
                  className={`
                                     w-[100%] h-[100%] flex justify-center items-center`}
                >
                  <span>{index + 1}</span>
                </div>
              </div>
              <div
                className="border-jacarta-600 flex w-[31%] items-center py-[12px] pl-[0.6rem] pr-[1rem]"
                role="cell"
              >
                {
                  <figure className="relative mr-4 flex-shrink-0">
                    <img
                      src={renderLogo(item?.logo)}
                      alt={"title"}
                      layout="responsive"
                      className="rounded-2lg !h-[60px] !w-[60px] !object-cover inline-block"
                      loading="lazy"
                    />
                  </figure>
                }
                <Link
                  className="hover:text-accent font-display font-semibold"
                  to={`/collection/${item.address}`}
                >
                  <div className="flex items-center space-x-1">
                    {item?.verifyType === VERIFIED_TYPE.VERIFIED ? (
                      <IconVerified />
                    ) : null}
                    <span>{item.name}</span>
                  </div>
                </Link>
              </div>
              <div
                className="border-jacarta-600 flex w-[15%] py-[12px] px-4 flex-col justify-center"
                role="cell"
              >
                <span className={"font-display font-semibold"}>
                  {mystToSui(item[`floorPriceListing`] || 0)}
                </span>
                <span
                  className={
                    (
                      item[
                        `percentageFloor${categoryName.toLocaleLowerCase()}`
                      ] || "0"
                    ).slice(0, 1) == "-"
                      ? "font-display font-semibold text-[#ed3535]"
                      : "font-display font-semibold text-[#38d760]"
                  }
                >
                  {`${
                    item[
                      `percentageFloor${categoryName.toLocaleLowerCase()}`
                    ] || "--"
                  } %`}
                </span>
              </div>
              <div
                className="border-jacarta-600 flex w-[15%] py-[12px] px-4 flex-col justify-center"
                role="cell"
              >
                <span className={"font-display font-semibold"}>
                  {item[`sales${categoryName.toLocaleLowerCase()}`] || 0}
                </span>
                <span
                  className={
                    (
                      item[
                        `percentageSales${categoryName.toLocaleLowerCase()}`
                      ] || "0"
                    ).slice(0, 1) == "-"
                      ? "font-display font-semibold text-[#ed3535]"
                      : "font-display font-semibold text-[#38d760]"
                  }
                >
                  {`${
                    item[
                      `percentageSales${categoryName.toLocaleLowerCase()}`
                    ] || "--"
                  } %`}
                </span>
              </div>
              <div
                className="border-jacarta-600 flex w-[15%] items-center py-4 px-4"
                role="cell"
              >
                <span className="font-display font-semibold lg:block">
                  {Math.ceil(mystToSui(item.totalVolume || 0)).toLocaleString(
                    undefined
                  )}
                  {/* {parseInt(item.totalVolume || 0).toLocaleString(undefined)} */}
                </span>
              </div>
              <div
                className="border-jacarta-600 flex w-[10%] items-center py-[12px] px-4"
                role="cell"
              >
                <span className="font-display font-semibold">
                  {parseInt(item.owners || 0).toLocaleString(undefined)}
                </span>
              </div>
              <div
                className="border-jacarta-600 flex w-[5%] items-center py-[12px] px-4"
                role="cell"
              >
                <span className="font-display font-semibold">
                  {parseInt(item.total_items || 0).toLocaleString(undefined)}
                </span>
              </div>
            </div>
          </InfiniteScroll>
        );
      });
      return ui;
    } catch (ex) {
      console.log(ex);
    }
  };

  const optionsDate = [
    {
      label: "1D",
      value: "1d",
    },
    {
      label: "7D",
      value: "7d",
    },
    {
      label: "1M",
      value: "1m",
    },
  ];

  const optionsHighest = [
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

  return (
    <>
      <Meta title={"Tocen - NFT Marketplace Ranking"} />
      <div className="tf-container pb-36 pt-20">
        <div className="flex justify-between lg:items-center mb-4 flex-col lg:flex-row items-start gap-[1rem] lg:gap-0">
          <h4 className={"heading text-4xl font-semibold"}>Top Collections</h4>
          <div className="flex lg:justify-end sm:items-center gap-[1rem] flex-col sm:flex-row w-full sm:w-[unset]">
            <Search className="w-full !mr-0" />
            <div className="flex gap-[1rem]">
              <div className="!h-full">
                <CustomSelect
                  value={categoryName}
                  options={optionsDate}
                  className="flex justify-between w-[5rem]"
                  onChange={onSortDateChange}
                />
              </div>
              <div className="!h-full w-full">
                <CustomSelect
                  value={paramsSearch.typeFilter}
                  options={optionsHighest}
                  className="flex justify-between !w-full sm:!w-[12rem] !font-semibold"
                  onChange={onSortChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="scrollbar-custom overflow-x-auto">
          <div
            role="table"
            className="lg:rounded-[32px] py-[20px] w-full min-w-[61rem] text-white text-[14px]"
          >
            <div className="rounded-[32px] flex" role="row">
              <div className="w-[3%] py-3 px-4" role="columnheader">
                <span className="text-[#BABAC7] w-full overflow-hidden text-ellipsis font-[600]">
                  No
                </span>
              </div>
              <div className="w-[32%] py-3 px-4" role="columnheader">
                <span className="text-[#BABAC7] m-8 w-full overflow-hidden text-ellipsis font-[600]">
                  Name
                </span>
              </div>
              <div className="w-[15%] py-3 px-4" role="columnheader">
                <span className="text-[#BABAC7] w-full overflow-hidden text-ellipsis font-[600]">
                  {`Floor(${categoryName})`}
                </span>
              </div>
              <div className="w-[15%] py-3 px-4" role="columnheader">
                <span className="text-[#BABAC7] w-full overflow-hidden text-ellipsis font-[600]">
                  {`Sales(${categoryName})`}
                </span>
              </div>
              <div className="w-[15%] py-3 px-4" role="columnheader">
                <span className="text-[#BABAC7] w-full overflow-hidden text-ellipsis font-[600]">
                  Total Volume
                </span>
              </div>
              <div className="w-[10%] py-3 px-8" role="columnheader">
                <span className="text-[#BABAC7] w-full overflow-hidden text-ellipsis font-[600]">
                  Owners
                </span>
              </div>
              <div className="w-[10%] py-3 px-8" role="columnheader">
                <span className="text-[#BABAC7] w-full overflow-hidden text-ellipsis font-[600]">
                  Items
                </span>
              </div>
            </div>
            {renderTable()}
          </div>
        </div>
        {router != "ranking" && (
          <div className="col-md-12">
            <div className="load-more flex justify-center mt-5">
              <Link to="/ranking" className="hover:text-accent">
                <button className="btn-secondary wow fadeInUp px-8">
                  See more
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const Ranking = (props) => (
  <Provider>
    <RankingImpl {...props} />
  </Provider>
);

export default Ranking;
