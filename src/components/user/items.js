import { Button, Checkbox, Collapse } from "antd";
import IconExpand from "assets/icons/drawer/IconExpand";
import IconFilter from "assets/icons/IconFilter";
import IconGridMedium from "assets/icons/IconGridMedium";
import IconGridSmall from "assets/icons/IconGridSmall";
import cx from "classnames";
import NoData from "components/NoData";
import CustomSelect from "components/input/Select";
import TextInput from "components/input/TextInput";
import SkeletonLoadingGrid from "components/product-card/SkeletonLoadingGrid.jsx";
import ProductCard from "components/product-card/index.jsx";
import { useDebounce, useNFTListing, useShowFilter, useShowModal } from "hooks";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { STATUS_FILTER, useContexts } from "../../pages/User/context.js";
import { isMobile } from "react-device-detect";
import CustomCheckBox from "components/input/CheckBox.jsx";
import IconListing from "assets/icons/IconListing.jsx";
import IconRefresh from "assets/icons/IconRefresh.jsx";
import IconEyeSlash from "assets/icons/IconEyeSlash.jsx";
import IconClose from "assets/icons/IconClose.jsx";
import IconTrash from "assets/icons/IconTrash.jsx";
import Image from "components/ProgressiveImage.js";
import { formatPrice } from "utils/index.js";
import ModalWaitingTransaction from "components/Modal/ModalWaitingTransaction.js";
import { toast } from "react-hot-toast";
import ModalSuccess from "components/Modal/ModalSuccess.js";
const { Panel } = Collapse;
export const DEFAULT_SEARCH_PARAMS = {
  orderBy: 0,
  filterProperties: "",
  title: "",
  status: STATUS_FILTER[0].value,
};

const BULK_ACTIONS = {
  BULK_LISTING: "bulkListing",
  BULK_TRANSFER: "bulkTransfer",
  BULK_HIDE: "bulkHide",
};

const BULK_ACTION_STEP = {
  SELECT: 1,
  ENTER_PRICE: 2,
};

