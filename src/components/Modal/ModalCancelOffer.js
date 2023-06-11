import Image from "components/ProgressiveImage";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mystToSui } from "utils/wallet-utils";
import styles from "./Modal.module.css";
import CartModal from "components/layouts/CardModal";
import { Button } from "antd";
import IconSpin from "assets/icons/IconSpin";
import { formatPrice } from "utils";

const ModalCancelOffer = (props) => {
  const { onCancel, data } = props;
  const [processing, setProcessing] = useState(false);

  const handleCancel = () => {
    setProcessing(true);
    onCancel && onCancel(data);
  };

  return (
    <CartModal
      open={props.show}
      onCancel={props.onHide}
      destroyOnClose={true}
      title="Cancel Offer"
      width={417}
      footer={
        <div className="flex space-x-4">
          <Button className="btn-secondary flex-1" onClick={props.onHide}>
            Keep it
          </Button>
          <Button className="btn-primary flex-1" onClick={handleCancel}>
            {processing ? <IconSpin /> : "Cancel Offer"}
          </Button>
        </div>
      }
    >
      <div className="w-full p-5">
        <h4 className="text-base font-semibold text-[white] leading-6 mb-3">
          Are you sure you want to cancel your offer?
        </h4>
        <div className="flex flex-col items-start p-3 bg-[#1B2333] rounded-2xl w-full divide-x divide-[#4E4D6E]">
          <div className="flex justify-start items-center space-x-3">
            <Image
              src={props?.nft?.imageUrl}
              alt="Nft"
              className="w-10 h-10 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-[white] text-base leading-5">
                {props?.nft?.title}
              </span>
              <div className="text-xs font-medium text-[#BABAC7]">
                <span>Price </span>
                <span>{formatPrice(data.price)} SUI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CartModal>
  );
};

export default ModalCancelOffer;
