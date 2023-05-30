import { useWalletKit } from "@mysten/wallet-kit";
import { useWallet } from "@suiet/wallet-kit";
import { useApplication } from "contexts/useApplication";
import { wallets } from "../../../constants/wallets";
import { useWeb3 } from "../../../contexts/useWeb3Context";

const DrawerWallet = () => {
  const { onHidePopupWallet } = useApplication();
  const { handleConnect } = useWeb3();
  const { allAvailableWallets } = useWallet();
  const { connect } = useWalletKit();
  const onConnect = async (x) => {
    const isWalletInstalled = allAvailableWallets.find(
      (wallet) => x.name === wallet.name
    );
    if (!isWalletInstalled) {
      window.open(x.ext, "_blank");
      return;
    }
    await connect(x.name);
    onHidePopupWallet();
  };
  const renderWallet = () => {
    const ui = wallets.map((x) => {
      return (
        <li
          className="group transition-all h-[60px] bg-[#2A294F] px-[20px] py-[12px] cursor-pointer rounded-[16px] flex items-center gap-[1.2rem]"
          key={x.tag}
          onClick={() => onConnect(x)}
        >
          <img
            src={x.src}
            alt="Tocen - NFT Marketplace"
            className="w-[30px] h-[30px]"
          />
          <div className="group-hover:text-white transition-all text-[14px] font-[600] text-[#CBD4E6]">
            {x.name}
          </div>
        </li>
      );
    });
    return ui;
  };
  return (
    <div className="">
      <ul className="flex flex-col gap-[1rem]">{renderWallet()}</ul>
      {/* 
      <div className="flex w-full justify-end mt-[1.5rem]">
        <button className="btn-primary px-[2.3rem]">Get a Wallet</button>
      </div> */}
    </div>
  );
};

export default DrawerWallet;
