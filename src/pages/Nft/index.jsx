import { Button } from "antd";
import IconCard from "assets/icons/IconCart";
import IconExternal from "assets/icons/IconExternal.jsx";
import IconHeart from "assets/icons/IconHeart";
import IconRefresh from "assets/icons/IconRefresh";
import avt1 from "assets/images/author/author-detail-3.png";
import avtd3 from "assets/images/author/authour-bid-1.png";
import Meta from "components/Meta";
import { ModalProcessing } from "components/Modal";
import Image from "components/ProgressiveImage";
import ReadMore from "components/ReadMore";
import ProductCard from "components/product-card";
import { useApplication } from "contexts/useApplication";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { refreshOwnerApi } from "services/nfts";
import { formatWallet } from "utils/wallet-utils";
import { ButtonBuyNow, OfferTable, Price } from "./Components";
import History from "./Components/History";
import { Provider, useNftDetailContext } from "./context";
import BestOffer from "./Components/BestOffer";
import DefaultNftImage from "assets/images/product/default-nft-image.png";
import ModalWaitingTransaction from "components/Modal/ModalWaitingTransaction";
import ModalSuccess from "components/Modal/ModalSuccess";
import cx from "classnames";
import { TOP_RANK } from "constants";

NftDetail.propTypes = {};

