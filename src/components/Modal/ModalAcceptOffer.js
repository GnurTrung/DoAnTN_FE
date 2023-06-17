import Image from "components/ProgressiveImage";
import { useState } from "react";
import CartModal from "components/layouts/CardModal";
import { Button, Divider } from "antd";
import IconSpin from "assets/icons/IconSpin";
import { formatPrice } from "utils";
import { NumericFormat } from "react-number-format";

const ModalAcceptOffer = (props) => {
  const { data, onAccept } = props;
  const [processing, setProcessing] = useState(false);

  const handleAccept = () => {
    setProcessing(true);
    const { dataNFT = {}, price } = data;
    if (!dataNFT || !price) return;
    const { typeNFT } = dataNFT;
    if (!typeNFT) return;
    onAccept && onAccept(data);
  };

  return (
    <CartModal
      open={props.show}
      onCancel={props.onHide}
      destroyOnClose={true}
      title="Accept Offer"
      width={417}
      footer={
        <Button className="btn-primary w-full" onClick={handleAccept}>
          {!processing ? "Accept Offer" : <IconSpin />}
        </Button>
      }
    >
      <div className="w-full p-5">
        <div className="flex flex-col space-y-5">
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
                <span className="text-xs font-medium text-[#BABAC7]">
                  {props?.nft?.collectionName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#BABAC7] font-semibold leading-5">
              Offer
            </span>
            <span className="font-white font-medium leading-6 text-white">
              {formatPrice(data.price)} SUI
            </span>
          </div>
          <Divider className="bg-[#4E4D6E]" />
          <div className="flex flex-col space-y-1 text-[#BABAC7]">
            <span className="font-semibold">Fees</span>
            <div className="flex justify-between text-xs ">
              <span>
                Creator Royalties ({Number(props?.nft?.royaltyFee) || 5}%)
              </span>
              <span>
                {(formatPrice(data.price) *
                  (Number(props?.nft?.royaltyFee) || 5)) /
                  100}{" "}
                SUI
              </span>
            </div>
            <div className="flex justify-between text-xs ">
              <span>
                Platform <span className="text-accent">(1.5%)</span>
              </span>
              <NumericFormat
                value={formatPrice(data.price * 1.5) / 100}
                decimalScale={4}
                suffix=" SUI"
                displayType="text"
              />
            </div>
          </div>
        </div>
      </div>
    </CartModal>
  );
};

export default ModalAcceptOffer;
