import IconDiscord from "assets/icons/IconDiscord";
import IconGlobal from "assets/icons/IconGlobal";
import IconTwitter from "assets/icons/IconTwitter";
import IconVerified from "assets/icons/IconVerified";
import Meta from "components/Meta";
import Image from "components/ProgressiveImage";
import { getLogoURL } from "helpers/url-helper";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import ItemINO from "./Components/ItemINO";
import { Provider, useNftDetailContext } from "./context";
import { TwitterShareButton } from "react-share";
import SharingProgram from "./Components/SharingProgram";
import { isDateGreater } from "utils/date-time";

INODetail.propTypes = {};
function INODetail() {
  const { nftData, shareObject, nftDataPool } = useNftDetailContext();
  const banner = getLogoURL(
    nftData?.attributes?.banner?.data[0]?.attributes?.url
  );
  const logo = getLogoURL(nftData?.attributes?.logo?.data?.attributes?.url);
  const total = parseInt(nftData?.attributes?.collectionInfo?.itemCount || 0);
  let minted = 0;
  if (nftData?.attributes?.code == "suibears") {
    minted = 630;
  } else if (nftData?.attributes?.code == "chillcats") {
    minted = shareObject?.sum_nft - 225;
  } else {
    minted = shareObject?.sum_nft > total ? total : shareObject?.sum_nft;
  }

  if (nftData?.attributes?.code.includes("gamio")) minted = minted - 4802;
  minted = minted < 0 ? 0 : minted;

  const prizePool = nftData?.attributes?.totalPrize;
  const getUnixTime = (idx) => {
    return new Date(idx).getTime();
  };
  const getEndTime = () => {
    try {
      const arr = [
        getUnixTime(nftData?.attributes?.publicEndTime),
        getUnixTime(nftData?.attributes?.keyHolderEndTime),
        getUnixTime(nftData?.attributes?.whitelistEndTime),
        getUnixTime(nftData?.attributes?.privateEndTime),
      ];
      const arrSort = arr
        .filter((x) => x != 0)
        .sort()
        .reverse();
      return arrSort[0];
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <>
      <Meta title={nftData?.attributes?.name} src={banner} />
      <div className="">
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="thumb-pagetitle relative">
                <Image
                  src={banner}
                  className="!object-cover md:aspect-[3.5/1] w-full !min-h-[300px]"
                  wrapperClassName="w-full"
                />
                <button className="bg-[#2A294F] !rounded-xl backdrop-blur-[5.5px] py-4 px-8 font-semibold text-white flex flex-row absolute bottom-8 right-10">
                  <div>
                    {(
                      nftData?.attributes?.collectionStatus || ""
                    ).toUpperCase()}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="tf-container">
          <div className="general-info flex-col items-start xl:flex-row">
            <div className="left-info !top-[-27px] md:!top-[-60px]">
              <div className="collection-info !gap-[1rem] ssm:!gap-0">
                <Image
                  src={logo}
                  className="avatar md:!w-[200px] md:!h-[200px] !w-[120px] !h-[120px] avatar-border"
                  alt="avatar"
                />
                <div className="social">
                  {/* <Link
                    to={`/collection/${nftData?.attributes?.SCData?.SC_collection}`}
                    className="text-base flex items-center mt-2"
                  > */}
                  <h3 className="flex py-2 items-center">
                    <div className="text-white mr-2">
                      {nftData?.attributes?.name}
                    </div>
                    <IconVerified width={22} height={22} />
                  </h3>
                  {/* </Link> */}
                  <div className="media flex">
                    <a
                      href={nftData?.attributes?.social?.twitterLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconTwitter />
                    </a>
                    <a
                      href={nftData?.attributes?.social?.discordLink}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2"
                    >
                      <IconDiscord />
                    </a>
                    <a
                      href={nftData?.attributes?.social?.website}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2"
                    >
                      <IconGlobal />
                    </a>
                  </div>
                </div>
              </div>
              <div className="">{nftData?.attributes?.description}</div>
            </div>
            <div>
              <div className="flex justify-end xl:!mt-[45px]">
                <TwitterShareButton
                  url={window.location.href}
                  title={` Mint ${
                    nftData?.attributes?.name || ""
                  } on Tocen NFT Marketplace`}
                  className="mx-2"
                >
                  <div className="btn-secondary px-8">
                    <IconTwitter width={20} height={20} />
                    <div className="ml-1 text-[14px]">Share on Twitter</div>
                  </div>
                </TwitterShareButton>
                <Link
                  to={`https://explorer.sui.io/object/${nftData?.attributes?.SCData?.SC_collection}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2"
                >
                  <button className="btn-secondary px-8">
                    <IconGlobal width={20} height={20} />
                    <div className="ml-1 text-[14px]">View on Explore</div>
                  </button>
                </Link>
                {isDateGreater(new Date().getTime(), getEndTime()) && (
                  <Link
                    to={`/collection/${nftData?.attributes?.SCData?.SC_collection}`}
                    className="ml-2"
                  >
                    <button className="btn-primary px-8">
                      <div className="ml-1 text-[14px]">View Collection</div>
                    </button>
                  </Link>
                )}
              </div>
              <div className="right-info !flex mt-4 flex-wrap sm:flex-nowrap !justify-start lg:!justify-end lg:!items-end mb-[3rem] xl:mb-0 gap-[1rem]">
                <div className="stat md:!w-[200px] !w-[130px]">
                  <p className="text-[#BABAC7]">{"Total"}</p>
                  <h4 className="font-semibold text-white">
                    {total >= 100000
                      ? "∞"
                      : parseInt(total).toLocaleString(undefined)}
                  </h4>
                </div>
                <div className="stat md:!w-[200px] !w-[130px]">
                  <p className="text-[#BABAC7]">{"Minted"}</p>
                  <h4 className="font-semibold text-white">
                    {
                      <CountUp
                        start={0}
                        end={minted || 0}
                        duration={1}
                        separator="."
                      />
                    }
                  </h4>
                </div>
                <div className="stat md:!w-[200px] !w-[130px]">
                  <p className="text-[#BABAC7]">{"Reserved"}</p>
                  <h4 className="font-semibold text-white">
                    {nftData?.attributes?.collectionInfo?.reversed || 0}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="tf-container">
          <ItemINO data={nftData} key={nftData?.id} minted={minted} />
          {prizePool != 0 && prizePool && <SharingProgram />}
        </div>
      </div>
    </>
  );
}

const INODetailPage = (props) => (
  <Provider>
    <INODetail {...props} />
  </Provider>
);

export default INODetailPage;
