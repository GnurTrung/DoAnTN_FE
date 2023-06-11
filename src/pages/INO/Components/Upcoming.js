import Items_Countdown_timer from "../../../components/items_countdown_timer";
import { useState } from "react";
import { isDateGreater } from "utils/date-time";
import { getLogoURL } from "helpers/url-helper";
import { Link } from "react-router-dom";
import IconVerified from "assets/icons/IconVerified";
import { useContexts } from "../Context";
import Image from "components/ProgressiveImage";
import { toast } from "react-hot-toast";

const Explore = () => {
  const [countDownComplete, setCountDownComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { upcoming, activeID } = useContexts();

  const onCountDownComplete = () => {
    setCountDownComplete(true);
    setIsComplete(true);
  };
  const getUnixTime = (idx) => {
    return new Date(idx).getTime();
  };
  const getStartTime = (idx) => {
    try {
      const arr = [
        getUnixTime(idx?.attributes?.publicStartTime),
        getUnixTime(idx?.attributes?.keyHolderStartTime),
        getUnixTime(idx?.attributes?.whitelistStartTime),
        getUnixTime(idx?.attributes?.privateStartTime),
      ];
      const arrSort = arr.filter((x) => x != 0).sort();
      return arrSort[0];
    } catch (ex) {
      console.log(ex);
    }
  };
  const getSuiPricePublic = (idx) => {
    try {
      const pricePublic = idx?.attributes?.price?.pricePublic;
      if (pricePublic == -1) return "TBA";
      else if (pricePublic == 0) return "0 SUI";
      else if (pricePublic) return `${pricePublic} SUI`;
    } catch (ex) {
      console.log(ex);
    }
    return "-- SUI";
  };
  const getSuiPriceWhitelist = (idx) => {
    try {
      const arr_price = [
        { name: "Mintlist", price: idx?.attributes?.price?.priceWhitelist },
        { name: "Private", price: idx?.attributes?.price?.pricePrivate },
        { name: "Key Holder", price: idx?.attributes?.price?.priceKeyHolder },
      ];
      const arr_price_filter = arr_price
        .filter((x) => x.price != undefined)
        .sort((a, b) => a.price - b.price);
      const pricePublic = arr_price_filter[0]?.price;
      if (pricePublic == -1) return "TBA";
      else if (pricePublic == 0) return "0 SUI";
      else if (pricePublic) return `${pricePublic} SUI`;
    } catch (ex) {
      console.log(ex);
    }
    return "-- SUI";
  };
  const setMinPool = (idx) => {
    try {
      const arr_price = [
        { name: "Mintlist", price: idx?.attributes?.price?.priceWhitelist },
        { name: "Private", price: idx?.attributes?.price?.pricePrivate },
        { name: "Key Holder", price: idx?.attributes?.price?.priceKeyHolder },
      ];
      const arr_price_filter = arr_price
        .filter((x) => x.price != undefined)
        .sort((a, b) => a.price - b.price);
      return arr_price_filter[0]?.name;
    } catch (ex) {
      console.log(ex);
    }
    return "Mintlist";
  };

  const getLogo = (item) => {
    try {
      const data = item?.attributes?.otherImages?.data;
      if (data && data[0] && data[0]?.attributes?.url)
        return getLogoURL(data[0]?.attributes?.url);
    } catch (ex) {
      toast.error(ex);
    }
    return null;
  };
  return (
    upcoming.length > 0 &&
    (activeID == 1 || activeID == 3) && (
      <section className="tf-section tf-explore tf-filter tf-center !p-0">
        <div className="tf-container">
          <div className="row ">
            <div className="col-md-12">
              <div className="tf-heading style-2 wow fadeInUp !justify-start">
                <h4 className="heading text-4xl font-semibold">Upcoming</h4>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
              {upcoming
                .sort((a, b) => getStartTime(a) - getStartTime(b))
                .map((idx) => (
                  <div key={idx.id}>
                    <div className="slider-item !rounded-2xl">
                      <div className="sc-product style1">
                        <Link to={`/ino/${idx?.attributes?.code}`}>
                          <Image
                            src={getLogo(idx)}
                            alt="images"
                            className="h-[300px] w-full object-cover rounded-t-2xl aspect-video !m-0"
                          />
                        </Link>
                        <Link to={`/ino/${idx?.attributes?.code}`}>
                          <div className="my-2 ml-2">
                            <div className="details-product flex flex-row items-center justify-start">
                              <div className="w-[18px]">
                                <IconVerified />
                              </div>
                              <div className="three_dot_1_line ml-1 text-[16px] font-semibold hover:text-accent text-white">
                                {idx?.attributes?.name}
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="pb-1.5">
                          <div className="flex justify-between bg-[#1B2333] px-4 py-3 mx-2 rounded-2xl">
                            <div>
                              <p className="text-[12px] text-[#BABAC7]">
                                Items
                              </p>
                              <p className="font-semibold text-white text-[14px]">
                                {idx?.attributes?.collectionInfo?.itemCount >=
                                100000
                                  ? "∞"
                                  : parseInt(
                                      idx?.attributes?.collectionInfo?.itemCount
                                    ).toLocaleString(undefined)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[12px] text-[#BABAC7]">
                                {setMinPool(idx)}
                              </p>
                              <p className="font-semibold text-white text-[14px]">
                                {getSuiPriceWhitelist(idx)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[12px]">Public</p>
                              <p className="font-semibold text-white text-[14px]">
                                {getSuiPricePublic(idx)}
                              </p>
                            </div>
                          </div>
                          {isDateGreater(
                            getStartTime(idx),
                            new Date().getTime
                          ) &&
                            !countDownComplete && (
                              <div className="flex items-center justify-between my-3 mx-2 bg-[#1B2333] rounded-2xl">
                                <span className="text-[12px] ml-4">
                                  Starts In:
                                </span>
                                <div className="w-[65%]">
                                  <Items_Countdown_timer
                                    time={
                                      getStartTime(idx) - new Date().getTime()
                                    }
                                    onCountDownComplete={onCountDownComplete}
                                  />
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {/* </Swiper> */}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Explore;
