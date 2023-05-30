import { Button, Checkbox, Collapse } from "antd";
import IconClean from "assets/icons/IconClean";
import IconExpand from "assets/icons/drawer/IconExpand";
import IconFilter from "assets/icons/IconFilter";
import IconGridMedium from "assets/icons/IconGridMedium";
import IconGridSmall from "assets/icons/IconGridSmall";
import cx from "classnames";
import NoData from "components/NoData";
import CustomCheckBox from "components/input/CheckBox";
import CustomSelect from "components/input/Select";
import TextInput from "components/input/TextInput";
import ProductCard from "components/product-card";
import SkeletonLoadingGrid from "components/product-card/SkeletonLoadingGrid";
import { useDebounce, useRedirect, useShowFilter } from "hooks";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { Toaster, toast } from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_SEARCH_PARAMS,
  SORT_OPTION,
  STATUS_FILTER,
  useCollectionDetailContext,
} from "../context";

const { Panel } = Collapse;

const Items = () => {
  const [isOnSmallGridMode, setIsOnSmallGridMode] = useState(true);
  const { isFilterShown, toggleFilter } = useShowFilter(!isMobile);
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const {
    listNft,
    setParamsSearch,
    loadingNft,
    paramsSearch,
    loadMoreNft,
    hasMoreNft,
    pagination,
    handleLikeNft,
  } = useCollectionDetailContext();

  const searchBarRef = useRef(null);
  const filterRef = useRef(null);
  const location = useLocation();
  const { redirectToPage } = useRedirect();

  const debounceSearchText = useDebounce(searchText, 300);
  const debouncePriceRange = useDebounce(priceRange, 300);

  useEffect(() => {
    setParamsSearch((oldParamsSearch) => ({
      ...oldParamsSearch,
      title: debounceSearchText,
      minPrice: debouncePriceRange.min,
      maxPrice: debouncePriceRange.max,
    }));
  }, [debounceSearchText, debouncePriceRange, setParamsSearch]);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const changeGridMode = (value) => {
    setIsOnSmallGridMode(value);
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
      setPriceRange({ ...priceRange, [type]: e.target.value });
  };

  const handleCleanAll = () => {
    setParamsSearch(DEFAULT_SEARCH_PARAMS);
  };
  const renderPropertyFilter = () => {
    return (
      <Collapse
        defaultActiveKey={["1"]}
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
          key="1"
          header={
            <span className="text-white text-[18px] font-semibold lead-[26px]">
              Status
            </span>
          }
          className="filter-header"
        >
          <Checkbox.Group
            className="flex flex-col space-y-4"
            onChange={onChangeStatus}
            value={paramsSearch.status.split(",")}
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
        <Panel
          key="2"
          header={
            <span className="text-white text-[18px] font-semibold lead-[26px]">
              Price
            </span>
          }
          className="filter-header"
        >
          <div className="w-full flex justify-between items-center">
            <TextInput
              placeholder="MIN"
              pattern="^[0-9]*[.,]?[0-9]*$"
              maxLength={79}
              value={priceRange.min}
              onChange={(e) => onChangePriceRange(e, "min")}
            />
            <span className="mx-3 text-white">-</span>
            <TextInput
              placeholder="MAX"
              pattern="^[0-9]*[.,]?[0-9]*$"
              maxLength={79}
              value={priceRange.max}
              onChange={(e) => onChangePriceRange(e, "max")}
            />
          </div>
        </Panel>
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
      }
    } catch (ex) {}
  };
  return (
    <div>
      <Toaster />
      <div
        className="top-option gap-4 flex-wrap lg:flex-nowrap top-[113px] lg:top-[121px]"
        ref={searchBarRef}
      >
        <div className="left-option lg:!basis-[50%] !basis-full">
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
        <div className="right-option flex-col !items-start sm:flex-row lg:!basis-[50%] !basis-full">
          <div className="flex w-full mb-[0.7rem] sm:mb-0">
            <button
              className="top-option_btn top-option_clean"
              onClick={() => toast.success("Coming Soon!")}
            >
              <span>
                <IconClean className="top-option_icon" />
                Sweep
              </span>
            </button>

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
              <Button className="btn-secondary w-full" onClick={handleCleanAll}>
                <span>Clear All</span>
              </Button>
            </div>
            <div className="widget widget-status widget-accordion">
              <div className="widget-content">{renderPropertyFilter()}</div>
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
                  {...item}
                  handleLikeNft={handleLikeNft}
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
