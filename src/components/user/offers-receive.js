import { Button, Collapse } from "antd";
import IconExpand from "assets/icons/IconExpand";
import { useState } from "react";
import avtd6 from "../../assets/images/author/author-history-1.jpg";
import avtd7 from "../../assets/images/author/author-history-2.jpg";
import cx from "classnames";
import IconCalendar from "assets/icons/IconCalendar";
import IconClock from "assets/icons/IconClock";
import { useContexts } from "pages/User/context";
import { formatPrice } from "utils";
import Image from "components/ProgressiveImage";
import { formatAddress } from "@mysten/sui.js";
import moment from "moment";
import NoData from "components/NoData";
import Loading from "components/loading";
import { Link } from "react-router-dom";
const { Panel } = Collapse;
const OffersReceive = () => {
  const { offerReceived, loading, loadMore } = useContexts();

  const [tabHistory] = useState([
    {
      id: 1,
      name: "Mason Woodward",
      avt: avtd6,
    },
    {
      id: 2,
      name: "Violet Pascall ",
      avt: avtd7,
    },
    {
      id: 3,
      name: "Camilla Hudson ",
      avt: avtd6,
    },
    {
      id: 4,
      name: "Derick Reed ",
      avt: avtd7,
    },
    {
      id: 5,
      name: "Mason Woodward",
      avt: avtd6,
    },
  ]);

  const PanelHeader = ({
    price,
    nftImage,
    nftName,
    offerNumber,
    nftAddress,
  }) => {
    return (
      <div className="flex justify-between items-center">
        <Link to={`/nft/${nftAddress}`}>
          <div className="flex justify-start items-start group">
            <Image
              src={nftImage}
              alt="NFt"
              className="w-11 h-11 rounded-lg object-cover mr-3"
            />
            <div className="flex flex-col justify-between items-start">
              <span className="text-sm font-medium leading-5 text-[#BABAC7] group-hover:underline">
                {nftName}
              </span>
              <span className="text-sm leading-5 font-semibold text-white">
                {formatPrice(price)} SUI
              </span>
            </div>
          </div>
        </Link>

        <span className="text-sm leading-5 font-semibold text-white">
          {offerNumber} Offers
        </span>
      </div>
    );
  };

  return (
    <div className="pt-4">
      <Collapse
        ghost
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <IconExpand
            className={cx(
              { "rotate-180": !isActive },
              "transition-all duration-300"
            )}
          />
        )}
      >
        {offerReceived.data.length
          ? offerReceived.data?.map((offer, index) => (
              <Panel
                key={index}
                header={
                  <PanelHeader
                    price={offer.listingPrice}
                    nftName={offer.nftTitle}
                    nftImage={offer.nftImageUrl}
                    offerNumber={offer.offerList.length}
                    nftAddress={offer.nftAddress}
                  />
                }
                className="!rounded-2xl bg-[#1B2333] offer-receive-header mb-4"
              >
                {offer.offerList.map((offerDetail, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center pl-8 py-5 cursor-pointer hover:bg-[#1B2333] transition duration-100 ease-out"
                  >
                    <div className="flex flex-col ">
                      <span className="text-sm leading-5 font-semibold text-white mb-1">
                        {formatPrice(offerDetail.price)} SUI
                      </span>
                      <span className="text-sm leading-5 font-semibold text-white mb-1">
                        <span className="text-sm leading-5 font-semibold text-[#BABAC7]">
                          From
                        </span>{" "}
                        <Link
                          to={`/profile/${offerDetail.userAddress}`}
                          className="hover:underline hover:text-current"
                        >
                          {formatAddress(offerDetail.userAddress || "")}
                        </Link>
                      </span>
                      <div className="flex justify-start items-center">
                        <span className="flex justify-start items-center mr-8 text-xs font-medium text-[#BABAC7]">
                          <IconCalendar className="mr-1" />{" "}
                          {moment
                            .unix(offerDetail.blockTimestamp / 1000)
                            .fromNow()}
                        </span>
                        <span className="flex justify-start items-center text-xs font-medium text-[#BABAC7]">
                          <IconClock className="mr-1" /> Expires in 19 days
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Panel>
            ))
          : !loading && (
              <div className="mt-16">
                <NoData description="No offer" />
              </div>
            )}
        {loading && (
          <div className="my-32">
            <Loading />
          </div>
        )}
      </Collapse>
      {!!offerReceived.data.length && (
        <Button className="btn-secondary mt-8 m-auto" onClick={loadMore}>
          Load more
        </Button>
      )}
    </div>
  );
};
export default OffersReceive;
