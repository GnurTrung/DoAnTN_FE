import Image from "components/ProgressiveImage.js";
import { getLogoURL } from "helpers/url-helper";
import { useNftDetailContext } from "../context.js";
import Mintlist from "./Mintlist.js";
import Public from "./Public.js";
import Private from "./Private.js";
import ModalWaitingForSignature from "components/Modal/ModalWaitingForSignature.js";
import KeyHolder from "./keyHolder.js";
import { isDateGreater } from "utils/date-time.js";
import moment from "moment";
import IconInfo from "assets/icons/IconInfo.jsx";

const ItemINO = (data) => {
  const {
    showModalWaitingForSignature,
    onHideModalWaitingForSignature,
  } = useNftDetailContext();
  const attributes = data?.data?.attributes;
  const urlLogo = getLogoURL(attributes?.otherImages?.data[0]?.attributes?.url);
  const level = attributes?.level;

  const getUnixTime = (idx) => {
    return new Date(idx).getTime();
  };
  const arr = [
    { time: getUnixTime(attributes?.publicStartTime), component: <Public /> },
    {
      time: getUnixTime(attributes?.keyHolderStartTime),
      component: <KeyHolder />,
    },
    {
      time: getUnixTime(attributes?.whitelistStartTime),
      component: <Mintlist />,
    },
    { time: getUnixTime(attributes?.privateStartTime), component: <Private /> },
  ];

  const getStartTime = () => {
    try {
      const arr = [
        getUnixTime(attributes?.publicStartTime),
        getUnixTime(attributes?.keyHolderStartTime),
        getUnixTime(attributes?.whitelistStartTime),
        getUnixTime(attributes?.privateStartTime),
      ];
      const arrSort = arr.filter((x) => x != 0).sort();
      return arrSort[0];
    } catch (ex) {
      console.log(ex);
    }
  };

  const arrSort = arr
    .filter((x) => x.time != 0)
    .sort((a, b) => a.time - b.time);
  return (
    <div className="flex-col lg:flex-row flex" key={level}>
      <figure className="mb-8 lg:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto xxl:w-1/2 w-full">
        <button className=" w-full">
          <Image
            src={urlLogo}
            alt={"title"}
            className="rounded-2xl cursor-pointer w-full"
          />
        </button>
      </figure>

      <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem] mb-[2rem] lg:mb-0 !w-full pb-10">
        {!isDateGreater(new Date(getStartTime()), new Date().getTime()) && (
          <div className="flex items-center">
            <IconInfo />{" "}
            <span className="ml-1">{`Listing will be available in ${moment(
              attributes?.listingStartTime
            )
              .utc()
              .format("YYYY-MM-DD HH:mm:ss")} UTC`}</span>
          </div>
        )}
        {arrSort.map((item, index) => (
          <div key={index}>{item.component}</div>
        ))}
      </div>
      <ModalWaitingForSignature
        show={showModalWaitingForSignature}
        onHide={onHideModalWaitingForSignature}
      />
    </div>
  );
};

export default ItemINO;
