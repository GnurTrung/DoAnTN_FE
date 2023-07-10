import { formatAddress } from "@mysten/sui.js";
import IconDiscount from "assets/icons/IconDiscount";
import cx from "classnames";
import { useWeb3 } from "contexts/useWeb3Context";
import moment from "moment";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { formatPrice } from "utils";
import { useNftDetailContext } from "../context";

const OfferTable = () => {
  const { dataOffers, dataOnchain, onShowAcceptOffer, onShowCancelOffer } =
    useNftDetailContext();
  const { account } = useWeb3();
  const [hasOffer, setHasOffer] = useState(false);

  let rows = dataOffers?.data?.rows || [];

  useEffect(() => {
    const value = dataOffers?.data?.rows.find(
      (offer) => offer.userAddress === account
    );
    setHasOffer(value);
  }, [account, dataOffers]);

  if (!rows || rows.length === 0) return <></>;
  return (
    <div className="pt-8">
      <div className="cursor-pointer font-semibold text-lg leading-7 flex items-center space-x-2 mb-5 text-white">
        <IconDiscount /> <span>Offers</span>
      </div>

      <ul className="tab-bid !h-96">
        {!rows || rows.length === 0 ? (
          <li>
            <div className="box-bid">
              <div className="infor">No offers yet</div>
            </div>
          </li>
        ) : (
          <>
            <li
              className={cx(
                "text-[#BABAC7] text-sm leading-5 font-semibold grid px-4 mb-2",
                {
                  "grid-cols-5": dataOnchain?.owner === account || hasOffer,
                  "grid-cols-4": !(dataOnchain?.owner === account || hasOffer),
                }
              )}
            >
              <span>Price</span>
              <span>Date</span>
              <span>Expiration</span>
              <span>From</span>
              {(dataOnchain?.owner === account || hasOffer) && (
                <span>Action</span>
              )}
            </li>
            {rows.map(
              ({ userAddress, price, blockTimestamp, expireTime }, index) => (
                <li
                  key={index}
                  className={cx(
                    "grid rounded-2xl bg-[#1B2333] items-center p-4 text-sm mb-2 font-semibold",
                    {
                      "grid-cols-5": dataOnchain?.owner === account || hasOffer,
                      "grid-cols-4": !(
                        dataOnchain?.owner === account || hasOffer
                      ),
                    }
                  )}
                >
                  <NumericFormat
                    value={formatPrice(price)}
                    displayType="text"
                    decimalScale={3}
                    suffix=" SUI"
                    className="text-white leading-5"
                  />
                  <span className="text-white leading-5">
                    {moment.unix(blockTimestamp / 1000).fromNow()}
                  </span>
                  <span className=" text-white leading-5">
                    {!Number(expireTime)
                      ? "--"
                      : moment.unix(expireTime / 1000).toNow()}
                  </span>
                  <span className="text-white leading-5">
                    <Link
                      to={`/profile/${userAddress}`}
                      className=" hover:text-current hover:underline"
                    >
                      {formatAddress(userAddress || "")}
                    </Link>{" "}
                  </span>
                  {dataOnchain?.owner === account && (
                    <span
                      className="text-accent cursor-pointer font-semibold"
                      onClick={() =>
                        onShowAcceptOffer({
                          dataNFT: dataOnchain,
                          userAddress,
                          price,
                        })
                      }
                    >
                      Accept
                    </span>
                  )}
                  {userAddress === account && (
                    <span
                      className="text-[#9998AC] cursor-pointer font-semibold"
                      onClick={() =>
                        onShowCancelOffer({
                          dataNFT: dataOnchain,
                          userAddress,
                          price,
                        })
                      }
                    >
                      Cancel
                    </span>
                  )}
                </li>
              )
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default OfferTable;
