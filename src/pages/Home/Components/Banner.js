import { A11y, Autoplay, Navigation, Scrollbar } from "swiper";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import IconRightArrow from "assets/icons/IconRightArrow";
import Image from "components/ProgressiveImage";
import Items_Countdown_timer from "components/items_countdown_timer";
import { useRedirect } from "hooks";
import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { getBanner } from "services/nfts";
import { Swiper, SwiperSlide } from "swiper/react";
import { isDateGreater } from "utils/date-time";

const Banner = () => {
  const [data, setData] = useState([]);
  const { redirectToPage } = useRedirect();
  const getData = async () => {
    const res = await getBanner();
    setData(res?.data || []);
  };
  useEffect(() => {
    getData();
  }, []);
  const getUnixTime = (idx) => {
    return idx * 1000;
  };
  const getStartTime = (idx) => {
    try {
      const arr = [
        getUnixTime(idx?.publicStartTime),
        getUnixTime(idx?.whitelistStartTime),
      ];
      const arrSort = arr.filter((x) => x != 0).sort();
      return arrSort[0];
    } catch (ex) {
      console.log(ex);
    }
  };
  const getEndTime = (idx) => {
    try {
      const arr = [
        getUnixTime(idx?.publicEndTime),
        getUnixTime(idx?.whitelistEndTime),
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
  const getSUIprice = (idx) => {
    try {
      const pricePublic = idx?.pricePublic;
      if (pricePublic == -1) return "TBA";
      else if (pricePublic == 0) return "0 SUI";
      else if (pricePublic) return `${pricePublic} SUI`;
    } catch (ex) {
      console.log(ex);
    }
    return "-- SUI";
  };
  return (
    <section className="tf-slider">
      <div className="">
        <div className="row">
          <div className="col-md-12 !group">
            <Swiper
              modules={[Navigation, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              className="slider-home"
              // loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
            >
              {!!data.length &&
                data
                  .sort((a, b) => getStartTime(a) - getStartTime(b))
                  .map((idx) => (
                    <SwiperSlide key={idx?.id}>
                      <div>
                        <Link to={`/ino/${idx?.code}`}>
                          <section>
                            <div className="container-fluid">
                              <div className="row">
                                <div className="thumb-pagetitle relative">
                                  <Image
                                    src={idx?.banner}
                                    className="md:aspect-[4/1] md:min-h-[400px] min-h-[540px] !object-cover w-full"
                                    wrapperClassName="w-full"
                                  />
                                  <div
                                    className="absolute h-full w-full -top-0 left-0"
                                    style={{
                                      background:
                                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.67) 100%)",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </Link>
                        <section className="container-fluid">
                          <div className="banner-info !relative">
                            <div
                              onClick={() =>
                                redirectToPage(`/ino/${idx?.code}`)
                              }
                              className="cursor-pointer !absolute w-full max-w-[1440px] px-[30px] bottom-5 left-[50%] translate-x-[-50%] flex justify-between items-end"
                            >
                              <div className="collection-info relative bottom-4 md:bottom-2 flex flex-col lg:flex-row !items-start lg:!items-end">
                                <Image
                                  src={idx?.logo}
                                  className="avatar !h-[150px] !w-[150px] lg:!h-[170px] lg:!w-[170px] lg:mb-0 lg:mr-[1.5rem] rounded-2xl mb-[0.5rem] !aspect-square"
                                  alt="avatar"
                                />
                                <div className="social xxl:max-w-[1000px] !max-w-[800px]">
                                  <Link to={`/ino/${idx?.code}`}>
                                    <p className="text-2xl font-semibold font-display text-white hover:text-accent mb-[0.5rem]">
                                      {idx?.name}
                                    </p>
                                  </Link>
                                  <p className="desc mb-2 three_dot_2_line">
                                    {idx?.description}
                                  </p>
                                  <div className="right-info md:!flex md:!justify-start gap-[1rem] md:gap-0">
                                    <div className="stat !w-[150px]">
                                      <div>
                                        <p>Items</p>
                                        <h4>
                                          {idx?.itemCount < 100000
                                            ? parseInt(
                                                idx?.itemCount || 0
                                              ).toLocaleString(undefined)
                                            : "∞"}
                                        </h4>
                                      </div>
                                      <div>
                                        <p>Starting</p>
                                        <h4>{getSUIprice(idx)}</h4>
                                      </div>
                                    </div>
                                    {isDateGreater(
                                      getStartTime(idx),
                                      new Date().getTime()
                                    ) && (
                                      <div className="stat md:!ml-4 ">
                                        <span className="font-display font-semibold text-base !w-[150px]">
                                          Starts In:
                                        </span>
                                        <Items_Countdown_timer
                                          className="!w-[200px]"
                                          time={
                                            getStartTime(idx) -
                                            new Date().getTime()
                                          }
                                        />
                                      </div>
                                    )}
                                    {isDateGreater(
                                      getEndTime(idx),
                                      new Date().getTime()
                                    ) &&
                                      !isDateGreater(
                                        getStartTime(idx),
                                        new Date().getTime()
                                      ) && (
                                        <div className="stat md:!ml-4">
                                          <span className=" text-white font-display font-semibold !w-[100px]">
                                            Ends In:
                                          </span>
                                          <Items_Countdown_timer
                                            className="!w-[200px]"
                                            time={
                                              getEndTime(idx) -
                                              new Date().getTime()
                                            }
                                          />
                                        </div>
                                      )}
                                    {!isDateGreater(
                                      getEndTime(idx),
                                      new Date().getTime()
                                    ) && (
                                      <div className="stat md:!ml-4">
                                        <span className=" font-display font-semibold !w-[100px]">
                                          Event Ended
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="hidden lg:block">
                                <Link to="/mint-nft" className="">
                                  <button className="bg-white/[.25] backdrop-blur-[5.5px] py-4 px-8 text-base text-white hover:bg-accent font-semibold flex flex-row">
                                    <div className="pr-1.5">View Launch</div>{" "}
                                    <IconRightArrow />
                                  </button>
                                </Link>
                              </div>
                            </div>

                            {/* </div> */}
                          </div>
                        </section>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
            <div className="swiper-prev absolute !top-1/2 !z-10 -mt-6 lg:block hidden">
              <MdChevronLeft className="text-[3rem]" />
            </div>
            <div className="swiper-next absolute !top-1/2 !z-10 -mt-6 right-2 lg:block hidden">
              <MdChevronRight className="text-[3rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
