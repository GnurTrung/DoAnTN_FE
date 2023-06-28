import { Button } from "antd";
import IconEdit from "assets/icons/IconEdit";
import { ModalListingNFT } from "components/Modal";
import ModalSuccess from "components/Modal/ModalSuccess";
import ModalWaitingTransaction from "components/Modal/ModalWaitingTransaction";
import { SOCKET_EVENTS } from "constants";
import { NFT_STATUS } from "constants/nft-action";
import { useSocketContext } from "contexts/useSocketContext";
import { useShowModal } from "hooks";
import useNFTEditListing from "hooks/useNFTEditListing";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
const ButtonEditListing = (props) => {
  const { onEditListing } = useNFTEditListing();
  const { showModal, onHide, onShow } = useShowModal();
  const { nft } = props;
  const [gas, setGas] = useState(0);
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

  const onHideModalSuccess = () => {
    onHideSuccess();
    window.location.reload();
  };

  useEffect(() => {
    const handleEventSuccess = (payload) => {
      if (payload?.parsedJson.object_id === nft.nftId) {
        onHideWaiting();
        onShowSuccess();
      }
    };
    if (socketInstance)
      socketInstance.socket.on(
        SOCKET_EVENTS.UPDATE_LISTING,
        handleEventSuccess
      );
    return () => {
      if (socketInstance)
        socketInstance.socket.off(
          SOCKET_EVENTS.UPDATE_LISTING,
          handleEventSuccess
        );
    };
  }, [nft.nftId, socketInstance]);

  const handleEdit = async (price) => {
    try {
      if (nft.nftStatus !== NFT_STATUS.LISTING) {
        toast.error("NFT is not listed!");
        return;
      }
      const itemID = nft?.nftId;
      onShowWaiting();
      onHide();
      const response = await onEditListing(itemID, price, gas);
      if (!response) {
        toast.error("Opps! There are some errors!");
        onHideWaiting();
      }
    } catch (ex) {
      console.log(ex);
      onHideWaiting();
    } finally {
      onHideWaiting();
      onShowSuccess();
    }
  };
  return (
    <>
      {nft && (
        <ModalListingNFT
          show={showModal}
          onHide={onHide}
          nft={nft}
          onListing={handleEdit}
          onChangeGas={(e) => setGas(e)}
        />
      )}
      <ModalWaitingTransaction show={showWaiting} onHide={onHideWaiting} />
      <ModalSuccess show={showSuccess} onHide={onHideModalSuccess} />
      <Button
        className="btn-secondary p-0 flex-1 text-white h-9 text-xs mr-2"
        onClick={onShow}
      >
        <IconEdit className="mr-2" /> <span> Edit Price</span>
      </Button>
    </>
  );
};

export default ButtonEditListing;