const Items = () => {
  const {
    loading,
    collectionDetail,
    userNFTOff,
    paramsSearch,
    setParamsSearch,
    loadMore,
    pagination,
    handleLikeNft,
  } = useContexts();
  const [isOnSmallGridMode, setIsOnSmallGridMode] = useState(false);
  const { isFilterShown, toggleFilter, onHide } = useShowFilter(!isMobile);
  const [searchText, setSearchText] = useState("");
  const [bulkAction, setBulkAction] = useState(null);
  const [selectedNft, setSelectedNft] = useState([]);
  const [bulkActionStep, setBulkActionStep] = useState(BULK_ACTION_STEP.SELECT);
  const [selectedNftWithPrice, setSelectedNftWithPrice] = useState({});
  const [priceForAll, setPriceForAll] = useState("");
  const {
    showModal: showWaitingModal,
    onHide: onHideWaitingModal,
    onShow: onShowWaitingModal,
  } = useShowModal();
  const {
    showModal: showSuccessNodal,
    onHide: onHideSuccessModal,
    onShow: onShowSuccessModal,
  } = useShowModal();
  const { onBulkListing } = useNFTListing();

  const debounceSearchText = useDebounce(searchText, 300);
  const filterRef = useRef(null);
  const searchBarRef = useRef(null);
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

  useEffect(() => {
    if (bulkAction && bulkAction === BULK_ACTIONS.BULK_LISTING) {
      onChangeStatus([STATUS_FILTER[1].value]);
    }
  }, [bulkAction]);

  useEffect(() => {
    if (selectedNft.length) {
      const newSelectedNftWithPrice = {};
      for (let nftId of selectedNft) {
        const floorPriceListing = userNFTOff?.data?.find(
          (nft) => nft.nftId === nftId
        )?.floorPriceListing;
        newSelectedNftWithPrice[nftId] = formatPrice(
          floorPriceListing || 0
        ).toString();
      }
      setSelectedNftWithPrice(newSelectedNftWithPrice);
    }
  }, [selectedNft, userNFTOff?.data]);

  useEffect(() => {
    const currentSelectedNftPrice = { ...selectedNftWithPrice };
    for (let nftId in currentSelectedNftPrice) {
      currentSelectedNftPrice[nftId] = priceForAll;
    }
    setSelectedNftWithPrice(currentSelectedNftPrice);
  }, [priceForAll]);

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

  const handleClearAll = () => {
    setParamsSearch(DEFAULT_SEARCH_PARAMS);
  };

  const onChangeBulkAction = (value) => {
    setBulkAction(value);
  };

  const onSelectNft = (value) => {
    setSelectedNft(value);
  };

  const onClearAllSelectedNft = () => {
    setSelectedNft([]);
    setBulkAction(null);
    setSelectedNftWithPrice({});
    setBulkActionStep(BULK_ACTION_STEP.SELECT);
  };

  const onRemoveSelectedNft = (address) => {
    const newSelectedNfts = selectedNft.filter((nftId) => nftId !== address);
    setSelectedNft(newSelectedNfts);
  };

  const onChangeSelectNftPrice = (e, nftId) => {
    if (e.target.validity.valid) {
      setSelectedNftWithPrice({
        ...selectedNftWithPrice,
        [nftId]: e.target.value,
      });
    }
  };

  const onChangePriceForAll = (e) => {
    if (e.target.validity.valid) {
      setPriceForAll(e.target.value);
    }
  };

  const onBulkList = async () => {
    try {
      const prices = Object.values(selectedNftWithPrice);
      if (prices.includes("0") || prices.includes(""))
        return toast.error("Price must be greater than 0");
      onShowWaitingModal();
      const nftArray = userNFTOff?.data.filter((nft) =>
        selectedNft.includes(nft?.nftId)
      );
      const res = await onBulkListing(nftArray, selectedNftWithPrice);
      if (res) {
        setTimeout(() => {
          onHideWaitingModal();
          onShowSuccessModal();
        }, 5000);
      } else onHideWaitingModal();
    } catch (error) {
      console.log(error);
      onHideWaitingModal();
    }
  };

  const onHideModalSuccessAndRefresh = () => {
    onHideSuccessModal();
    window.location.reload();
  };
  const options = [
    {
      label: (
        <div className="flex items-center space-x-2">
          <IconListing />
          <span>Bulk Listing</span>
        </div>
      ),
      value: BULK_ACTIONS.BULK_LISTING,
    },
    {
      label: (
        <div className="flex items-center space-x-2">
          <IconRefresh />
          <span>Bulk Transfer</span>
        </div>
      ),
      value: BULK_ACTIONS.BULK_TRANSFER,
    },
    {
      label: (
        <div className="flex items-center space-x-2">
          <IconEyeSlash />
          <span>Bulk Hide</span>
        </div>
      ),
      value: BULK_ACTIONS.BULK_HIDE,
    },
  ];

  const renderPropertyFilter = () => {
    return (
      <Collapse
        defaultActiveKey={[1]}
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
            className="flex flex-col space-y-4"
            onChange={onChangeStatus}
            value={paramsSearch.status.split(",")}
            disabled={bulkAction === BULK_ACTIONS.BULK_LISTING}
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
      <div
        className="top-option gap-4 flex-wrap lg:flex-nowrap top-[113px] lg:top-[121px]"
        ref={searchBarRef}
      >
        <div className="left-option !basis-full lg:!basis-[65%]">
          <Button
            className={cx("btn-secondary mr-4", {
              "bg-[#364055] text-white": isFilterShown,
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
        <div className="right-option !basis-full lg:!basis-[35%]">
          <div className="flex-1 !rounded-3xl">
            <CustomSelect
              value={bulkAction}
              options={options}
              placeholder="Bulk Action"
              className="flex justify-between"
              onChange={onChangeBulkAction}
            />
          </div>

          <ul className="option-view">
            <li>
              <button
                className={cx(
                  "cursor-pointer w-[3rem] h-[3rem] rounded-full flex justify-center items-center mr-4  bg-[#1B2333] hover:bg-[#364055]",
                  { "bg-[#364055] focus:bg-[#364055]": !isOnSmallGridMode }
                )}
                onClick={() => changeGridMode(false)}
              >
                <IconGridSmall data={isOnSmallGridMode} />
              </button>
            </li>
            <li>
              <button
                className={cx(
                  "cursor-pointer w-[3rem] h-[3rem] rounded-full flex justify-center items-center bg-[#1B2333] hover:bg-[#364055]",
                  { "bg-[#364055] focus:bg-[#364055]": isOnSmallGridMode }
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
              <h6 className="widget-title result !font-[inter]">
                {userNFTOff?.data.length || 0} result(s)
              </h6>
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
            "col-span-6": isFilterShown && bulkAction,
            "col-span-12": !isFilterShown && !bulkAction,
            "col-span-9":
              (isFilterShown && !bulkAction) || (!isFilterShown && bulkAction),
          })}
        >
          <Checkbox.Group
            className="block"
            value={selectedNft}
            onChange={onSelectNft}
            disabled={bulkActionStep === BULK_ACTION_STEP.ENTER_PRICE}
          >
            <InfiniteScroll
              dataLength={pagination.limit}
              next={loadMore}
              hasMore={userNFTOff.nextPage}
              loader={<SkeletonLoadingGrid />}
              className={cx("grid gap-4", {
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 !overflow-hidden":
                  !isOnSmallGridMode,
                "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 !overflow-hidden":
                  isOnSmallGridMode,
              })}
            >
              {!userNFTOff.data?.length && !loading ? (
                <div className="col-span-full mt-8">
                  <NoData description="No NFTs found" />
                </div>
              ) : (
                userNFTOff.data?.map((item, index) => (
                  <ProductCard
                    key={item.nftId}
                    handleLikeNft={handleLikeNft}
                    {...item}
                    isOnBulkAction={Boolean(bulkAction)}
                    onSelectNft={onSelectNft}
                    selectedNft={selectedNft}
                    disabledCheckbox={
                      bulkActionStep === BULK_ACTION_STEP.ENTER_PRICE
                    }
                  />
                ))
              )}
              {loading && <SkeletonLoadingGrid />}
            </InfiniteScroll>
          </Checkbox.Group>
        </div>
        {!!bulkAction && (
          <div className="bg-[#131924] rounded-2xl col-span-3 h-fit">
            <div className="border-b border-solid border-[#4E4D6E] p-5 flex items-center justify-between">
              <span className="text-white font-semibold text-base">
                Bulk Listing
              </span>
              <IconClose
                className="cursor-pointer"
                onClick={onClearAllSelectedNft}
              />
            </div>
            <div className="rounded-b-2xl p-5">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium ">
                    {selectedNft.length} items
                  </span>
                  <Button
                    className="btn-secondary h-9"
                    onClick={onClearAllSelectedNft}
                  >
                    Clear All
                  </Button>
                </div>
                {bulkActionStep === BULK_ACTION_STEP.ENTER_PRICE && (
                  <div>
                    <p className="text-white font-medium text-sm mb-1">
                      Price for all
                    </p>
                    <input
                      className="bg-[#364055] rounded-2xl text-sm px-3 py-2 w-full"
                      placeholder="Enter Price For All Items"
                      value={priceForAll}
                      pattern="[0-9\.]*$"
                      onChange={onChangePriceForAll}
                    />
                  </div>
                )}
                <div className="flex flex-col space-y-3">
                  {userNFTOff?.data
                    ?.filter((nft) => selectedNft.includes(nft.nftId))
                    ?.map((nftDetail, index) => (
                      <div className="rounded-2xl p-3 bg-[#1B2333]">
                        <div
                          className="flex items-center justify-between w-full"
                          key={index}
                        >
                          <div className="flex flex-col items-start w-full">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center space-x-2 group cursor-pointer">
                                <Image
                                  src={nftDetail?.imageUrl}
                                  alt="NFT"
                                  className="rounded-lg w-[40px] h-[40px]"
                                />
                                <div className="flex flex-col items-start justify-between text-xs font-medium h-full">
                                  <span className="text-white leading-5 group-hover:underline">
                                    {nftDetail?.title}
                                  </span>
                                  <span className="text-[#BABAC7] leading-5">
                                    {nftDetail?.collectionName}
                                  </span>
                                </div>
                              </div>
                              {bulkActionStep === BULK_ACTION_STEP.SELECT ? (
                                <IconTrash
                                  className="cursor-pointer"
                                  onClick={() =>
                                    onRemoveSelectedNft(nftDetail?.nftId)
                                  }
                                />
                              ) : null}
                            </div>

                            {bulkActionStep ===
                              BULK_ACTION_STEP.ENTER_PRICE && (
                              <div className="mt-4">
                                <span className="text-[#9998AC] text-sm font-semibold leading-5 pb-1">
                                  Price (SUI)
                                </span>
                                <input
                                  className="bg-[#364055] rounded-2xl text-sm px-3 py-2 w-full"
                                  placeholder="Enter Price"
                                  value={selectedNftWithPrice[nftDetail?.nftId]}
                                  pattern="[0-9\.]*$"
                                  onChange={(e) =>
                                    onChangeSelectNftPrice(e, nftDetail.nftId)
                                  }
                                />
                                {nftDetail?.floorPriceListing && (
                                  <p className="text-xs font-medium text-[#9998AC] leading-5 mt-1">
                                    Floor:{" "}
                                    {formatPrice(nftDetail?.floorPriceListing)}{" "}
                                    SUI
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {bulkActionStep === BULK_ACTION_STEP.SELECT &&
                selectedNft.length ? (
                  <Button
                    className="btn-primary w-full"
                    onClick={() => setBulkActionStep(2)}
                  >
                    Continue
                  </Button>
                ) : null}
                {bulkActionStep === BULK_ACTION_STEP.ENTER_PRICE &&
                selectedNft.length ? (
                  <div className="w-full flex items-center justify-between gap-5">
                    <Button
                      className="btn-secondary basis-1/2"
                      onClick={() => setBulkActionStep(BULK_ACTION_STEP.SELECT)}
                    >
                      Back
                    </Button>
                    <Button
                      className="btn-primary basis-1/2"
                      onClick={onBulkList}
                    >
                      List items
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalWaitingTransaction
        show={showWaitingModal}
        onHide={onHideWaitingModal}
      />
      <ModalSuccess
        show={showSuccessNodal}
        onHide={onHideModalSuccessAndRefresh}
      />
    </div>
  );
};
export default Items;
