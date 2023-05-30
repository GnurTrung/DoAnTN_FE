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

const Mintlist = () => {
  const { handleMint } = useFunctionIDO();
  const { account } = useWeb3();
  const { accNftData, nftData, shareObject, lastWL } = useNftDetailContext();
  const [isMint, setIsMint] = useState(false);
  const { onShowPopupWallet } = useApplication();
  const [loading, setLoading] = useState(false);
  const attributes = nftData?.attributes;

  const getCode = (code) => {
    if (code === "gamioeggwl") code = "gamioegg";
    else if (code === "gamioeggwltest") code = "gamioeggtest";
    return code;
  };

  const bar = useRef(0);
  const onConnect = () => onShowPopupWallet(true);

  const whitelistName = attributes?.mintPoolWhitelistName || "Whitelist Mint";
  const whitelistStartTime = attributes?.whitelistStartTime || "";
  const whitelistEndTime = attributes?.whitelistEndTime || "";
  const code = attributes?.code || "";
  const SO_whitelist = !code.includes("gamio")
    ? parseInt(shareObject?.option_mint_whitelist?.fields?.sum_nft, 0)
    : parseInt(shareObject?.option_mint_public?.fields?.sum_nft - 4802, 0);
  const currentWhitelistMint = SO_whitelist || 0;
  const whitelistAccountLimit = accNftData[code]?.isWhitelist
    ? attributes?.collectionInfo?.whitelistAccountLimit
    : 0;
  const priceWhitelist = attributes?.price?.priceWhitelist;

  const currentPrivateMint =
    shareObject?.option_mint_private?.fields?.sum_nft || 0;

  useEffect(() => {
    if (
      !isDateGreater(new Date(whitelistStartTime), new Date()) &&
      isDateGreater(new Date(whitelistEndTime), new Date())
    ) {
      setIsMint(true);
    } else setIsMint(false);
  }, [isMint]);

  const handleComplete = () => {
    setIsMint(true);
  };
  const calcPercent = (current, max) => {
    try {
      if (current < 0 || max <= 0) return (bar.current.style.width = `${0}%`);
      const percent = ((current * 100) / max || 0).toFixed();
      bar.current.style.width = `${percent || 0}%`;
      return `${percent}%`;
    } catch (ex) {}
    return "";
  };

  const mintNFT = async () => {
    setLoading(true);
    await handleMint("whitelist");
    setLoading(false);
  };

  const getMaxWLMint = () => {
    if (
      attributes?.collectionInfo?.crossPoolMint &&
      isDateGreater(new Date(whitelistEndTime), new Date()) &&
      code != "suisoyboys"
    ) {
      return attributes?.collectionInfo?.maxWhitelistMint;
    }
    if (
      attributes?.collectionInfo?.crossPoolMint &&
      code == "suisoyboys" &&
      isDateGreater(new Date(), new Date(whitelistStartTime)) &&
      isDateGreater(new Date(whitelistEndTime), new Date())
    ) {
      return attributes?.collectionInfo?.itemCount - currentPrivateMint;
    }
    if (
      attributes?.collectionInfo?.crossPoolMint &&
      code == "suisoyboys" &&
      isDateGreater(new Date(whitelistStartTime), new Date())
    ) {
      return 0;
    }
    if (
      // attributes?.collectionInfo?.crossPoolMint &&
      isDateGreater(new Date(), new Date(whitelistEndTime))
    ) {
      return currentWhitelistMint;
    } else {
      return attributes?.collectionInfo?.maxWhitelistMint;
    }
  };

  const maxWhitelistMint = getMaxWLMint();

  return (
    <>
      {attributes?.collectionInfo?.whitelistAccountLimit > 0 &&
        attributes?.collectionInfo?.whitelistAccountLimit && (
          <div className="bg-[#1F1D43] border-jacarta-600  rounded-2xl border py-4 px-6 mt-2">
            <div>
              <span className=" text-xl text-white mt-1 font-display font-semibold">
                {whitelistName}
              </span>
            </div>
            <div className="mb-2 sm:flex sm:flex-wrap">
              <div className="sm:w-1/2 sm:pr-4">
                <div className="mt-2">
                  <div className="flex flex-row justify-between rounded-2xl p-3">
                    <div className="flex flex-col ">
                      <span className="text-jacarta-300 text-[14px]">
                        Price
                      </span>
                      <span className="text-[18px] text-white mt-1 font-display font-semibold">
                        {priceWhitelist == -1 ? `TBA` : priceWhitelist} SUI
                      </span>
                    </div>
                    <div className="flex flex-col ">
                      <span className="text-jacarta-300 text-[14px]">
                        Items
                      </span>
                      <span className=" text-[18px] text-white mt-1 font-display font-semibold">
                        {maxWhitelistMint == 0
                          ? `TBA`
                          : parseInt(maxWhitelistMint).toLocaleString(
                              undefined
                            )}
                      </span>
                    </div>
                    <div className="flex flex-col ">
                      <span className="text-jacarta-300 text-[14px]">Max</span>
                      <span className=" text-[18px] text-white mt-1 font-display font-semibold">
                        {whitelistAccountLimit >= 999
                          ? "∞"
                          : whitelistAccountLimit}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm flex justify-between">
                      <span className="text-white font-semibold">
                        {`${calcPercent(
                          currentWhitelistMint,
                          maxWhitelistMint
                        )}`}
                      </span>
                      <div>
                        <span className="text-white font-semibold">{`(`}</span>
                        <span className="text-white font-semibold">
                          <CountUp
                            start={lastWL || 0}
                            end={currentWhitelistMint}
                            duration={1}
                            separator="."
                          />
                        </span>
                        <span className="text-white ml-1 font-semibold">
                          {`/ ${
                            maxWhitelistMint == 0
                              ? `TBA`
                              : parseInt(maxWhitelistMint).toLocaleString(
                                  undefined
                                )
                          })`}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-sm flex justify-between pb-6 mb-2">
                      <div className="w-full h-2 bg-jacarta-200 rounded-full">
                        <div
                          ref={bar}
                          className=" h-full text-center text-xs text-white bg-accent rounded-full max-w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-start flex-col mt-2 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4  lg:pl-4  border-solid !border-[#4E4D6E] border-l">
                {isDateGreater(new Date(whitelistStartTime), new Date()) && (
                  <>
                    <span className="mt-2 text-[14px] text-white font-display font-semibold mb-2">
                      Starts In:
                    </span>
                    <div className="bg-[#2A294F] w-full rounded-2xl">
                      <Items_Countdown_timer
                        time={new Date(whitelistStartTime) - new Date()}
                        onCountDownComplete={handleComplete}
                      />
                    </div>
                  </>
                )}
                {isMint ? (
                  <>
                    <span className=" text-[14px] text-white font-display font-semibold mt-2 mb-2">
                      Ends In:
                    </span>
                    <div className="bg-[#2A294F] w-full rounded-2xl">
                      <Items_Countdown_timer
                        time={new Date(whitelistEndTime) - new Date()}
                      />
                    </div>
                    {account ? (
                      (accNftData[`${getCode(code)}`]?.whitelist || 0) <
                      whitelistAccountLimit ? (
                        currentWhitelistMint < maxWhitelistMint ? (
                          !loading ? (
                            <button
                              className="mt-4 btn-primary w-full"
                              onClick={mintNFT}
                            >
                              {`Mint NFT (${
                                accNftData[`${getCode(code)}`]?.whitelist || 0
                              }/${
                                whitelistAccountLimit >= 999
                                  ? "∞"
                                  : whitelistAccountLimit
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
                          <span className=" text-xl text-white font-display font-semibold mt-6">
                            {`SOLD OUT`}
                          </span>
                        )
                      ) : accNftData[`${code}`]?.isWhitelist ? (
                        <span className=" text-m text-white font-display font-semibold mt-4 self-center">
                          {`You have reached max NFT`}
                        </span>
                      ) : (
                        <>
                          <span className=" text-m text-white font-display font-semibold mt-4 self-center">
                            {`You are not eligible!`}
                          </span>
                        </>
                      )
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
                    {!isDateGreater(new Date(whitelistEndTime), new Date()) && (
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

export default Mintlist;
