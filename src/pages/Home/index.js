import { Banner, LaunchpadDrop } from "./Components";
import Meta from "components/Meta";
import Ranking from "pages/Ranking";

const Home = () => {
  return (
    <>
      <Meta title="Home" />
      <div className="">
        <div id="page">
          <Banner />
          <LaunchpadDrop />
          <Ranking />
        </div>
      </div>
    </>
  );
};

export default Home;
