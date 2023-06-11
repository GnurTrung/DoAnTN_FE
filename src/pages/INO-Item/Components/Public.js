import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNftDetailContext } from "../context";
import { isDateGreater } from "utils/date-time";
import EvenEnd from "./EventEnd";
import { useWeb3 } from "contexts/useWeb3Context";
import { useApplication } from "contexts/useApplication";
import { useRef } from "react";
import CountUp from "react-countup";
import Items_Countdown_timer from "components/items_countdown_timer";
import useFunctionIDO from "./functionINO";

const Public = () => {
  const { handleMint } = useFunctionIDO();
  const { account } = useWeb3();
  const { accNftData, nftData, shareObject, lastPL } = useNftDetailContext();
  const [isPLMint, setIsPLMint] = useState(false);
  const { onShowPopupWallet } = useApplication();
  const [loading, setLoading] = useState(false);

  const attributes = nftData?.attributes;
  const bar1 = useRef(0);
  const onConnect = () => onShowPopupWallet(true);

  const publicName = attributes?.mintPoolPublicName || "Public Mint";
  const publicStartTime = attributes?.publicStartTime || "";
  const publicEndTime = attributes?.publicEndTime || "";
  const currentWhitelistMint =
    shareObject?.option_mint_whitelist?.fields?.sum_nft || 0;
  const currentPrivateMint =
    shareObject?.option_mint_private?.fields?.sum_nft || 0;
  const SO_keyHolder = shareObject?.option_mint_holder?.fields?.sum_nft || 0;

  const SO_public = parseInt(
    shareObject?.option_mint_public?.fields?.sum_nft || 0
  );
  const code = attributes?.code;
  const publicAccountLimit =
    attributes?.collectionInfo?.publicAccountLimit || 1;
  const pricePublic = attributes?.price?.pricePublic;
  const mintNFT = async () => {
    setLoading(true);
    await handleMint("public");
    setLoading(false);
  };

  const getCurrentPublicMint = () => {
    if (code == "monks") {
      return SO_public - 107;
    }
    if (code == "bigfishsurfclub") {
      return SO_public - 485;
    }
    return code == "chillcats" ? SO_public - 225 : SO_public;
  };

  const getMaxPublicMint = () => {
    if (
      attributes?.collectionInfo?.crossPoolMint &&
      isDateGreater(new Date(publicStartTime), new Date())
    ) {
      return attributes?.collectionInfo?.maxPublicMint
        ? attributes?.collectionInfo?.maxPublicMint
        : 0;
    }
    if (isDateGreater(new Date(), new Date(publicEndTime))) {
      return getCurrentPublicMint();
    }
    if (attributes?.collectionInfo?.crossPoolMint) {
      return (
        attributes?.collectionInfo?.itemCount -
        currentWhitelistMint -
        currentPrivateMint -
        SO_keyHolder -
        attributes?.collectionInfo?.reversed
      );
    } else {
      return attributes?.collectionInfo?.maxPublicMint;
    }
  };
  const maxPLMint = parseInt(getMaxPublicMint() < 0 ? 0 : getMaxPublicMint());

  useEffect(() => {
    let currentTime = new Date();
    let timer;
    try {
      timer = setTimeout(() => {
        if (
          !isDateGreater(new Date(publicStartTime), currentTime) &&
          isDateGreater(new Date(publicEndTime), currentTime)
        ) {
          setIsPLMint(true);
        } else setIsPLMint(false);
      }, 500);
    } catch (ex) { }
    return () => timer && clearTimeout(timer);
  }, [isPLMint]);
  const handleCompletePL = () => {
    setIsPLMint(true);
  };
  useEffect(() => {
    calcPercentPL();
  }, []);

  const calcPercentPL = (current, max) => {
    try {
      if (current < 0 || max <= 0) return (bar1.current.style.width = `${0}%`);
      const percent = max >= 100000 ? 100 : ((current * 100) / max).toFixed();
      bar1.current.style.width = `${percent}%`;
      return `${percent}%`;
    } catch (ex) { }
    return "";
  };
  const renderButtonMint = () => {
    return (accNftData[`${code}`]?.public || 0) < publicAccountLimit ? (
      getCurrentPublicMint() < maxPLMint ? (
        !loading ? (
          <button className="mt-4 btn-primary w-full" onClick={mintNFT}>
            {`Mint NFT (${accNftData[`${code}`]?.public || 0}/${publicAccountLimit >= 999 ? "∞" : publicAccountLimit
              })`}
          </button>
        ) : (
          <button className="mt-4 btn-primary w-full">
            <p>Process</p>
            <svg
              className="animate-spin text-white h-5 w-5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        )
      ) : (
        <span className=" text-xl text-white font-display font-semibold self-center mt-4">
          {`SOLD OUT`}
        </span>
      )
    ) : (
      <span className=" text-m text-white font-display font-semibold mt-4 self-center">
        {`You have reached max NFT`}
      </span>
    );
  };
  return (
    <>
      {publicAccountLimit > 0 && (
        <div className="bg-[#131924] border-jacarta-600  rounded-2xl border mt-2 py-4 px-6">
          <div>
            <span className=" text-xl text-white mt-1 font-display font-semibold">
              {publicName}
            </span>
          </div>
          <div className="mb-2 sm:flex sm:flex-wrap">
            <div className="sm:w-1/2 sm:pr-4">
              <div className="mt-2">
                <div className="flex flex-row justify-between rounded-2xl p-3">
                  <div className="flex flex-col ">
                    <span className="text-jacarta-300 text-[14px]">Price</span>
                    <span className=" text-[18px] text-white mt-1 font-display font-semibold">
                      {pricePublic == -1 ? `TBA` : pricePublic} SUI
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-jacarta-300 text-[14px]">Items</span>
                    <span className=" text-[18px] text-white mt-1 font-display font-semibold ">
                      {maxPLMint == 0 &&
                        !isDateGreater(new Date(), new Date(publicStartTime))
                        ? "TBA"
                        : maxPLMint.toLocaleString(undefined)}
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-jacarta-300 text-[14px]">Max</span>
                    <span className=" text-[18px] text-white mt-1 font-display font-semibold">
                      {publicAccountLimit >= 999 ? "∞" : publicAccountLimit}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm flex justify-between">
                    <span className="text-white font-semibold">
                      {`${calcPercentPL(getCurrentPublicMint(), maxPLMint)}`}
                    </span>
                    <div>
                      <span className="text-white font-semibold">{`(`}</span>
                      <span className="text-white font-semibold">
                        <CountUp
                          start={lastPL || 0}
                          end={getCurrentPublicMint()}
                          duration={1}
                          separator="."
                        />
                      </span>
                      {SO_public > maxPLMint && (
                        <span className="text-red ml-1 font-semibold">
                          {`+${SO_public - maxPLMint}`}
                        </span>
                      )}
                      <span className="text-white ml-1 font-semibold">
                        {`/ ${maxPLMint == 0 &&
                            !isDateGreater(new Date(), new Date(publicStartTime))
                            ? "TBA"
                            : maxPLMint.toLocaleString(undefined)
                          })`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm flex justify-between mb-2">
                    <div className="w-full h-2 bg-jacarta-200 rounded-full">
                      <div
                        ref={bar1}
                        className=" h-full text-center text-xs text-white bg-accent rounded-full max-w-full"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start flex-col sm:border-jacarta-100 mt-2 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-4 border-solid !border-[#4E4D6E] md:border-l border-l-0">
              {isDateGreater(new Date(publicStartTime), new Date()) && (
                <>
                  <span className="mt-2 mb-2 text-[14px] text-white font-display font-semibold">
                    Starts In:
                  </span>
                  <div className="w-full rounded-2xl">
                    <Items_Countdown_timer
                      time={new Date(publicStartTime) - new Date()}
                      onCountDownComplete={handleCompletePL}
                    />
                  </div>
                </>
              )}
              {isPLMint ? (
                <>
                  <span className=" text-[14px] text-white font-display font-semibold mt-2 mb-2">
                    Ends In:
                  </span>
                  <div className="w-full rounded-2xl">
                    <Items_Countdown_timer
                      time={new Date(publicEndTime) - new Date()}
                    />
                  </div>
                  {account ? (
                    <>{renderButtonMint()}</>
                  ) : (
                    <Button
                      className="mt-4 btn-primary w-full"
                      onClick={onConnect}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {!isDateGreater(new Date(publicEndTime), new Date()) && (
                    <EvenEnd />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Public;
