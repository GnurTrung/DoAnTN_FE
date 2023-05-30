import { Menu } from "antd";
import IconClockHistory from "assets/icons/IconClockHistory";
import IconColorGallery from "assets/icons/IconColorGallery";
import IconGameBox from "assets/icons/IconGameBox";
import IconInvestment from "assets/icons/IconInvestment";
import IconOverview from "assets/icons/IconOverview";
import IconReward from "assets/icons/IconReward";
import CartModal from "components/layouts/CardModal";

const ModalMyWallet = ({ open, onCancel }) => {
  const menus = [
    {
      key: "overview",
      icon: <IconOverview />,
      label: "Overview",
    },
    {
      key: "token",
      icon: <IconInvestment />,
      label: "Investment",
    },
    {
      key: "nfts",
      icon: <IconColorGallery />,
      label: "NFTs",
    },
    {
      key: "games",
      icon: <IconGameBox />,
      label: "Games",
    },
    {
      key: "reward",
      icon: <IconReward />,
      label: "Rewards",
    },
    {
      key: "history",
      icon: <IconClockHistory />,
      label: "History",
    },
  ];

  return (
    <CartModal
      open={open}
      onCancel={onCancel}
      destroyOnClose={true}
      title="Portfolio Tracker"
      width="90%"
      className="h-[80%] max-w-[1440px]"
    >
      <div className="w-full h-full grid grid-cols-5 bg-[#181735]">
        <div className="col-span-1 p-5 bg-[#1F1D43] rounded-bl-2xl">
          <Menu
            items={menus}
            className="custom-menu bg-[#1F1D43] rounded-bl-2xl"
          />
        </div>
        <div className="p-5"></div>
      </div>
    </CartModal>
  );
};

export default ModalMyWallet;
