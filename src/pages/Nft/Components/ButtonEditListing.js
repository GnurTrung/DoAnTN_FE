import { Button } from "antd";
import IconEdit from "assets/icons/IconEdit";
import { ModalListingNFT } from "components/Modal";
import { useShowModal } from "hooks";
import useNFTEditListing from "hooks/useNFTEditListing";
import { toast } from "react-hot-toast";
import { useNftDetailContext } from "../context";
import { useState } from "react";
import ModalWaitingTransaction from "components/Modal/ModalWaitingTransaction";
import ModalSuccess from "components/Modal/ModalSuccess";
import { useEffect } from "react";
import { useSocketContext } from "contexts/useSocketContext";
import { SOCKET_EVENTS } from "constants";
const ButtonEditListing = (props) => {
  const [gas, setGas] = useState(0);
  const { onEditListing } = useNFTEditListing();
  const {
    refreshNftDetail,
    dataOnchain,
    onShowWaiting,
    onShowSuccess,
    onHideWaiting,
  } = useNftDetailContext();
  const { showModal, onHide, onShow } = useShowModal();
  const { nft } = props;
  const { socketInstance } = useSocketContext();

  const handleEdit = async (price) => {
    try {
      if (!dataOnchain || !dataOnchain?.isListed) {
        toast.error("NFT is not listed!");
        return;
      }
      onHide();
      onShowWaiting();
      const itemID = nft?.nftId;
      const version = nft?.version;
      const response = await onEditListing(itemID, price, gas, version);
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

  useEffect(() => {
    const handleEventSuccess = (payload) => {
      if (payload?.parsedJson.object_id === nft.nftId) {
        onHideWaiting();
        onShowSuccess();
      }
    };
    socketInstance.socket.on(SOCKET_EVENTS.UPDATE_LISTING, handleEventSuccess);
    return () => {
      socketInstance.socket.off(
        SOCKET_EVENTS.UPDATE_LISTING,
        handleEventSuccess
      );
    };
  }, [nft?.nftId, socketInstance]);

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
      <Button className="btn-secondary w-[50%] text-white" onClick={onShow}>
        <IconEdit className="mr-2" /> <span> Edit listing</span>
      </Button>
    </>
  );
};

export default ButtonEditListing;
