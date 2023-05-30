import { Button, Checkbox, Collapse, Radio } from "antd";
import IconExpand from "assets/icons/drawer/IconExpand";
import IconFilter from "assets/icons/IconFilter";
import IconGridMedium from "assets/icons/IconGridMedium";
import IconGridSmall from "assets/icons/IconGridSmall";
import cx from "classnames";
import NoData from "components/NoData";
import CustomCheckBox from "components/input/CheckBox";
import CustomRadio from "components/input/Radio";
import CustomSelect from "components/input/Select";
import TextInput from "components/input/TextInput";
import ProductCard from "components/product-card";
import SkeletonLoadingGrid from "components/product-card/SkeletonLoadingGrid";
import { useDebounce, useRedirect, useShowFilter } from "hooks";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_SEARCH_PARAMS,
  SORT_OPTION,
  STATUS_FILTER,
  useCollectionDetailContext,
} from "../context";
import { TOP_RANK } from "constants";
const { Panel } = Collapse;

const Items = () => {
  const [isOnSmallGridMode, setIsOnSmallGridMode] = useState(false);
  const { isFilterShown, toggleFilter } = useShowFilter(!isMobile);
  const [searchText, setSearchText] = useState("");
  const {
    collectionDetail,
    listNft,
    setParamsSearch,
    loadingNft,
    paramsSearch,
    loadMoreNft,
    pagination,
    handleLikeNft,
    setSweepItem,
    sweepItem,
    nftSweep,
    filterDefaultActiveKey,
    setFilterDefaultActiveKey,
  } = useCollectionDetailContext();

  const searchBarRef = useRef(null);
  const filterRef = useRef(null);
  const location = useLocation();
  const { redirectToPage } = useRedirect();
  const debounceSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    setParamsSearch((oldParamsSearch) => ({
      ...oldParamsSearch,
      title: debounceSearchText,
    }));
  }, [debounceSearchText, setParamsSearch]);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const changeGridMode = (value) => {
    setIsOnSmallGridMode(value);
  };

  const onChangePropertiesFilter = (values, key) => {
    if (values.length) {
      setParamsSearch({
        ...paramsSearch,
        filter: { ...paramsSearch.filter, [key]: values },
      });
    } else {
      const newFilter = { ...paramsSearch.filter };
      delete newFilter[key];
      setParamsSearch({ ...paramsSearch, filter: newFilter });
    }
  };

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value.trim());
  };

  const onChangeStatus = (values) => {
    if (values.length) {
      const statusString = values.join(",");
      setParamsSearch({ ...paramsSearch, status: statusString });
    } else setParamsSearch({ ...paramsSearch, status: "" });
  };

  const onChangeSort = (value) => {
    setParamsSearch({ ...paramsSearch, orderBy: value });
    redirectToPage(`${location.pathname}?sort=${value}`);
  };

  const onChangePriceRange = (e, type) => {
    if (e.target.validity.valid)
      setParamsSearch({ ...paramsSearch, [type]: e.target.value });
  };

  const handleClearAll = () => {
    setParamsSearch(DEFAULT_SEARCH_PARAMS);
  };

  const onSetRankRange = (value) => {
    setParamsSearch({ ...paramsSearch, minRank: 0, maxRank: value });
  };

  const onChangeRankRange = (e, type) => {
    if (e.target.validity.valid)
      setParamsSearch({ ...paramsSearch, [type]: e.target.value });
  };

  const TOP_RARITY = [
    {
      label: "Top 1%",
      value: parseInt(collectionDetail?.total_items / 100),
    },
    {
      label: "Top 10%",
      value: parseInt(collectionDetail?.total_items / 10),
    },
    {
      label: "Top 25%",
      value: parseInt(collectionDetail?.total_items / 4),
    },
  ];

  const renderPropertyFilter = () => {
    return (
      <Collapse
        onChange={(values) => {
          setFilterDefaultActiveKey(values);
        }}
        activeKey={filterDefaultActiveKey}
        ghost
        expandIconPosition="end"
        className="w-full"
        expandIcon={({ isActive }) => (
          <IconExpand
            className={cx(
              { "rotate-180": !isActive },
              "transition-all duration-300"
            )}
          />
        )}
      >
        <Panel
          header={
            <span className="text-white text-[18px] font-semibold lead-[26px]">
              Status
            </span>
          }
          className="filter-header"
          key={1}
        >
          <Checkbox.Group
            className="grid grid-cols-2 gap-y-2 gap-x-4"
            onChange={onChangeStatus}
            value={paramsSearch.status.split(",")}
            name="status"
          >
            {STATUS_FILTER.map((filter, index) => (
              <div key={index} className="text-[14px] text-[#BABAC7]">
                <CustomCheckBox value={filter.value}>
                  <span className="text-[14px] text-[#BABAC7]">
                    {filter.label}
                  </span>
                </CustomCheckBox>
              </div>
            ))}
          </Checkbox.Group>
        </Panel>
        {collectionDetail?.rarity && (
          <Panel
            header={
              <span className="text-white text-[18px] font-semibold lead-[26px]">
                Rarity
              </span>
            }
            className="filter-header"
            key={2}
          >
            <div className="flex flex-col space-y-5">
              <div className="flex items-center justify-between">
                {TOP_RARITY.map((range, index) => (
                  <div
                    key={index}
                    className={cx("btn-secondary text-xs cursor-pointer", {
                      "bg-[#323268] text-white":
                        paramsSearch.minRank === 0 &&
                        Number(paramsSearch.maxRank) === range.value,
                    })}
                    onClick={() => onSetRankRange(range.value)}
                  >
                    {range.label}
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-between items-center">
                <TextInput
                  placeholder="MIN"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  maxLength={79}
                  value={paramsSearch.minRank}
                  onChange={(e) => onChangeRankRange(e, "minRank")}
                />
                <span className="mx-3 text-white">-</span>
                <TextInput
                  placeholder="MAX"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  maxLength={79}
                  value={paramsSearch.maxRank}
                  onChange={(e) => onChangeRankRange(e, "maxRank")}
                />
              </div>
            </div>
          </Panel>
        )}
        <Panel
          header={
            <span className="text-white text-[18px] font-semibold lead-[26px]">
              Price
            </span>
          }
          className="filter-header"
          key={3}
        >
          <div className="w-full flex justify-between items-center">
            <TextInput
              placeholder="MIN"
              pattern="^[0-9]*[.,]?[0-9]*$"
              maxLength={79}
              value={paramsSearch.minPrice}
              onChange={(e) => onChangePriceRange(e, "minPrice")}
            />
            <span className="mx-3 text-white">-</span>
            <TextInput
              placeholder="MAX"
              pattern="^[0-9]*[.,]?[0-9]*$"
              maxLength={79}
              value={paramsSearch.maxPrice}
              onChange={(e) => onChangePriceRange(e, "maxPrice")}
            />
          </div>
        </Panel>

        {collectionDetail.filterProperties.map((property, index) => (
          <Panel
            header={
              <span className="text-white text-[18px] font-semibold lead-[26px]">
                {property.key}
              </span>
            }
            key={property.key}
            className="filter-header"
          >
            <Checkbox.Group
              onChange={(values) =>
                onChangePropertiesFilter(values, property.key)
              }
              value={paramsSearch.filter[property.key] || []}
              className="w-full flex flex-col"
              name={property.key}
            >
              {property.values.map((value, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-[14px] text-[#BABAC7] mb-4"
                >
                  <CustomCheckBox value={value.name}>
                    <span className="text-[14px] text-[#BABAC7]">
                      {value.name}
                    </span>
                  </CustomCheckBox>
                  {value.count}
                </div>
              ))}
            </Checkbox.Group>
          </Panel>
        ))}
      </Collapse>
    );
  };

  const isSticky = () => {
    try {
      const searchSticky = searchBarRef.current?.offsetTop;
      const filterStick = filterRef.current?.offsetTop;
      if (window.scrollY - 80 > searchSticky) {
        searchBarRef.current.classList.add("sticky-search");
        if (filterStick) filterRef.current.classList.add("sticky-filter");
      } else {
        searchBarRef.current.classList.remove("sticky-search");
        if (filterStick) filterRef.current.classList.remove("sticky-filter");
      }
    } catch (ex) {}
  };

  const calculateTopRank = (ranking) => {
    if (!ranking) return 0;
    if (ranking <= parseInt(collectionDetail?.total_items / 100))
      return TOP_RANK.TOP_1;
    if (ranking <= parseInt(collectionDetail?.total_items / 10))
      return TOP_RANK.TOP_10;
    if (ranking <= parseInt(collectionDetail?.total_items / 4))
      return TOP_RANK.TOP_25;
  };
  return (
    <div>
      <div
        className="top-option gap-4 flex-wrap lg:flex-nowrap top-[113px] lg:top-[121px]"
        ref={searchBarRef}
      >
        <div className="left-option !basis-full lg:!basis-[50%]">
          <Button
            className={cx("btn-secondary mr-4", {
              "bg-[#323268] text-white": isFilterShown,
            })}
            onClick={toggleFilter}
          >
            <IconFilter className="top-option_icon" data={isFilterShown} />
            <span className="ml-[8px]">Filter</span>
          </Button>
          <div className="top-option_search flex-1">
            <TextInput
              type="text"
              placeholder="Search by NFT"
              onChange={onChangeSearchText}
              iconSearch
            />
          </div>
        </div>
        <div className="right-option flex-col !items-start sm:flex-row !basis-full lg:!basis-[50%]">
          <div className="flex w-full mb-[0.7rem] sm:mb-0">
            <div className="flex-1">
              <CustomSelect
                value={paramsSearch.orderBy}
                options={SORT_OPTION}
                onChange={onChangeSort}
                className="flex justify-between"
              />
            </div>
          </div>

          <ul className="option-view !ml-0 sm:!ml-[1rem]">
            <li>
              <button
                className={cx(
                  "cursor-pointer w-[3rem] h-[3rem] rounded-full flex justify-center items-center mr-4  bg-[#2A294F] hover:bg-[#323268]",
                  { "bg-[#323268] focus:bg-[#323268]": !isOnSmallGridMode }
                )}
                onClick={() => changeGridMode(false)}
              >
                <IconGridSmall data={isOnSmallGridMode} />
              </button>
            </li>
            <li>
              <button
                className={cx(
                  "cursor-pointer w-[3rem] h-[3rem] rounded-full flex justify-center items-center bg-[#2A294F] hover:bg-[#323268]",
                  { "bg-[#323268] focus:bg-[#323268]": isOnSmallGridMode }
                )}
                onClick={() => changeGridMode(true)}
              >
                <IconGridMedium data={isOnSmallGridMode} />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div
          className={cx(
            "col-span-12 md:col-span-5 lg:col-span-3 content_left h-fit sticky-filter",
            { block: isFilterShown, hidden: !isFilterShown }
          )}
          ref={filterRef}
        >
          <div className="sidebar sidebar-explore">
            <div className="widget widget-search">
              <Button className="btn-secondary w-full" onClick={handleClearAll}>
                <span>Clear All</span>
              </Button>
            </div>
            <div className="widget widget-status widget-accordion">
              <div className="widget-content">
                {collectionDetail && renderPropertyFilter()}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cx({
            "hidden lg:col-span-9 md:block md:col-span-7": isFilterShown,
            "col-span-12": !isFilterShown,
          })}
        >
          <InfiniteScroll
            dataLength={pagination.limit}
            next={loadMoreNft}
            hasMore={listNft.nextPage}
            loader={<SkeletonLoadingGrid />}
            className={cx("grid gap-4", {
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 !overflow-hidden":
                !isOnSmallGridMode,
              "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 !overflow-hidden":
                isOnSmallGridMode,
            })}
          >
            {!listNft.data?.length && !loadingNft ? (
              <div className="col-span-full mt-8">
                <NoData description="No NFTs found" />
              </div>
            ) : (
              listNft.data?.map((item, index) => (
                <ProductCard
                  key={item.id}
                  handleLikeNft={handleLikeNft}
                  isActive={!!nftSweep.find((x) => x.nftId === item.nftId)}
                  {...item}
                  top={calculateTopRank(item?.ranking)}
                />
              ))
            )}
            {loadingNft && <SkeletonLoadingGrid />}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Items;
