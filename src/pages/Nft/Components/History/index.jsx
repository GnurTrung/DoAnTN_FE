import CustomTable from "components/table";
import { useNftDetailContext } from "pages/Nft/context";
import React from "react";
import { nftActivityColumn } from "./column";

const History = () => {
  const { activity } = useNftDetailContext();
  return (
    <div className="w-full">
      <CustomTable
        columns={nftActivityColumn()}
        dataSource={activity.data}
        scroll={{ y: 400, x: 500 }}
      />
    </div>
  );
};

export default History;
