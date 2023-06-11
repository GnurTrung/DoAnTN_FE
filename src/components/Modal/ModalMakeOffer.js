import { Button, Divider } from "antd";
import IconSpin from "assets/icons/IconSpin";
import CustomSelect from "components/input/Select";
import TextInput from "components/input/TextInput";
import CartModal from "components/layouts/CardModal";
import Image from "components/ProgressiveImage";
import { OFFER_OPTIONS } from "constants";
import { useWeb3 } from "contexts/useWeb3Context";
import { useEffect, useState } from "react";
import { formatPrice, removeDotAcceptFirst } from "utils";
import { NumericFormat } from "react-number-format";

const ModalMakeOffer = (props) => {
  const { onMakeOffer, onChangeGas } = props;
  const [price, setPrice] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { balance } = useWeb3();
  const [period, setPeriod] = useState(OFFER_OPTIONS[0].value);
  //const [gas, setGas] = useState(0)

  const onInputChange = (e) => {
    if (!e.target.validity.valid) setPrice((v) => v);
    else {
      let value = e.target.value;
      value = removeDotAcceptFirst(value);
      setPrice(value);
    }
  };

  useEffect(() => {
    setIsValid(!(!price || price <= 0));
  }, [price]);

  const handleListing = async (e) => {
    e.stopPropagation();
    if (!isValid || processing) return;
    setProcessing(true);
    await onMakeOffer(price);
    setProcessing(false);
  };
  return (
    <CartModal
      open={props.show}
      onCancel={props.onHide}
      width={417}
      title="Make an offer"
      destroyOnClose={true}
      footer={
        <Button
          className="btn-primary w-full"
          onClick={handleListing}
          disabled={!isValid}
        >
          {!processing ? "Make Offer" : <IconSpin />}
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
            <Divider className="my-3" />
            <div className="text-[#BABAC7] text-xs font-medium flex flex-col w-full space-y-2">
              {!!Number(props?.nft?.listingPrice) && (
                <div className="flex justify-between w-full">
                  <span>Price: </span>
                  <span>{formatPrice(props?.listingPrice)} SUI</span>
                </div>
              )}
              <div className="flex justify-between w-full">
                <span>Best offer:</span>
                <NumericFormat
                  value={formatPrice(props?.nft?.offerPrice)}
                  suffix=" SUI"
                  thousandSeparator=","
                  displayType="text"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold leading-5 text-[#BABAC7] pb-1">
              Price (SUI)
            </label>
            <TextInput
              placeholder="Insert price"
              onChange={onInputChange}
              pattern="[0-9\.]*$"
              value={price}
            />
          </div>
          {!isValid && (
            <p className="text-[#F55151]">Please enter a valid amount</p>
          )}
          <div>
            <label className="text-sm font-semibold leading-5 text-[#BABAC7] pb-1">
              Duration
            </label>
            <CustomSelect
              options={OFFER_OPTIONS}
              value={period}
              onChange={(value) => setPeriod(value)}
            />
          </div>
        </div>
      </div>
    </CartModal>
  );
};

export default ModalMakeOffer;
