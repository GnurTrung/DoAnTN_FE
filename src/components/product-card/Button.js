import { Button } from "antd";
import { ModalListingNFT, ModalProcessing } from "components/Modal";
import ModalCancelNFT from "components/Modal/ModalCancelNFT";
import ModalMakeOffer from "components/Modal/ModalMakeOffer";
import ModalSuccess from "components/Modal/ModalSuccess";
import ModalWaitingTransaction from "components/Modal/ModalWaitingTransaction";
import { SOCKET_EVENTS } from "constants";
import { NFT_ACTION, NFT_STATUS } from "constants/nft-action";
import { useApplication } from "contexts/useApplication";
import { useSocketContext } from "contexts/useSocketContext";
import { useWeb3 } from "contexts/useWeb3Context";
import {
  useNFTBuyAndTake,
  useNFTDelist,
  useNFTListing,
  useShowModal,
} from "hooks";
import useNFTMakeOffer from "hooks/useNFTMakeOffer";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { formatPrice } from "utils";

const ButtonAction = (props) => {
  const {
    nftStatus,
    ownerAddress,
    creatorAddress,
    imageUrl,
    title,
    nftId,
    offerPrice,
    collectionName,
    listingPrice: price,
    isOnWallet,
    floorPriceListing,
    collectionAddress,
    royaltyFee,
    timeListing,
  } = props;
  const { account } = useWeb3();
  const { onShowPopupWallet } = useApplication();
  const { socketInstance } = useSocketContext();
  const [action, setAction] = useState(NFT_ACTION.NONE);
  const {
    showModal: showMakeOffer,
    onHide: onHideMakeOffer,
    onShow: onShowMakeOffer,
  } = useShowModal();
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
  const {
    showModal: showBuyNow,
    onHide: onHideBuyNow,
    onShow: onShowBuyNow,
  } = useShowModal();
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
  const { onListing } = useNFTListing();
  const { onDelist } = useNFTDelist();
  const { onMakeOffer } = useNFTMakeOffer();
  const { onBuyAndTake } = useNFTBuyAndTake();

  const [gas, setGas] = useState(0);

  useEffect(() => {
    if (isOnWallet && ownerAddress == account) {
      // action = NFT_ACTION.LIST_FOR_SALE;
      setAction(NFT_ACTION.LIST_FOR_SALE);
      return;
    }
    if (!account || (!ownerAddress && !creatorAddress)) {
      if (nftStatus === NFT_STATUS.CANCEL) setAction(NFT_ACTION.MAKE_OFFER);
      else setAction(NFT_ACTION.BUY_NOW);
      return;
    }
    let action = NFT_ACTION.NONE;
    const isOwner = account === ownerAddress;

    switch (nftStatus) {
      case NFT_STATUS.CANCEL:
        action = isOwner ? NFT_ACTION.LIST_FOR_SALE : NFT_ACTION.MAKE_OFFER;
        break;
      case NFT_STATUS.LISTING:
        action = isOwner ? NFT_ACTION.CANCEl_LISTING : NFT_ACTION.BUY_NOW;
        break;
      default:
        action = NFT_ACTION.NONE;
    }

    setAction(action);
  }, [account, creatorAddress, nftStatus, ownerAddress, isOnWallet]);

  const onHideModalSuccess = () => {
    onHideSuccess();
    window.location.reload();
  };

  useEffect(() => {
    const handleEventSuccess = (payload) => {
      if (payload?.parsedJson?.object_id === nftId) {
        onHideWaiting();
        onShowSuccess();
      }
      // setTimeout(() => window.location.reload(), 500);
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
    if (socketInstance) socketInstance.socket.on(event, handleEventSuccess);
    return () => {
      if (socketInstance) socketInstance.socket.off(event, handleEventSuccess);
    };
  }, [action, nftId, socketInstance]);

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
        text = "List for Sale";
        break;
      case NFT_ACTION.MAKE_OFFER:
        text = "Make Offer";
        break;
      default:
        text = "Buy Now";
    }
    return text;
  };

  const onClick = (e) => {
    e.stopPropagation();
    if (!account) {
      onShowPopupWallet();
      return;
    }

    if (action === NFT_ACTION.MAKE_OFFER) {
      onShowMakeOffer();
      return;
    } else if (action === NFT_ACTION.LIST_FOR_SALE) {
      onShowListing();
      return;
    } else if (action === NFT_ACTION.CANCEl_LISTING) {
      onShowCancel();
      return;
    } else if (action === NFT_ACTION.BUY_NOW) {
      onShowBuyNow();
      return;
    }
  };

  const handleBuyNow = async (price) => {
    try {
      onShowWaiting();
      onHideBuyNow();
      const response = await onBuyAndTake(nftId, price, gas);
      if (!response) {
        // toast.error("Opps! There are some errors!");
        onHideWaiting();
      } else {
        onHideWaiting();
        onShowSuccess();
      }
    } catch (error) {
      console.log(error);
      onHideWaiting();
    }
  };

  const handleMakeOffer = async (price) => {
    try {
      onShowWaiting();
      onHideMakeOffer();
      const response = await onMakeOffer(nftId, price, gas);
      if (!response) {
        // toast.error("Opps! There are some errors!");
        onHideWaiting();
      } else {
        onHideWaiting();
        onShowSuccess();
      }
    } catch (ex) {
      console.log(ex);
      onHideWaiting();
    }
  };

  const handleListingNFT = async (price) => {
    try {
      onShowWaiting();
      onHideListing();
      const response = await onListing(nftId, price, gas);
      if (!response) {
        // toast.error("Opps! There are some errors!");
        onHideWaiting();
      } else {
        onHideWaiting();
        onShowSuccess();
      }
    } catch (error) {
      console.log(error);
      onHideWaiting();
    }
  };

  const handleCancelListingNFT = async () => {
    try {
      onShowWaiting();
      onHideCancel();
      const response = await onDelist(nftId, gas);
      if (!response) {
        // toast.error("Opps! There are some errors!");
        onHideWaiting();
      } else {
        onHideWaiting();
        onShowSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nftDetail = {
    imageUrl,
    title,
    listingPrice: price,
    offerPrice,
    collectionName,
    nftStatus,
    floorPriceListing: formatPrice(floorPriceListing),
    collectionAddress,
    royaltyFee,
    timeListing,
  };
  return (
    <>
      <ModalListingNFT
        show={showListing}
        onHide={onHideListing}
        nft={nftDetail}
        onListing={handleListingNFT}
        onChangeGas={(e) => setGas(e)}
      />
      <ModalMakeOffer
        show={showMakeOffer}
        onHide={onHideMakeOffer}
        nft={nftDetail}
        onMakeOffer={handleMakeOffer}
        onChangeGas={(e) => setGas(e)}
      />
      <ModalCancelNFT
        show={showCancel}
        onHide={onHideCancel}
        nft={nftDetail}
        onCancelListing={handleCancelListingNFT}
        onChangeGas={(e) => setGas(e)}
      />
      <ModalProcessing
        show={showBuyNow}
        onHide={onHideBuyNow}
        nft={nftDetail}
        onBuyNow={handleBuyNow}
        onChangeGas={(e) => setGas(e)}
      />
      <ModalWaitingTransaction show={showWaiting} onHide={onHideWaiting} />
      <ModalSuccess show={showSuccess} onHide={onHideModalSuccess} />
      <Button
        className="btn-secondary h-9 text-xs flex-1 p-0"
        onClick={onClick}
      >
        <span className="text-white">{setText()}</span>
      </Button>
    </>
  );
};

export default ButtonAction;
