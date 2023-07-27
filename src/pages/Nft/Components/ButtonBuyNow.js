import { Button } from "antd";
import {
  ModalAcceptOffer,
  ModalCancelOffer,
  ModalListingNFT,
  ModalProcessing,
} from "components/Modal";
import ModalCancelNFT from "components/Modal/ModalCancelNFT";
import ModalMakeOffer from "components/Modal/ModalMakeOffer";
import { NFT_ACTION } from "constants/nft-action";
import { useApplication } from "contexts/useApplication";
import { useWeb3 } from "contexts/useWeb3Context";
import {
  useNFTAcceptOffer,
  useNFTBuyAndTake,
  useNFTDelist,
  useNFTListing,
  useShowModal,
} from "hooks";
import useNFTCancelOffer from "hooks/useNFTCancelOffer";
import useNFTMakeOffer from "hooks/useNFTMakeOffer";
import { memo, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNftDetailContext } from "../context";
import ButtonEditListing from "./ButtonEditListing";
import ModalWaitingTransaction from "components/Modal/ModalWaitingTransaction";
import ModalSuccess from "components/Modal/ModalSuccess";
import { useSocketContext } from "contexts/useSocketContext";
import { SOCKET_EVENTS } from "constants";

const ButtonBuyNow = () => {
  const [action, setAction] = useState(NFT_ACTION.NONE);
  const { account } = useWeb3();
  const { onShowPopupWallet } = useApplication();
  const { onBuyAndTake } = useNFTBuyAndTake();
  const { onListing } = useNFTListing();
  const { onDelist } = useNFTDelist();
  const { onMakeOffer } = useNFTMakeOffer();
  const { onAcceptOffer } = useNFTAcceptOffer();
  const { onCancelOffer } = useNFTCancelOffer();

  const { refreshNftDetail, showAddToCard, setShowAddToCard } =
    useNftDetailContext();
  const {
    dataOnchain = {},
    nftDetail,
    onShowProcessing,
    onHideProcessing,
    showProcessing,
    onHideWaiting,
    onShowWaiting,
    onShowSuccess,
  } = useNftDetailContext();
  const {
    showModal: showListing,
    onHide: onHideListing,
    onShow: onShowListing,
  } = useShowModal();
  const {
    showModal: showCancel,
    onHide: onHideCancel,
    onShow: onShowCancel,
  } = useShowModal();
  const { showMakeOffer, onHideMakeOffer, onShowMakeOffer, setShowOfferText } =
    useNftDetailContext();
  const { showCancelOffer, onHideCancelOffer, dataCancelOffer } =
    useNftDetailContext();
  const { showAcceptOffer, onCancelAcceptOffer, dataAcceptOffer } =
    useNftDetailContext();
  const { socketInstance } = useSocketContext();

  const [gas, setGas] = useState(0);
  useEffect(() => {
    const { isListed = false, owner } = dataOnchain;
    if (!account) {
      if (isListed) setAction(NFT_ACTION.BUY_NOW);
      else setAction(NFT_ACTION.MAKE_OFFER);
      return;
    }
    if (!dataOnchain) {
      setAction(NFT_ACTION.NONE);
      return;
    }
    const keys = Object.keys(dataOnchain);
    if (keys.length === 0) {
      setAction(NFT_ACTION.NONE);
      return;
    }
    let action = NFT_ACTION.NONE;
    if (isListed) {
      action =
        owner === account ? NFT_ACTION.CANCEl_LISTING : NFT_ACTION.BUY_NOW;
    } else {
      action =
        owner === account ? NFT_ACTION.LIST_FOR_SALE : NFT_ACTION.MAKE_OFFER;
    }
    setAction(action);
  }, [dataOnchain, account]);

  useEffect(() => {
    const isShow = action == NFT_ACTION.BUY_NOW;
    setShowOfferText(isShow);
    setShowAddToCard(isShow);
  }, [action]);

  useEffect(() => {
    const handleEventSuccess = (payload) => {
      if (payload?.parsedJson?.object_id === nftDetail?.nftId) {
        onHideWaiting();
        onShowSuccess();
      }
    };
    let event;
    switch (action) {
      case NFT_ACTION.BUY_NOW:
        event = SOCKET_EVENTS.BUY;
        break;
      case NFT_ACTION.CANCEl_LISTING:
        event = SOCKET_EVENTS.DELIST;
        break;
      case NFT_ACTION.MAKE_OFFER:
        event = SOCKET_EVENTS.OFFER;
        break;
      case NFT_ACTION.LIST_FOR_SALE:
        event = SOCKET_EVENTS.LISTING;
        break;
      default:
        break;
    }
    if (socketInstance) {
      socketInstance.socket.on(event, handleEventSuccess);
      socketInstance.socket.on(SOCKET_EVENTS.CANCEL_OFFER, handleEventSuccess);
      socketInstance.socket.on(SOCKET_EVENTS.ACCEPT_OFFER, handleEventSuccess);
    }
    return () => {
      if (socketInstance) {
        socketInstance.socket.off(event, handleEventSuccess);
        socketInstance.socket.off(
          SOCKET_EVENTS.CANCEL_OFFER,
          handleEventSuccess
        );
        socketInstance.socket.off(
          SOCKET_EVENTS.ACCEPT_OFFER,
          handleEventSuccess
        );
      }
    };
  }, [action, nftDetail?.nftId, socketInstance]);

  const setText = () => {
    let text = "Buy Now";
    switch (action) {
      case NFT_ACTION.CANCEl_LISTING:
        text = "Cancel Listing";
        break;
      case NFT_ACTION.BUY_NOW:
        text = "Buy Now";
        break;
      case NFT_ACTION.LIST_FOR_SALE:
        text = "Listing for Sale";
        break;
      case NFT_ACTION.MAKE_OFFER:
        text = "Make Offer";
        break;
      default:
        text = "Buy Now";
    }
    return text;
  };

  const handleListingNFT = async (price) => {
    onShowWaiting();
    onHideListing();
    const itemID = nftDetail?.nftId;
    const response = await onListing(itemID, price);
    if (!response) {
      onHideWaiting();
      toast.error("Opps! There are some errors!");
    } else {
      onHideWaiting();
      onShowSuccess();
    }
  };

  const handleMakeOffer = async (price) => {
    onShowWaiting();
    onHideMakeOffer();
    const itemID = nftDetail?.nftId;
    const response = await onMakeOffer(itemID, price);
    if (!response) {
      onHideWaiting();
      // toast.error("Opps! There are some errors!");
    } else {
      onHideWaiting();
      onShowSuccess();
    }
  };

  const handleCancelOffer = async (data) => {
    try {
      onHideCancelOffer();
      onShowWaiting();
      const { price } = data;
      const itemID = nftDetail?.nftId;
      const version = nftDetail?.version;
      const response = await onCancelOffer({ price, itemID });
      if (!response) {
        // toast.error("Opps! There are some errors!");
        onHideWaiting();
      } else onShowSuccess();
    } catch (ex) {
      console.log(ex);
      onHideWaiting();
    }
  };

  const handleAcceptOffer = async (data) => {
    try {
      onCancelAcceptOffer();
      onShowWaiting();
      const version = nftDetail?.version;
      const {
        userAddress: offerAddress,
        price,
        dataNFT: { isListed, typeNFT },
      } = data;
      const itemID = nftDetail?.nftId;
      const response = await onAcceptOffer({
        offerAddress,
        price,
        isListed,
        typeNFT,
        itemID,
        gas,
        version,
      });
      if (!response) {
        // toast.error("Opps! There are some errors!");
        onHideWaiting();
      } else refreshNftDetail();
    } catch (ex) {
      console.log(ex);
      onHideWaiting();
    }
  };

  const handleCancelListingNFT = async () => {
    onHideCancel();
    onShowWaiting();
    const itemID = nftDetail?.nftId;
    const response = await onDelist(itemID);
    if (!response) {
      // toast.error("Opps! There are some errors!");
      onHideWaiting();
    } else {
      onHideWaiting();
      onShowSuccess();
    }
  };

  const onBuy = async () => {
    try {
      if (!account) {
        onShowPopupWallet();
        return;
      }
      const itemID = nftDetail?.nftId;
      const price = nftDetail?.price || dataOnchain?.price;
      if (!itemID) return;
      if (action === NFT_ACTION.BUY_NOW) {
        if (!price || price <= 0) return;
        onShowProcessing();
      } else if (action === NFT_ACTION.CANCEl_LISTING) {
        onShowCancel();
        return;
      } else if (action === NFT_ACTION.LIST_FOR_SALE) {
        onShowListing();
        return;
      } else if (action === NFT_ACTION.MAKE_OFFER) {
        onShowMakeOffer();
        return;
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      onHideWaiting();
    }
  };

  const onBuyNow = async (price, gas) => {
    try {
      onHideProcessing();
      onShowWaiting();
      const itemID = nftDetail?.nftId;
      const response = await onBuyAndTake(itemID, price);
      if (!response) {
        // toast.error("Opps! There are some errors!");
        onHideWaiting();
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      onHideWaiting();
    }
  };

  const hasData = dataOnchain && Object.keys(dataOnchain).length > 0;
  return (
    <>
      {showProcessing && (
        <ModalProcessing
          show={true}
          onHide={onHideProcessing}
          nft={nftDetail}
          price={dataOnchain?.price}
          onChangeGas={(e) => setGas(e)}
          onBuyNow={onBuyNow}
        />
      )}
      {showListing && (
        <ModalListingNFT
          show={true}
          onHide={onHideListing}
          nft={nftDetail}
          onListing={handleListingNFT}
          onChangeGas={(e) => setGas(e)}
        />
      )}
      {showCancel && (
        <ModalCancelNFT
          show={true}
          onHide={onHideCancel}
          nft={nftDetail}
          onCancelListing={handleCancelListingNFT}
          onChangeGas={(e) => setGas(e)}
        />
      )}
      {showMakeOffer && (
        <ModalMakeOffer
          show={true}
          onHide={onHideMakeOffer}
          nft={nftDetail}
          onMakeOffer={handleMakeOffer}
          onChangeGas={(e) => setGas(e)}
        />
      )}
      {showCancelOffer && (
        <ModalCancelOffer
          show={true}
          nft={nftDetail}
          onHide={onHideCancelOffer}
          data={dataCancelOffer}
          onCancel={handleCancelOffer}
          onChangeGas={(e) => setGas(e)}
        />
      )}
      {showAcceptOffer && (
        <ModalAcceptOffer
          show={true}
          nft={nftDetail}
          onHide={onCancelAcceptOffer}
          data={dataAcceptOffer}
          onAccept={handleAcceptOffer}
          onChangeGas={(e) => setGas(e)}
        />
      )}
      {action === NFT_ACTION.CANCEl_LISTING && (
        <ButtonEditListing nft={nftDetail} />
      )}
      <Button
        className="btn-primary w-[100%] sm:w-[50%] md:w-full lg:w-[50%] !basis-[100%] sm:!basis-[50%] py-[0.8rem]"
        onClick={() => hasData && onBuy()}
      >
        {hasData && setText()}
        {!hasData && (
          <svg
            className="animate-spin text-white h-5 w-5 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </Button>
    </>
  );
};

export default memo(ButtonBuyNow);
