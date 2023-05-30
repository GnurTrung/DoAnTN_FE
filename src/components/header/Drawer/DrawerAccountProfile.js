import { useWalletKit } from "@mysten/wallet-kit";
import { Button, Typography } from "antd";
import IconExpand from "assets/icons/drawer/IconExpand";
import { wallets } from "constants/wallets";
import { useProviderSigner } from "contexts";
import { useWeb3 } from "contexts/useWeb3Context";
import { Link } from "react-router-dom";
import { formatWallet, mystToSui, numberShortFormat } from "utils/wallet-utils";
import IconCrown from "../../../assets/icons/drawer/IconCrown";
import IconEye from "../../../assets/icons/drawer/IconEye";
import IconHeart from "../../../assets/icons/drawer/IconHeart";
import IconProfile from "../../../assets/icons/drawer/IconProfile";
import IconSetting from "../../../assets/icons/drawer/IconSetting";
import avt1 from "../../../assets/images/blog/author.jpg";
import DefaultAvatar from "assets/images/avatar_default.png";
import { useEffect } from "react";
import IconArrowSwap from "assets/icons/IconArrowSwap";
import { useApplication } from "contexts/useApplication";

const DrawerAccountProfile = ({ onClose }) => {
  const { Paragraph } = Typography;
  const { requestFaucet, getBalanceByAddress } = useProviderSigner();
  const { handleDisconnect, balance, account } = useWeb3();

  const { currentWallet, disconnect } = useWalletKit();

  const { onShowModalSwap } = useApplication();

  const walletData = wallets.find(
    (element) => element.name === currentWallet?.name
  );

  const handleLogout = async () => {
    await disconnect();
    await handleDisconnect();
  };
  useEffect(() => {
    getBalanceByAddress(account);
  }, []);
  return (
    <div>
      {/* Avatar and Button Disconnect */}
      <div className="flex justify-between">
        <div className="flex gap-[0.7rem]">
          <img
            src={DefaultAvatar}
            alt="Tocen - NFT Marketplace"
            className="rounded-full w-[48px] h-[48px]"
          />
          <div>
            <p className="text-[#BABAC7] font-[500]">Connected Address</p>
            <div className="flex">
              <div className="text-sm font-semibold font-display pt-1.5">
                {formatWallet(account)}
              </div>
              <Paragraph copyable={{ text: account }}></Paragraph>
            </div>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          className="btn-secondary px-[1.6rem] font-[600]"
        >
          Disconnect
        </Button>
      </div>
      {/* End Avatar and Button Disconnect */}
      <Button
        className="btn-primary w-full mt-5"
        onClick={() => requestFaucet(account)}
      >
        Faucet
      </Button>

      {/* Icon wallet */}
      <div className="">
        <div className="bg-[#323268] mt-[1.5rem] rounded-[18px] flex px-[20px] py-[15px] items-center gap-[8px]">
          <p className="font-[500]">Wallet: </p>
          <div className="w-[1.5rem]">
            <img src={walletData?.src} alt="img" className="w-full" />
          </div>
        </div>
      </div>
      {/* End Icon Wallet */}

      {/* select list */}
      <ul className="mt-[2rem] bg-[#2A294F] rounded-[18px]">
        <Link
          to={`/profile/${account}`}
          onClick={onClose}
          className="hover:text-white"
        >
          <li className="rounded-t-[18px] transition-all group hover:bg-[#323268] cursor-pointer px-[1.8rem] py-[1.3rem] border-b border-[#4E4D6E] border-solid font-[600] flex justify-between">
            <div className="flex gap-[0.5rem] items-center">
              <IconProfile />
              Profile
            </div>
            <IconExpand className="rotate-90 w-[18px]" />
          </li>
        </Link>
        <Link
          to={`/profile/${account}?tab=favorite`}
          onClick={onClose}
          className="hover:text-white"
        >
          <li className="cursor-pointer transition-all group hover:bg-[#323268] px-[1.8rem] py-[1.3rem] border-b border-[#4E4D6E] border-solid font-[600] flex justify-between">
            <div className="flex gap-[0.5rem] items-center">
              <IconHeart className="" />
              Favorite
            </div>
            <IconExpand className="rotate-90 w-[18px]" />
          </li>
        </Link>
        <Link
          to={`/profile/${account}?tab=watchlist`}
          onClick={onClose}
          className="hover:text-white"
        >
          <li className="transition-all hover:bg-[#323268] group cursor-pointer px-[1.8rem] py-[1.3rem] border-b border-[#4E4D6E] border-solid font-[600] flex justify-between">
            <div className="flex gap-[0.5rem] items-center">
              <IconEye />
              Watchlist
            </div>
            <IconExpand className="rotate-90 w-[18px]" />
          </li>
        </Link>
        <li className="transition-all hover:bg-[#323268] group cursor-pointer px-[1.8rem] py-[1.3rem] border-b border-[#4E4D6E] border-solid font-[600] flex justify-between">
          <div className="flex gap-[0.5rem] items-center">
            <IconCrown />
            VIP Status
          </div>
          <IconExpand className="rotate-90 w-[18px]" />
        </li>
        <Link to={`/portfolio`} onClick={onClose} className="hover:text-white">
          <li className="transition-all hover:bg-[#323268] group cursor-pointer px-[1.8rem] py-[1.3rem] border-b border-[#4E4D6E] border-solid font-[600] flex justify-between">
            <div className="flex gap-[0.5rem] items-center">
              <IconEye />
              Portfolio
            </div>
            <IconExpand className="rotate-90 w-[18px]" />
          </li>
        </Link>
        <Link
          to={`/verify-account/${account}`}
          onClick={onClose}
          className="hover:text-white"
        >
          <li className="rounded-b-[18px] transition-all group hover:bg-[#323268] cursor-pointer px-[1.8rem] py-[1.3rem] font-[600] flex justify-between">
            <div className="flex gap-[0.5rem] items-center">
              <IconSetting />
              Setting
            </div>
            <IconExpand className="rotate-90 w-[18px]" />
          </li>
        </Link>
      </ul>
      {/* End Select List */}

      {/* Funds in Wallet */}
      <div className="mt-[2rem]">
        <div className="flex items-center justify-between">
          <span className="text-[#BABAC7] font-[600]">Funds in wallet</span>
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => {
              onShowModalSwap();
              onClose();
            }}
          >
            <IconArrowSwap />
            <span className="font-medium text-[#D558FF] text-sm group-hover:underline">
              Swap $TOCE/SUI
            </span>
          </div>
        </div>
        <div className="bg-[#323268] mt-[1.5rem] rounded-[18px] flex flex-col p-[20px] justify-center items-center gap-[8px]">
          <p className="text-[#BABAC7] font-[500]">Total balance</p>
          <p className="text-[24px] font-[600]">
            {numberShortFormat(mystToSui(balance))} SUI
          </p>
        </div>
      </div>
      {/* 
        <div className="bg-[#2A294F] rounded-[18px] mt-[1.5rem]">
          <li className="rounded-t-[18px] ease-in-out duration-200 transition-all hover:bg-[#323268] cursor-pointer px-[1.8rem] py-[1.3rem] font-[600] flex justify-between">
            <div>
              <div className="flex items-center gap-[0.5rem]">
                <im
                  g
                  src={sui}
                  className="w-[1rem]"
                  alt="Tocen - NFT Marketplace"
                />
                SUI
              </div>
              <div className="text-[#BABAC7] font-[500] mt-[0.3rem]">
                $0.17
                <span className="ml-[0.5rem] font-[600] text-[#D558FF]">
                  +2.6%
                </span>
              </div>
            </div>
            <div className="flex gap-[1rem] items-center">
              <p className="font-[600]">0,00</p>
              <IconExpand className="rotate-90 w-[18px]" />
            </div>
          </li>
          <li className="rounded-b-[18px] ease-in-out duration-200 transition-all hover:bg-[#323268] cursor-pointer px-[1.8rem] py-[1.3rem] font-[600] flex justify-between">
            <div>
              <div className="flex items-center gap-[0.5rem]">
                <img src={tocen} alt="Tocen - NFT Marketplace" />
                Tocen
              </div>
              <div className="text-[#BABAC7] font-[500] mt-[0.3rem]">
                $0.17
                <span className="ml-[0.5rem] font-[600] text-[#D558FF]">
                  +2.6%
                </span>
              </div>
            </div>
            <div className="flex gap-[1rem] items-center">
              <p className="font-[600]">0,00</p>
              <IconExpand className="rotate-90 w-[18px]" />
            </div>
          </li>
        </div>
      </div> */}
      {/* End Funds in Wallet */}

      {/* Button */}
      {/* <button className="btn-primary w-full mt-[2rem]">Add Funds</button> */}
      {/* End Button */}
    </div>
  );
};

export default DrawerAccountProfile;
