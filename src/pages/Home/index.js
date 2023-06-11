import { Banner, LaunchpadDrop } from "./Components";

import dataBanner from "assets/fake-data/data-banner";
import Meta from "components/Meta";
import Marquees from "./Components/Marquees";
import Ranking from "pages/Ranking";

const Home = () => {
  return (
    <>
      <Meta title="Home" />
      <div className="">
        <div id="page">
          <Marquees />
          <Banner data={dataBanner} />
          <LaunchpadDrop />
          <Ranking />
        </div>
      </div>
    </>
  );
};

export default Home;
