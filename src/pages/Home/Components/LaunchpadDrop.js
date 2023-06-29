import { A11y, Autoplay, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import Image from "components/ProgressiveImage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBanner } from "services/nfts";
import { dateTimeFormat } from "utils/date-time";
import suiToken from "../../../assets/images/token/sui.png";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import moment from "moment";

const Explore = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await getBanner();
    setData(res?.data || []);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data[0]?.whitelistStartTime);

  if (!data || data.length === 0) return <></>;
  return (
    <section className="tf-section tf-explore tf-filter tf-center mt-10 !p-0">
      <div className="tf-container">
        <div className="row ">
          <div className="col-md-12">
            <div className="tf-heading style-2 wow fadeInUp !justify-between flex">
              <h4 className="heading text-4xl font-semibold">
                Launchpad Drops
              </h4>
              <div className="load-more">
                <Link to="/mint-nft" className="hover:text-accent">
                  <button className="btn-secondary wow fadeInUp px-8">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="wow fadeInUp">
            <Swiper
              modules={[Navigation, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                730: {
                  slidesPerView: 2,
                },
                1068: {
                  slidesPerView: 3,
                },
                1397: {
                  slidesPerView: 4,
                },
              }}
              className="product-category"
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              navigation={{
                nextEl: ".launchpad-swiper-next",
                prevEl: ".launchpad-swiper-prev",
              }}
            >
              {(data || []).map((idx) => (
                <SwiperSlide key={idx.id}>
                  <div className="slider-item !rounded-2xl">
                    <div className="sc-product style1 border-none">
                      <Link to={`/ino/${idx?.code}`}>
                        <div className="features">
                          <div className="product-media !rounded-t-2xl">
                            <Image
                              src={idx?.logo}
                              alt="images"
                              className="h-[250px] w-full object-cover rounded-t-2xl !m-0"
                              wrapperClassName="w-full"
                            />
                          </div>
                        </div>
                      </Link>
                      <div className="bottom pb-2">
                        <div className="details-product !block px-[8px] !mb-[0.5rem]">
                          <Link
                            className="text-white hover:text-accent"
                            to={`/ino/${idx?.code}`}
                          >
                            <div className="block ml-2 text-[14px] font-semibold">
                              {idx?.name}
                            </div>
                          </Link>
                          <div className="flex justify-between items-center rounded-[8px] mx-2 bg-[#1B2333] p-[12px] mt-[10px] text-[12px] mb-5s">
                            <div className="flex ">
                              <div>Launching:</div>
                              <div className="flex font-display font-semibold text-white ml-1.5">{moment.unix(idx?.publicStartTime).format("DD/MM HH:mm")}</div>
                            </div>
                            <div className="text-[white] flex items-center gap-[0.3rem]">
                              <img
                                src={suiToken}
                                className="w-[16px] h-[16px]"
                                alt="images"
                              />
                              {`${
                                idx?.pricePublic == -1
                                  ? "TBA"
                                  : idx?.pricePublic || "--"
                              } SUI`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <!-- Slider Navigation --> */}
            <div className="launchpad-swiper-prev absolute !top-1/2 !z-10 -mt-6 -left-4 xxl:block hidden">
              <MdChevronLeft className="text-[3rem]" />
            </div>
            <div className="launchpad-swiper-next absolute !top-1/2 !z-10 -mt-6 -right-4 xxl:block hidden">
              <MdChevronRight className="text-[3rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