function NftDetail(props) {
  const [gas, setGas] = useState(0);
  const {
    nftDetail,
    moreNfts,
    dataOnchain,
    refreshState,
    handleLikeNft,
    loading,
    refreshNftDetail,
    tab,
    onSelectTab,
    id,
    refetchNftDetail,
    showWaiting,
    onHideWaiting,
    showSuccess,
    onHideModalSuccess,
    collectionDetail,
  } = useNftDetailContext();
  const { showOfferText, onShowMakeOffer } = useNftDetailContext();
  const { showAddToCard } = useNftDetailContext();
  const [isLikeState, setIsLikeState] = useState(nftDetail?.isLike);
  const [numberLikeState, setNumberLikeState] = useState(
    Number(nftDetail?.numberLike || 0)
  );
  const { toggleItem, checkExist } = useApplication();
  const [topRank, setTopRank] = useState(0);

  useEffect(() => {
    const refreshOwner = async () => {
      await refreshOwnerApi(nftDetail?.nftId);
    };
    if (
      nftDetail &&
      Object.keys(dataOnchain).length &&
      nftDetail?.ownerAddress !== dataOnchain.owner
    ) {
      refreshOwner();
    }
  }, [nftDetail, dataOnchain]);

  useEffect(() => {
    setIsLikeState(nftDetail?.isLike);
    setNumberLikeState(Number(nftDetail?.numberLike));
  }, [nftDetail?.numberLike, nftDetail?.isLike]);

  const onAddToCard = () => {
    toggleItem(nftDetail);
  };
  const isAddedToCard = checkExist(nftDetail?.id);
  const hasData = dataOnchain && Object.keys(dataOnchain).length > 0;
  const toCollection = !nftDetail?.collectionAddress
    ? "/"
    : `/collection/${nftDetail?.collectionAddress}`;

  const onLikeNftDetail = async () => {
    const res = await handleLikeNft(nftDetail?.nftId);
    if (res) {
      if (isLikeState) setNumberLikeState(numberLikeState - 1);
      else setNumberLikeState(numberLikeState + 1);
      setIsLikeState(res);
    }
  };

  const calculateTopRank = () => {
    if (nftDetail?.ranking <= parseInt(nftDetail?.totalItems / 100))
      return TOP_RANK.TOP_1;
    if (nftDetail?.ranking <= parseInt(nftDetail?.totalItems / 10))
      return TOP_RANK.TOP_10;
    if (nftDetail?.ranking <= parseInt(nftDetail?.totalItems / 4))
      return TOP_RANK.TOP_25;
    return 0;
  };

  const mappedProperties = nftDetail?.properties?.map((property) => {
    const { values } =
      collectionDetail?.filterProperties?.find(
        (item) => item?.key === property?.key
      ) || {};
    const { count, rarityScore } =
      values?.find((item) => item?.name === property?.value) || {};
    return {
      key: property?.key,
      value: property?.value,
      count,
      rarityScore,
    };
  });
  return (
    <>
      <Meta title={nftDetail?.title} src={nftDetail?.imageUrl} />
      <div>
        <section className="tf-item-detail">
          <div className="tf-container">
            <div className="row row_itemDetail">
              <div className="col-md-12">
                <div className="tf-item-detail-inner flex flex-col lg:flex-row">
                  <div className="left !mr-0 sm:!mr-[64px] !w-full sm:w-[unset]">
                  <div className="block lg:hidden">
                      <div className="content-top flex justify-between items-center mt-[2rem] lg:mt-0 ju">
                        <div className="flex items-center">
                          <Image
                            className="w-12 rounded-full"
                            src={nftDetail?.collectionImage || avt1}
                            alt="Tocen - NFT Marketplace"
                          />
                          <h6 className="title ml-2">{nftDetail?.collectionName}</h6>
                        </div>
                        <Link
                          to={toCollection}
                          className="text-base text-[#9998AC] hover:text-accent flex items-center font-semibold"
                        >
                          <div className="pr-1.5">View Collection</div>{" "}
                          <IconExternal />
                        </Link>
                      </div>
                      <h2 className="title-detail text-[48px] font-semibold">
                        {nftDetail?.title}
                      </h2>
                      <div className="except">
                        <ReadMore content={nftDetail?.description} />
                      </div>
                      <div className="mb-8 mt-2 flex">
                        <Button
                          className="btn-secondary w-full mr-4"
                          onClick={onLikeNftDetail}
                        >
                          {isLikeState ? (
                            <IconHeart fill="#989BAC" className="mr-2" />
                          ) : (
                            <IconHeart className="mr-2" />
                          )}
                          <span>
                            {numberLikeState < 0 ? 0 : numberLikeState}
                          </span>
                        </Button>
                        <Button
                          className="btn-secondary w-full mr-4"
                          loading={loading}
                          onClick={refetchNftDetail}
                        >
                          <IconRefresh className="mr-2" />
                          <span>Refresh</span>
                        </Button>
                      </div>
                    </div>
                    <div className="image relative">
                      <Image
                        src={nftDetail?.imageUrl || DefaultNftImage}
                        alt="Tocen - NFT Marketplace"
                      />
                      {nftDetail?.ranking ? (
                        <div
                          className={cx(
                            "absolute bottom-2 right-2 rounded-[32px]  bg-opacity-20 backdrop-blur-[10px] text-sm font-semibold h-8 w-[70px] flex items-center justify-center",
                            {
                              "bg-white text-white": calculateTopRank() === 0,
                              "bg-[#FE3B3B] text-[#FF6666]":
                                calculateTopRank() === TOP_RANK.TOP_1,
                              "bg-[#FF8801] text-[#FF8801]":
                                calculateTopRank() === TOP_RANK.TOP_10,
                              "bg-[#09FFF0] text-[#29FFF2]":
                                calculateTopRank() === TOP_RANK.TOP_25,
                            }
                          )}
                        >
                          <span>#{nftDetail?.ranking}</span>
                        </div>
                      ) : null}
                    </div>

                    <Tabs
                      className="tf-tab mb-0 mt-7"
                      value={tab}
                      onSelect={onSelectTab}
                    >
                      <TabList className="menu-tab">
                        <Tab className="tab-title !px-[1rem] md:!px-[3.5rem]">
                          <span className="cursor-pointer font-semibold">
                            Properties
                          </span>
                        </Tab>
                        {/* <Tab className="tab-title !px-[1rem] md:!px-[3.5rem]">
                        <span className="cursor-pointer font-semibold">
                          Bids
                        </span>
                      </Tab> */}
                        <Tab className="tab-title !px-[1rem] md:!px-[3.5rem]">
                          <span className="cursor-pointer font-semibold">
                            History
                          </span>
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <div className="tab-details max-h-[400px] overflow-hidden overflow-y-auto py-[2rem] pr-[1rem] !gap-[1.5rem]">
                          {mappedProperties?.map((property, index) => (
                            <div className="tab-details_item" key={index}>
                              <div className="tab-details_item--top">
                                {property?.key}
                              </div>
                              <div className="tab-details_item--body">
                                {property?.value}
                              </div>
                              <div className="text-xs font-medium mt-1">
                                <span>{property?.count} </span>
                                <span>({property.rarityScore}%)</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel className={""}>
                        <History />
                      </TabPanel>
                    </Tabs>
                  </div>
                  <div className="content">
                    <div className="hidden lg:block">
                      <div className="content-top flex items-center mt-[2rem] lg:mt-0">
                        <div className="author">
                          <Image
                            className="w-12"
                            src={nftDetail?.collectionImage || avt1}
                            alt="Tocen - NFT Marketplace"
                          />
                          <h6 className="title">{nftDetail?.collectionName}</h6>
                        </div>
                        <Link
                          to={toCollection}
                          className="text-base text-[#9998AC] hover:text-accent flex items-center mt-2 font-semibold"
                        >
                          <div className="pr-1.5">View Collection</div>{" "}
                          <IconExternal />
                        </Link>
                      </div>
                      <h2 className="title-detail text-[48px] font-semibold">
                        {nftDetail?.title}
                      </h2>
                      <div className="except">
                        <ReadMore content={nftDetail?.description} />
                      </div>
                      <div className="mb-8 flex">
                        <Button
                          className="btn-secondary w-36 mr-4"
                          onClick={onLikeNftDetail}
                        >
                          {isLikeState ? (
                            <IconHeart fill="#989BAC" className="mr-2" />
                          ) : (
                            <IconHeart className="mr-2" />
                          )}
                          <span>
                            {numberLikeState < 0 ? 0 : numberLikeState}
                          </span>
                        </Button>
                        <Button
                          className="btn-secondary w-36 mr-4"
                          loading={loading}
                          onClick={refetchNftDetail}
                        >
                          <IconRefresh className="mr-2" />
                          <span>Refresh</span>
                        </Button>
                      </div>
                    </div>

                    <hr className="mb-8" />
                    {!(
                      dataOnchain.isListed && dataOnchain.owner == undefined
                    ) && (
                      <>
                        <div className="content-btom">
                          <div className="content_btom--top">
                            <div className="content_bottom--person">
                              <img src={avtd3} alt="err" />
                              <div className="person_text">
                                <p className="person_text--top">
                                  Current Owner
                                </p>
                                <Link to={`/profile/${dataOnchain?.owner}`}>
                                  <p className="person_text--bottom">
                                    {formatWallet(dataOnchain?.owner)}
                                  </p>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="content_btom--bottom">
                            <Price />
                            <div className="content_bottom-btn_container flex-col sm:flex-row md:flex-col lg:flex-row">
                              {showAddToCard && (
                                <button
                                  className="content_bottom-btn--addcard content_bottom-btn btn-secondary w-[100%] sm:w-[50%] md:w-full lg:w-[50%] !basis-[100%] sm:!basis-[50%]"
                                  onClick={onAddToCard}
                                >
                                  <IconCard />{" "}
                                  {!isAddedToCard
                                    ? `Add to cart`
                                    : `Remove from cart`}
                                </button>
                              )}
                              <ButtonBuyNow key={refreshState} />
                            </div>
                            {showOfferText && (
                              <div className="content_bottom-desc">
                                <p>
                                  You can also{" "}
                                  <span
                                    className="content_bottom-desc_special cursor-pointer"
                                    onClick={onShowMakeOffer}
                                  >
                                    make an offer
                                  </span>{" "}
                                  for this item.
                                </p>
                                <br />
                              </div>
                            )}
                            <BestOffer />
                          </div>
                        </div>
                        {hasData && <OfferTable />}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tf-explore-more">
          <div className="tf-container">
            <div className="tf-heading">
              <h4 className="heading text-4xl font-semibold">Explore More</h4>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 row_itemDetail gap-4">
              {moreNfts.length
                ? moreNfts.map((nft, index) => (
                    <ProductCard
                      key={nft.id}
                      {...nft}
                      handleLikeNft={handleLikeNft}
                    />
                  ))
                : null}
            </div>
          </div>
        </section>
        {/* <ModalMakeOffer show={showMakeOffer} onHide={onHideMakeOffer} nft={nftDetail} onMakeOffer={handleMakeOffer} /> */}
      </div>
      <ModalWaitingTransaction show={showWaiting} onHide={onHideWaiting} />
      <ModalSuccess show={showSuccess} onHide={onHideModalSuccess} />
    </>
  );
}

const NftDetailPage = (props) => (
  <Provider>
    <NftDetail {...props} />
  </Provider>
);

export default NftDetailPage;
