import { Banner, LaunchpadDrop } from "./Components";

import dataBanner from "assets/fake-data/data-banner";
import Meta from "components/Meta";
import Collection from "components/collection/Collection";
import Marquees from "./Components/Marquees";

const Home = () => {
  return (
    <>
      <Meta title="Home" />
      <div className="">
        <div id="page">
          <Marquees />
          {/* <SwapBanner /> */}
          <Banner data={dataBanner} />
          <LaunchpadDrop />
          <Collection />
          {/* <TopCollection /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
