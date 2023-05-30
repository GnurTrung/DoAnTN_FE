import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatWallet, mystToSui } from "utils/wallet-utils";
import IconHeart from "../../assets/icons/IconHeart";
import IconMore from "../../assets/icons/IconMore";
import SuiToken from "../../assets/images/token/sui.png";
import CollectionAvatar from "assets/images/collection/banner_img.png";
import Image from "components/ProgressiveImage";

const UserNFTCard = ({
  id,
  title,
  img,
  avatar,
  creator,
  price,
  nftStatus
}) => {
  return (
    <div className="sc-product">
      <Link to={`/nft/${id}`} className="tag">
        <div className="product-media">
          <Image src={img || CollectionAvatar} alt="images" className="object-cover !max-h-[331px]" />
        </div>
      </Link>
      <div className="bottom-info ">
        <div className="top">
          <Link to={`/nft/${id}`} className="tag">
            {title}
          </Link>
          <button className="!z-10" onClick={() => { console.log(title) }}><IconMore /></button>
        </div>
        <div className="bottom">
          <div className="details-product">
            <div className="author">
              <div className="author-avatar">
                <img src={avatar || CollectionAvatar} alt="images" />
              </div>
              <div className="content">
                <div className="name">
                  <Link to="#">{formatWallet(creator)}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-style2">
          {nftStatus == 0 ? <div className="price">
            <div className="icon">
              <img src={SuiToken} alt="images" />
            </div>
            <div className="content">
              <div className="name">SUI</div>
              <div className="cash">{mystToSui(price)}</div>
            </div>
          </div>
            : <div className="price">
              <div className="content">
                <div className="name !font-display !font-semibold">Unlisted</div>
              </div>
            </div>}

          <div className="favorite">
            <IconHeart />
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNFTCard;
