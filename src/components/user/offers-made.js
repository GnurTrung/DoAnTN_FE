import { Button } from "antd";
import IconCalendar from "assets/icons/IconCalendar";
import IconClock from "assets/icons/IconClock";
import Loading from "components/loading";
import { SUI_OFFSET } from "configs";
import moment from "moment";
import { useContexts } from "pages/User/context";
import ErrorImage from "assets/images/product/error-small-nft.png";
import React, { useCallback, useEffect, useState } from "react";
import NoData from "components/NoData";
import Image from "components/ProgressiveImage";
import { Link } from "react-router-dom";
import { useShowModal } from "hooks";
import { ModalCancelOffer } from "components/Modal";
import useNFTCancelOffer from "hooks/useNFTCancelOffer";
import { toast } from "react-hot-toast";
import ModalWaitingTransaction from "components/Modal/ModalWaitingTransaction";
import ModalSuccess from "components/Modal/ModalSuccess";
import { useSocketContext } from "contexts/useSocketContext";
import { SOCKET_EVENTS } from "constants";

const OffersMade = () => {
  const {
    showModal: showCancelOffer,
    onHide: onHideCancelOffer,
    onShow: onShowCancelOffer,
    dataModal: dataCancelOffer,
  } = useShowModal();
  const { offerMade, loading, loadMore } = useContexts();
  const [gas, setGas] = useState(0);
  const [nftCancel, setNFTCancel] = useState({});
  const { onCancelOffer } = useNFTCancelOffer();
  const {
    showModal: showWaiting,
    onHide: onHideWaiting,
    onShow: onShowWaiting,
  } = useShowModal();
  const {
    showModal: showSuccess,
    onHide: onHideSuccess,
    onShow: onShowSuccess,
  } = useShowModal();

  const { socketInstance } = useSocketContext();

  useEffect(() => {
    const handleEventSuccess = (payload) => {
      onHideWaiting();
      onShowSuccess();
    };
    if (socketInstance)
      socketInstance.socket.on(SOCKET_EVENTS.CANCEL_OFFER, handleEventSuccess);

    return () => {
      if (socketInstance)
        socketInstance.socket.off(
          SOCKET_EVENTS.CANCEL_OFFER,
          handleEventSuccess
        );
    };
  }, [onHideWaiting, onShowSuccess, socketInstance]);

  const Offer = (props) => {
    const { image, name, price, timestamp, expire, nftAddress } = props;
    return (
      <div className="bg-[#1F1D43] rounded-2xl p-5 flex items-center justify-between mb-4">
        <Link to={`/nft/${nftAddress}`}>
          <div className="flex justify-start items-center group cursor-pointer">
            <Image
              src={image}
              alt="NFt"
              className="w-[66px] h-[66px] rounded-lg object-cover mr-3"
            />
            <div className="flex flex-col items-start justify-between h-[66px]">
              <span className="text-sm font-medium leading-5 text-[#BABAC7] group-hover:underline">
                {name}
              </span>
              <span className="text-sm font-semibold text-white leading-5">
                {parseInt(price) / SUI_OFFSET} SUI
              </span>
              <div className="flex justify-start items-center text-xs text-[#BABAC7] font-medium">
                <div className="flex items-center mr-8">
                  <IconCalendar className="mr-1" />
                  <span>{moment.unix(timestamp / 1000).fromNow()}</span>
                </div>
                {/* <div className="flex items-center">
                <IconClock className="mr-1" />
                <span>Expire in {moment.unix(expire / 1000).toNow()}</span>
              </div> */}
              </div>
            </div>
          </div>
        </Link>

        <div>
          <Button
            className="btn-secondary"
            onClick={() => handleShowCancelOffer(props)}
          >
            Cancel Offer
          </Button>
        </div>
      </div>
    );
  };

  const onHideModalSuccess = () => {
    onHideSuccess();
    window.location.reload();
  };

  const handleShowCancelOffer = (props) => {
    setNFTCancel({
      imageUrl: props?.image,
      title: props?.name,
      nftId: props?.nftAddress,
    });
    onShowCancelOffer(props);
  };

  const handleCancelOffer = async (data) => {
    try {
      onShowWaiting();
      onHideCancelOffer();
      const { price } = data;
      const itemID = nftCancel?.nftId;
      const response = await onCancelOffer({ price, itemID, gas });
      if (!response) {
        toast.error("Opps! There are some errors!");
        onHideWaiting();
      }
    } catch (ex) {
      console.log(ex);
      onHideWaiting();
    } finally {
      onHideWaiting();
      onHideCancelOffer();
    }
  };

  const renderOffer = useCallback(() => {
    try {
      if (!offerMade || !offerMade.data || !offerMade.data.length) return <></>;
      let ui = offerMade.data.map((offer, index) => (
        <Offer
          key={index}
          image={offer.nftImageUrl || ErrorImage}
          name={offer.nftTitle}
          price={offer.price}
          timestamp={offer.blockTimestamp}
          expire={offer.expireTime}
          nftAddress={offer?.nftAddress}
        />
      ));
      return ui;
    } catch (ex) {}
    return <></>;
  }, [offerMade]);

  return (
    <>
      {showCancelOffer && (
        <ModalCancelOffer
          show={true}
          nft={nftCancel}
          onHide={onHideCancelOffer}
          data={dataCancelOffer}
          onCancel={handleCancelOffer}
          onChangeGas={(e) => setGas(e)}
        />
      )}
      <ModalWaitingTransaction show={showWaiting} onHide={onHideWaiting} />
      <ModalSuccess show={showSuccess} onHide={onHideModalSuccess} />
      <div className="flex flex-col justify-start items-center pt-4">
        <div className="w-full">
          {offerMade.data.length
            ? renderOffer()
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
        </div>
        {!!offerMade.data.length && (
          <Button className="btn-secondary mt-8" onClick={loadMore}>
            Load more
          </Button>
        )}
      </div>
    </>
  );
};
export default OffersMade;
