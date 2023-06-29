import CustomTable from "components/table";
import React from "react";
import { prizeColumn, sharingProgramColumn } from "./column";
import IconGold from "assets/icons/IconGold";
import IconSilver from "assets/icons/IconSilver";
import IconBronze from "assets/icons/IconBronze";
import { useNftDetailContext } from "pages/INO-Item/context";
import moment from "moment";
import { useWeb3 } from "contexts/useWeb3Context";
import { Button } from "antd";

const SharingProgram = () => {
  const { account } = useWeb3();
  const { nftData, rankingData, loadMore } = useNftDetailContext();
  const prizeTime = nftData?.attributes?.splittingPrizeTime || "";
  const prizePool = nftData?.attributes?.totalPrize || "0";

  const prizeData = [
    {
      rank: "1 - 5",
      tier: (
        <div className="flex items-center space-x-2">
          <IconGold /> <span>Gold</span>
        </div>
      ),
      prize: "25%",
    },
    {
      rank: "6 - 20",
      tier: (
        <div className="flex items-center space-x-2">
          <IconSilver /> <span>Silver</span>
        </div>
      ),
      prize: "35%",
    },
    {
      rank: "21-50",
      tier: (
        <div className="flex items-center space-x-2">
          <IconBronze /> <span>Bronze</span>
        </div>
      ),
      prize: "40%",
    },
  ];

  const mappedData = rankingData?.data?.map((item, i) => ({
    ...item,
    index: i + 1,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 pb-5 gap-y-5">
      <div className="col-span-1 lg:col-span-4 xxl:col-span-5 flex flex-col space-y-5">
        {/* <div className="bg-[#131924] rounded-2xl p-5">
          <h3 className="text-white text-xl font-semibold leading-8">
            Leaderboard
          </h3>
        </div> */}
        <div className="bg-[#131924] rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <h3 className="text-white text-xl font-semibold leading-8">
                Share to earn!
              </h3>
              <span className="text-sm font-medium leading-5 text-[#BABAC7]">
                {`Splitting on ${moment(prizeTime).format(
                  "DD/MM/YYYY, HH:mm"
                )} UTC`}
              </span>
            </div>
            <div className="bg-[#1B2333] flex flex-col items-center justify-center space-y-1 py-4 w-52 rounded-2xl">
              <span className="text-sm font-medium leading-5 text-[#BABAC7]">
                Total Prizes
              </span>
              <span className="text-white text-xl font-semibold leading-8">
                {`${parseInt(prizePool).toLocaleString(undefined)} SUI`}
              </span>
            </div>
          </div>
          <CustomTable columns={prizeColumn} dataSource={prizeData} />
        </div>
      </div>
      <div className="col-span-1 lg:col-span-6 xxl:col-span-5 md:pl-0 lg:pl-[3.75rem]">
        <div className="bg-[#131924] rounded-2xl p-5">
          <h3 className="text-white text-xl font-semibold leading-8">
            GnurT Sharing Program
          </h3>
          <div className="flex flex-col items-end">
            <CustomTable
              columns={sharingProgramColumn(account)}
              dataSource={mappedData}
              scroll={{ y: 610, x: "max-content" }}
            />
            {rankingData.hasNextPage && (
              <Button className="btn-secondary mt-4" onClick={loadMore}>
                View More
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharingProgram;
