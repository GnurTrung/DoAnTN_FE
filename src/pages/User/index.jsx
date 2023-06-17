import { Button, Tooltip, Typography } from "antd";
import IconEdit from "assets/icons/IconEdit";
import IconTwitter from "assets/icons/IconTwitter";
import Meta from "components/Meta";
import CardModal from "components/layouts/CardModal";
import {
  Items,
  OffersMade,
  OffersReceive,
} from "components/user";
import Favorite from "components/user/favorite";
import { useWeb3 } from "contexts/useWeb3Context";
import { useRedirect } from "hooks";
import { useState } from "react";
import { TwitterShareButton } from "react-share";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { formatWallet } from "utils/wallet-utils";
import DefaultAvatar from "../../assets/images/author/default-avatar.png";
import { Provider, useContexts } from "./context";
import { toast } from "react-hot-toast";
const { Paragraph } = Typography;

Collection.propTypes = {};

function Collection() {
  const { userNFT, id, onSelectTab, tab } = useContexts();
  const { modalShow, setModalShow } = useState([]);
  const { account } = useWeb3();
  const { redirectToPage } = useRedirect();

  return (
    <>
      <Meta title={userNFT?.name} src={userNFT?.logo || DefaultAvatar} />
      <div className="page-collection">
        <section className="tf-container mb-[32px]">
          <div className="general-info !flex lg:!items-end flex-col items-start lg:flex-row">
            <div className="left-info !top-0 mt-24">
              <div className="collection-info">
                <img
                  src={userNFT?.logo || DefaultAvatar}
                  className="avatar !w-[120px] !h-[120px] sm:!w-[133px] sm:!h-[133px]"
                  alt="avatar"
                />
                <div className="social">
                  <p className="!text-4xl sm:!text-6xl !font-display !font-semibold text-white">
                    Tocener
                  </p>
                  <h3>{userNFT?.name}</h3>
                  <div className="media flex">
                    <Tooltip title={id}>
                      <div className="text-lg pt-0.5 font-display font-semibold text-[#BABAC7]">
                        {formatWallet(id)}
                      </div>
                    </Tooltip>
                    <Paragraph
                      copyable={{ text: id }}
                      style={{ color: "white" }}
                    ></Paragraph>
                  </div>
                </div>
              </div>
            </div>
            <div className="!flex !items-center space-x-4">
              <div className="btn-loadmore wow fadeInUp flex items-center">
                <TwitterShareButton
                  url={window.location.href}
                  title={`Tocen NFT Marketplace Profile`}
                >
                  <Button className="btn-secondary">
                    <IconTwitter className="mr-2" />
                    <span>Share on Twitter</span>
                  </Button>
                </TwitterShareButton>
              </div>
              <div className="btn-loadmore wow fadeInUp">
                <Button
                  className="btn-secondary w-[170px] sm:w-[188px]"
                  onClick={() => {
                    toast.success("Coming soon!");
                  }}
                >
                  <IconEdit className="mr-2" />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="tf-explore-sidebar">
          <div className="tf-container">
            <Tabs className="tf-tab" onSelect={onSelectTab} selectedIndex={tab}>
              <TabList className="menu-tab overflow-x-auto profile_tab flex">
                <Tab
                  className="tab-title xl:!px-[50px] lg:!px-[2rem] !px-[1rem] !mr-0"
                  true
                >
                  <span>Items</span>
                </Tab>
                <Tab className="tab-title xl:!px-[50px] lg:!px-[2rem] !px-[1rem] !mr-0">
                  <span>Offers Made</span>
                </Tab>
                <Tab className="tab-title xl:!px-[50px] lg:!px-[2rem] !px-[1rem] !mr-0">
                  <span>Offers Received</span>
                </Tab>
                {account === id ? (
                  <>
                    <Tab className="tab-title xl:!px-[50px] lg:!px-[2rem] !px-[1rem] !mr-0">
                      <span>Favorite</span>
                    </Tab>
                  </>
                ) : null}
              </TabList>
              <TabPanel>
                <Items />
              </TabPanel>
              <TabPanel>
                <OffersMade />
              </TabPanel>
              <TabPanel>
                <OffersReceive />
              </TabPanel>
              {account === id ? (
                <>
                  <TabPanel>
                    <Favorite />
                  </TabPanel>
                </>
              ) : null}
            </Tabs>
          </div>

          <CardModal show={modalShow} onHide={() => setModalShow(false)} />
        </section>
      </div>
    </>
  );
}

const ProfilePage = (props) => (
  <Provider>
    <Collection {...props} />
  </Provider>
);

export default ProfilePage;
