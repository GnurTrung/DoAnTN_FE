import { formatAddress } from "@mysten/sui.js";
import Image from "components/ProgressiveImage";
import React from "react";
import DefaultAvatar from "assets/images/author/default-avatar.png";
import { Link } from "react-router-dom";
import { VERIFIED_TYPE } from "constants";
import IconVerified from "assets/icons/IconVerified";
const FavoriteProductCard = ({ imageUrl, title, ownerAddress, verify }) => {
  return (
    <div className="flex flex-col rounded-2xl bg-[#1F1D43] group cursor-pointer">
      <div className="overflow-hidden aspect-square max-h-80 w-full rounded-t-2xl">
        <Image
          src={imageUrl}
          alt="NFT"
          className="w-full h-full object-cover !transition ease duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center space-x-1 w-full">
          {verify === VERIFIED_TYPE.VERIFIED ? <IconVerified /> : null}{" "}
          <span className="font-semibold text-[14px] text-white flex-1 truncate">
            {title}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <Image
            src={DefaultAvatar}
            className="rounded-full h-[23px] w-[23px] object-cover"
          />
          <Link to={`/profile/${ownerAddress}`}>
            <span className="text-xs font-semibold text-[#BABAC7] hover:underline">
              {formatAddress(ownerAddress || "")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductCard;
