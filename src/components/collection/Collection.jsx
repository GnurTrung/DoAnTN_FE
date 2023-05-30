import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { A11y, Autoplay, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import { getTrending } from "services/nfts";
import IconHeart from "assets/icons/IconHeart";
import { toast } from "react-hot-toast";

Collection.propTypes = {
  data: PropTypes.array,
};

function Collection(props) {
  const [itemData, setItemData] = useState([]);
  const getData = async () => {
    const res = await getTrending();
    setItemData(res?.data || []);
  };
  useEffect(() => {
    getData();
  }, []);
  if (!itemData || itemData.length === 0) return;
  return (
    <section className="tf-section tf-collection">
      <div className="tf-container">
        <div className="row">
          <div className="col-md-12">
            <div className="tf-heading style-2 wow fadeInUp !justify-between flex">
              <h4 className="heading text-4xl font-semibold">Trending Now</h4>
              {/* <div className="load-more">
                <Link to="/" className="hover:text-accent">
                  <button className="btn-secondary wow fadeInUp px-8 disabled">
                    Explore
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="collection-carousel wow fadeInUp">
              <Swiper
                modules={[Navigation, Scrollbar, A11y, Autoplay]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  563: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1300: {
                    slidesPerView: 4,
                  },
                }}
                className=" product-category-1 pt10"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
                loop={true}
                pagination
              >
                {itemData.slice(1, 10).map((idx) => (
                  <SwiperSlide key={idx?.id}>
                    <div className="slider-item" onClick={() => toast.success('Comming Soon!')}>
                      <div className="!p-[1.2rem] sc-product !border-none style1 collection !max-h-[550px]">
                        {/* <Link to="#"> */}
                        <div className="thumb-collection !max-h-[260px]">
                          <div className="left-thumb">
                            <img
                            className="aspect-square"
                              src={
                                idx?.attributes?.logo?.data
                                  ?.attributes?.url
                              }
                              alt="images"
                            />
                          </div>
                          <div className="right-thumb">
                            <div className="top-cl">
                              <img
                                className="aspect-video"
                                src={
                                  idx?.attributes?.miniImages?.data[0]
                                    ?.attributes?.url
                                }
                                alt="images"
                              />
                            </div>
                            <div className="bottom-cl">
                              <img
                                className="aspect-video"
                                src={
                                  idx?.attributes?.miniImages?.data[1]
                                    ?.attributes?.url
                                }
                                alt="images"
                              />
                            </div>
                          </div>
                        </div>
                        {/* </Link> */}
                        <div className="tf-author">
                          <div className="image">
                            <img
                              src={idx?.attributes?.logo?.data?.attributes?.url}
                              alt="Tocen"
                              className="rounded-full w-[44px] h-[44px] overflow-hidden object-cover inline-block"
                            />
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="fill-svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.94987 0.242313C5.88929 -0.127324 6.99031 0.916511 7.99984 0.916511C9.00936 0.916511 10.1104 -0.127329 11.0498 0.242306C11.1437 0.27926 11.2368 0.317871 11.329 0.358101C12.2539 0.761615 12.295 2.27725 13.0085 2.9908C13.7221 3.70438 15.2378 3.74531 15.6414 4.67026C15.6817 4.76261 15.7204 4.85583 15.7574 4.94989C16.127 5.8893 15.0832 6.99032 15.0832 7.99984C15.0832 9.00937 16.127 10.1104 15.7574 11.0498C15.7205 11.1436 15.6819 11.2366 15.6417 11.3287C15.2382 12.2538 13.7222 12.2947 13.0085 13.0083C12.2949 13.722 12.254 15.2381 11.3289 15.6416C11.2368 15.6818 11.1437 15.7204 11.0498 15.7574C10.1104 16.127 9.00938 15.0832 7.99986 15.0832C6.99033 15.0832 5.88932 16.127 4.9499 15.7574C4.85599 15.7204 4.76292 15.6818 4.67071 15.6416C3.7457 15.2381 3.70478 13.7221 2.99117 13.0085C2.27755 12.2949 0.761626 12.254 0.358081 11.329C0.317858 11.2368 0.279254 11.1437 0.242306 11.0498C-0.127328 10.1104 0.916511 9.00936 0.916511 7.99984C0.916511 6.99032 -0.127325 5.8893 0.242311 4.94988C0.279288 4.8559 0.317923 4.76276 0.35818 4.67049C0.761743 3.74551 2.27757 3.70458 2.99117 2.99098C3.70475 2.2774 3.74573 0.76162 4.6707 0.358091C4.7629 0.317867 4.85597 0.279262 4.94987 0.242313Z"
                                fill="#48BC65"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.0095 5.6464C12.11 5.74017 12.1665 5.86733 12.1665 5.99991C12.1665 6.1325 12.11 6.25966 12.0095 6.35343L7.71997 10.3536C7.61942 10.4473 7.48306 10.5 7.34088 10.5C7.1987 10.5 7.06234 10.4473 6.96179 10.3536L4.81702 8.35351C4.71935 8.25921 4.6653 8.1329 4.66652 8.0018C4.66775 7.8707 4.72414 7.74528 4.82355 7.65258C4.92297 7.55987 5.05745 7.50728 5.19804 7.50614C5.33863 7.505 5.47407 7.5554 5.5752 7.64648L7.34088 9.29305L11.2513 5.6464C11.3519 5.55266 11.4882 5.5 11.6304 5.5C11.7726 5.5 11.909 5.55266 12.0095 5.6464Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <Link to="#" className="name hover:text-accent text-[14px]">
                              {idx?.attributes?.name}
                            </Link>
                          </div>
                          <div className="top" style={{ borderTop: 0 }}>
                            <div className="flex flex-row items-center">
                              <IconHeart />
                              <span className="ml-1">100</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between bg-[#2A294F] p-[12px] rounded-[8px] text-[12px]">
                          <div>
                            <p>Items</p>
                            <p className="text-white">
                              {parseInt(
                                idx?.attributes?.collectionInfo?.itemCount || 0
                              ).toLocaleString(undefined)}
                            </p>
                          </div>
                          <div>
                            <p>Floor</p>
                            <p className="text-white">
                              {parseInt(
                                idx?.attributes?.collectionInfo?.floorPrice || 0
                              ).toLocaleString(undefined)}
                            </p>
                          </div>
                          <div>
                            <p>Volume</p>
                            <p className="text-white">
                              {parseInt(
                                idx?.attributes?.collectionInfo?.volume
                              ).toLocaleString(undefined)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Collection;
