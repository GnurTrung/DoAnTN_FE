import Loading from "components/loading";
import { useContexts } from "pages/User/context";
import React from "react";
import NoData from "components/NoData";

const OffersReceive = () => {
  const { loading } = useContexts();

  return (
    <>
      <div className="flex flex-col justify-start items-center pt-4">
        <div className="w-full">
          {
            <div className="mt-16">
              <NoData />
            </div>
          }
          {loading && (
            <div className="my-32">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default OffersReceive;
