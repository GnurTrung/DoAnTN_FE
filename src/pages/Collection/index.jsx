import IconDiscord from "assets/icons/IconDiscord";
import IconGlobal from "assets/icons/IconGlobal";
import IconTwitter from "assets/icons/IconTwitter";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import { formatAddress } from "@mysten/sui.js";
import { Button, Switch } from "antd";
import IconVerified from "assets/icons/IconVerified";
import DefaultBanner from "assets/images/collection/default-banner.png";
import DefaultImage from "assets/images/collection/default-image.png";
import Meta from "components/Meta";
import ReadMore from "components/ReadMore";
import { VERIFIED_TYPE } from "constants";
import CountUp from "react-countup";
import { mystToSui } from "utils/wallet-utils";
import Analysis from "./Components/Analysis";
import Items from "./Components/Items";
import { Provider, useCollectionDetailContext } from "./context";
import { useShowModal } from "hooks";
import { useWeb3 } from "contexts/useWeb3Context";
import { useApplication } from "contexts/useApplication";
import ModalWaitingTransaction from "components/Modal/ModalWaitingTransaction";

Collection.propTypes = {};

function Collection(props) {
  const { collectionDetail, onSelectTab, handleAddToWatchlist } =
    useCollectionDetailContext();

  const { showModal: showModalWating, toggleModal: toggleModalWaiting } =
    useShowModal();

  const { onShowPopupWallet } = useApplication();
  const { isAuthenticated } = useWeb3();


  const stats = [
    {
      title: "Items",
      value: (
        <CountUp
          start={0}
          end={collectionDetail?.total_items || 0}
          duration={1}
          separator=","
        />
      ),
    },
    {
      title: "Owners",
      value: (
        <CountUp
          start={0}
          end={collectionDetail?.owners || 0}
          duration={1}
          separator=","
        />
      ),
    },
    {
      title: "Listings",
      value: (
        <CountUp
          start={0}
          end={collectionDetail?.listings || 0}
          duration={1}
          separator=","
        />
      ),
    },
    {
      title: "Total Volume",
      value: (
        <CountUp
          start={0}
          end={mystToSui(collectionDetail?.totalVolume || 0)}
          duration={1}
          separator=","
          suffix={" SUI"}
        />
      ),
    },
    {
      title: "Floor Price",
      value: collectionDetail?.floorPriceListing ? (
        <CountUp
          decimals={2}
          start={0}
          end={mystToSui(collectionDetail?.floorPriceListing || 0)}
          duration={1}
          separator=","
          suffix={" SUI"}
        />
      ) : (
        "--"
      ),
    },
  ];

  return (
    <>
      <Meta
        title={collectionDetail?.name}
        src={collectionDetail?.bannerImage}
      />
      <div className="page-collection">
        <section>
          <div className="container-fluid">
            <div className="w-full flex items-center justify-center">
              <img
                src={collectionDetail?.bannerImage || DefaultBanner}
                alt="images"
                className="w-full max-h-[350px] h-auto object-cover"
              />
            </div>
          </div>
        </section>
        <section className="tf-container">
          <div className="general-info flex-col items-start lg:flex-row">
            <div className="left-info !top-[1rem] ssm:!top-[-23px] sm:!top-[-48px]">
              <div className="collection-info">
                <img
                  src={collectionDetail?.logo || DefaultImage}
                  className="avatar avatar-border !w-[130px] !h-[130px] sm:!w-[162px] sm:!h-[162px]"
                  alt="avatar"
                />
                <div className="social">
                  <p className="text-[#BABAC7]">
                    {formatAddress(collectionDetail?.address || "")}
                  </p>
                  <h3 className="flex items-center">
                    {collectionDetail?.name}{" "}
                    {collectionDetail?.verifyType === VERIFIED_TYPE.VERIFIED ? (
                      <IconVerified width={24} height={24} className="ml-2" />
                    ) : null}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <a
                      href={collectionDetail?.twitterUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconTwitter className="cursor-pointer" />
                    </a>
                    <a
                      href={collectionDetail?.discordUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconDiscord className="cursor-pointer" />
                    </a>
                    <IconGlobal className="cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="desc text-[14px]">
                <ReadMore content={collectionDetail?.description} />
              </div>
            </div>
            <div className="flex flex-col items-start lg:items-end justify-center pt-9 ssm:pt-0 lg:pt-9">
              <div className="flex items-center mb-5 space-x-5">
                <Button
                  className="btn-primary text-sm w-44"
                  // onClick={onClickMakeCollectionOffer}
                >
                  Make collection offer
                </Button>
                <div>
                  <Switch
                    checked={collectionDetail?.isLike}
                    className="mr-[10px]"
                    onChange={handleAddToWatchlist}
                  />
                  <span className="text-[white] text-sm font-semibold leading-5">
                    Watching
                  </span>
                </div>
              </div>
              <div className="right-info !flex flex-wrap !justify-start mb-[3rem] lg:mb-0 gap-[1rem]">
                {stats.map((stat, index) => (
                  <div key={index} className="stat">
                    <p className="m-auto text-[#BABAC7] text-sm font-medium leading-5">
                      {stat.title}
                    </p>
                    <h4 className="text-white text-[18px] font-semibold truncate leading-9">
                      {stat.value}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="tf-explore-sidebar">
          <div className="tf-container">
            <Tabs className="tf-tab" onSelect={onSelectTab}>
              <TabList className="menu-tab ">
                <Tab
                  className="!px-[1rem] sm:!px-[2rem] lg:!px-[3.5rem] tab-title"
                  true
                >
                  <Link to="#">Items</Link>
                </Tab>
                <Tab className="!px-[1rem] sm:!px-[2rem] lg:!px-[3.5rem] tab-title ">
                  <Link to="#">Analysis</Link>
                </Tab>
              </TabList>
              <TabPanel>
                <Items />
              </TabPanel>
              <TabPanel>
                <Analysis />
              </TabPanel>
            </Tabs>
          </div>
          <ModalWaitingTransaction
            show={showModalWating}
            onHide={() => toggleModalWaiting(false)}
          />
        </section>
      </div>
    </>
  );
}

const CollectionPage = (props) => (
  <Provider>
    <Collection {...props} />
  </Provider>
);

export default CollectionPage;
