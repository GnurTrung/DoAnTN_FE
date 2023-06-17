import { Button, Divider } from "antd";
import IconSpin from "assets/icons/IconSpin";
import Image from "components/ProgressiveImage";
import CartModal from "components/layouts/CardModal";
import { useState } from "react";
import { formatPrice } from "utils";

const ModalProcessing = (props) => {
  const [processing, setProcessing] = useState(false);
  const { nft, onBuyNow } = props;

  const handleBuyNow = async () => {
    setProcessing(true);
    await onBuyNow(nft?.listingPrice);
    setProcessing(false);
  };

  return (
    <CartModal
      open={props.show}
      onCancel={props.onHide}
      title="Checkout"
      width={417}
      footer={
        <Button className="btn-primary w-full" onClick={handleBuyNow}>
          {processing ? <IconSpin /> : "Buy"}
        </Button>
      }
    >
      <div className="w-full p-5 space-y-5 border-b border-b-[#4E4D6E] border-solid">
        <div className="divide-x divide-[#4E4D6E]">
          <h4 className="text-base text-[#BABAC7] font-medium leading-6 mb-3">
            Item
          </h4>
          <div className="p-3 flex justify-between items-center bg-[#1B2333] rounded-2xl">
            <div className="flex items-center space-x-2">
              <Image
                src={nft?.imageUrl}
                alt="NFT"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-5 text-white">
                  {nft?.title}
                </span>
                <span className="text-sm font-medium leading-5 text-[#BABAC7]">
                  {nft?.collectionName}
                </span>
              </div>
            </div>
            <span className="text-[white] font-semibold leading-6 text-base">
              {formatPrice(nft?.listingPrice)} SUI
            </span>
          </div>
          <Divider className="my-5" />
          <div className="flex justify-between item">
            <span className="text-base leading-6 font-medium text-[#BABAC7]">
              Total Price
            </span>
            <span className="font-semibold text-lg leading-7 text-[white]">
              {formatPrice(nft?.listingPrice)} SUI
            </span>
          </div>
        </div>
      </div>
    </CartModal>
  );
};

export default ModalProcessing;
