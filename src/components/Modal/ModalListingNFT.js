import { Button, Divider, Radio } from "antd";
import IconSpin from "assets/icons/IconSpin";
import Image from "components/ProgressiveImage";
import CustomRadio from "components/input/Radio";
import CustomSelect from "components/input/Select";
import TextInput from "components/input/TextInput";
import CartModal from "components/layouts/CardModal";
import { OFFER_OPTIONS } from "constants";
import { NFT_STATUS } from "constants/nft-action";
import { useWeb3 } from "contexts/useWeb3Context";
import moment from "moment";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import { getProjectByCollection } from "services/nfts";
import { formatPrice, removeDotAcceptFirst } from "utils";

const ModalListingNFT = (props) => {
  const { onListing, nft } = props;
  const [price, setPrice] = useState(props?.nft?.floorPriceListing || 1);
  const [isValid, setIsValid] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { balance } = useWeb3();
  const [period, setPeriod] = useState(OFFER_OPTIONS[0].value);
  const [isListingDisabled, setIsListingDisabled] = useState(false);
  const [royaltyFee, setRoyaltyFee] = useState(5);
  const onInputChange = (e) => {
    if (!e.target.validity.valid) setPrice((v) => v);
    else {
      let value = e.target.value;
      value = removeDotAcceptFirst(value);
      setPrice(value);
    }
  };
  useEffect(() => {
    if (nft?.nftStatus === NFT_STATUS.LISTING && nft?.listingPrice) {
      setPrice(formatPrice(nft?.listingPrice));
    }
  }, [nft]);
  useEffect(() => {
    setIsValid(!(!price || price <= 0));
  }, [price]);

  useEffect(() => {
    if (nft?.timeListing) {
      const isListingStart = moment(nft?.timeListing).isSameOrBefore(moment());
      setIsListingDisabled(!isListingStart);
    }
  }, [nft?.timeListing]);

  useEffect(() => {
    if (nft?.royaltyFee) {
      setRoyaltyFee(nft?.royaltyFee);
    }
  }, [nft?.royaltyFee]);

  useEffect(() => {
    const getCollectionInfo = async () => {
      const res = await getProjectByCollection(nft?.collectionAddress);
      if (res?.data?.[0]?.listingStartTime) {
        const isListingStart = moment(
          res?.data?.[0]?.listingStartTime
        ).isSameOrBefore(moment());
        setIsListingDisabled(!isListingStart);
      }
      if (res?.data?.[0]?.royaltyPercentage)
        setRoyaltyFee(res?.data?.[0]?.royaltyPercentage);
    };
    if (props.show && !nft?.timeListing && !nft?.royaltyFee) {
      getCollectionInfo();
    }
  }, [nft?.timeListing, nft?.royaltyFee, nft?.collectionAddress, props.show]);

  const handleListing = async () => {
    if (!isValid || processing) return;
    if (
      nft?.nftStatus === NFT_STATUS.LISTING &&
      price === formatPrice(nft?.listingPrice)
    ) {
      toast.error("New price can not be the same as old price!");
      return;
    }
    setProcessing(true);
    onListing && (await onListing(price));
    setProcessing(false);
  };
  return (
    <CartModal
      open={props.show}
      onCancel={props.onHide}
      destroyOnClose={true}
      title="List for Sale"
      width={417}
      footer={
        <Button
          className="btn-primary w-full"
          onClick={handleListing}
          disabled={!isValid || isListingDisabled}
        >
          {isListingDisabled && (
            <>
              <span>Listing enabled in </span>
              <Countdown
                date={Number(moment(nft?.timeListing).format("x"))}
                onComplete={() => setIsListingDisabled(false)}
              />
            </>
          )}
          {!isListingDisabled &&
            (!processing ? <span>List</span> : <IconSpin />)}
        </Button>
      }
    >
      <div className="w-full p-5 space-y-5">
        <div className="bg-[#2A294F] rounded-2xl p-3">
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
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold leading-5 text-[#BABAC7] pb-2">
            Sale Type
          </label>
          <Radio.Group className="flex" value={0}>
            <div className="basis-[50%]">
              <CustomRadio value={0}>
                <span className="text-sm leading-5 text-[#BABAC7] pb-2">
                  Fixed Price
                </span>
              </CustomRadio>
            </div>
            <div className="basis-[50%]">
              <CustomRadio value={1}>
                <span className="text-sm leading-5 text-[#BABAC7] pb-2">
                  Auction
                </span>
              </CustomRadio>
            </div>
          </Radio.Group>
        </div>

        <div>
          <label className="text-sm font-semibold text-[#9998AC] leading-5 pb-1">
            Price (SUI)
          </label>
          <TextInput
            value={price}
            pattern="[0-9\.]*$"
            onChange={onInputChange}
          />
          {!isValid && (
            <p className="text-[#F55151]">Please enter a valid amount</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-[#9998AC] leading-5 pb-1">
            Duration
          </label>
          <CustomSelect
            options={OFFER_OPTIONS}
            value={period}
            onChange={(value) => setPeriod(value)}
          />
        </div>
        <Divider className="bg-[#4E4D6E]" />
        <div className="flex flex-col space-y-1 text-[#BABAC7]">
          <span className="font-semibold">Fees</span>
          <div className="flex justify-between text-xs ">
            <span>Creator Royalties ({Number(royaltyFee) || 5}%)</span>
            <span>{(price * (Number(royaltyFee) || 5)) / 100} SUI</span>
          </div>
          <div className="flex justify-between text-xs ">
            <span>
              Platform <span className="text-accent">(1.5%)</span>
            </span>
            <NumericFormat
              value={(price * 1.5) / 100}
              decimalScale={4}
              suffix=" SUI"
              displayType="text"
            />
          </div>
        </div>
      </div>
    </CartModal>
  );
};

export default ModalListingNFT;
