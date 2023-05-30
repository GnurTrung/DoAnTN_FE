import React from "react";
import NoDataImg from "assets/images/no-data.png";

const NoData = ({ description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center text-[18px] font-semibold h-full w-full justify-center">
        <img src={NoDataImg} alt="no data" />
        <p className="text-white">{description}</p>
      </div>
      <span className="text-white">No data</span>
    </div>
  );
};

export default NoData;
