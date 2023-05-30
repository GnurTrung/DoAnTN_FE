import { Tooltip } from "antd";
import DefaultAvatar from "assets/images/author/default-avatar.png";
import ErrorNft from "assets/images/product/error-large-nft.png";
import Image from "components/ProgressiveImage";
import { useRedirect } from "hooks";
import { useEffect, useState } from "react";
import { formatWallet, mystToSui } from "utils/wallet-utils";
import IconHeart from "../../assets/icons/IconHeart";
import IconMore from "../../assets/icons/IconMore";
import SuiToken from "../../assets/images/token/sui.png";
import ButtonAction from "./Button";
import style from "./style.module.css";
import { useWeb3 } from "contexts/useWeb3Context";
import { useApplication } from "contexts/useApplication";
import ButtonEditListing from "./ButtonEditListing";
import { Link } from "react-router-dom";
import { VERIFIED_TYPE } from "constants";
import IconVerified from "assets/icons/IconVerified";
import cx from "classnames";
import { TOP_RANK } from "constants";
import CustomCheckBox from "components/input/CheckBox";

const ProductCard = (props) => {
  const { redirectToPage } = useRedirect();
  const {
    nftId,
    title,
    imageUrl,
    avatar,
    numberLike,
    listingPrice,
    ownerAddress,
    creatorAddress,
    isListing,
    isLike,
    handleLikeNft,
    isActive,
    nftStatus,
    verify,
    isOnWallet = false,
    collectionAddress,
    royaltyFee,
    timeListing,
    ranking,
    top = 0,
    isOnBulkAction,
    onSelectNft,
    selectedNft,
    disabledCheckbox,
  } = props;
  const { isAuthenticated, account } = useWeb3();
  const { onShowPopupWallet } = useApplication();
  const [isLikeState, setIsLikeState] = useState(isLike);
  const [numberLikeState, setNumberLikeState] = useState(
    Number(numberLike || 0)
  );
  useEffect(() => {
    setIsLikeState(isLike);
    setNumberLikeState(Number(numberLike));
  }, [numberLike, isLike]);

  const onLike = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onShowPopupWallet();
      return;
    }
    const res = await handleLikeNft(nftId);
    if (res) {
      if (isLikeState) setNumberLikeState(numberLikeState - 1);
      else setNumberLikeState(numberLikeState + 1);
      setIsLikeState(res.data);
    }
  };

  const onClick = (e) => {
    if (isOnBulkAction) {
      if (!disabledCheckbox) {
        if (selectedNft.includes(nftId)) {
          const newSelectedNft = selectedNft.filter((id) => id !== nftId);
          onSelectNft(newSelectedNft);
          return;
        }
        onSelectNft([...selectedNft, nftId]);
        return;
      } else return;
    }
    e.stopPropagation();
    if (!isOnWallet) redirectToPage(`/nft/${nftId}`);
  };
  return (
    <div
      className={cx(
        `sc-product group flex flex-col relative ${isActive && style.border}`,
        {
          "top-1-rank": top === TOP_RANK.TOP_1,
          "top-10-rank": top === TOP_RANK.TOP_10,
          "top-25-rank": top === TOP_RANK.TOP_25,
        }
      )}
    >
      <div
        className="product-media overflow-hidden aspect-square max-h-80 w-full relative"
        onClick={onClick}
      >
        <Image
          src={imageUrl || ErrorNft}
          alt="NFT"
          className="w-full h-full object-cover !transition ease duration-300 group-hover:scale-110 ease-in-out"
          preview={false}
          fallback={ErrorNft}
          wrapperClassName="h-full w-full"
        />
        {ranking ? (
          <div
            className={cx(
              "absolute bottom-2 right-2 rounded-[32px]  bg-opacity-20 backdrop-blur-[10px] text-sm font-semibold h-8 w-[70px] flex items-center justify-center",
              {
                "bg-white text-white": top === 0,
                "bg-[#FE3B3B] text-[#FF6666]": top === TOP_RANK.TOP_1,
                "bg-[#FF8801] text-[#FF8801]": top === TOP_RANK.TOP_10,
                "bg-[#09FFF0] text-[#29FFF2]": top === TOP_RANK.TOP_25,
              }
            )}
          >
            <span>#{ranking}</span>
          </div>
        ) : null}
      </div>
      <div className="bottom-info flex-1 flex flex-col justify-between">
        <div className="top" onClick={onClick}>
          <div className="flex items-center space-x-1 w-full">
            {verify === VERIFIED_TYPE.VERIFIED ? <IconVerified /> : null}{" "}
            <span className="font-semibold text-[14px] text-white flex-1 truncate">
              {title}
            </span>
          </div>

          <IconMore />
        </div>
        <div className="bottom">
          <div className="details-product">
            <div className="author items-center">
              <div className="author-avatar">
                <img src={avatar || DefaultAvatar} alt="images" />
              </div>
              <div className="content">
                <div className="name">
                  <Link to={`/profile/${ownerAddress || creatorAddress}`}>
                    <span className="font-semibold text-xs text-[#BABAC7] hover:underline">
                      <Tooltip title={ownerAddress || creatorAddress || ""}>
                        {formatWallet(ownerAddress || creatorAddress || "")}
                      </Tooltip>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-style2" onClick={onClick}>
          {isListing ? (
            <div className="price">
              <div className="icon">
                <img src={SuiToken} alt="images" />
              </div>
              <div className="text-[14px] text-white">
                <div className="">SUI</div>
                <div className="font-semibold">
                  {mystToSui(listingPrice || 0).toLocaleString(undefined)}
                </div>
              </div>
            </div>
          ) : (
            <span className="text-[#9998AC] text-xs font-semibold">
              Unlisted
            </span>
          )}

          {isOnWallet && (
            <div className="favorite">
              {isLikeState ? (
                <IconHeart fill="#989BAC" onClick={onLike} />
              ) : (
                <IconHeart onClick={onLike} />
              )}
              <span>{numberLikeState}</span>
            </div>
          )}
        </div>

        {!isOnBulkAction && (
          <div className="bottom-style2 mt-3">
            {isListing && ownerAddress === account && (
              <ButtonEditListing
                nft={{
                  nftId,
                  listingPrice,
                  nftStatus,
                  title,
                  imageUrl,
                  collectionAddress,
                  royaltyFee,
                  timeListing,
                }}
              />
            )}
            <ButtonAction {...props} />
          </div>
        )}
      </div>
      {isOnBulkAction && (
        <div className="absolute top-3 left-3">
          <CustomCheckBox value={nftId} className="" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
