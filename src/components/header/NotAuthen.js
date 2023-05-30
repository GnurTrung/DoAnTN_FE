import IconWallet from "assets/icons/IconWallet";
import { useApplication } from "contexts/useApplication";
import { memo } from "react";
import DarkMode from "./DarkMode";

const NotAuthen = () => {
  const { onShowPopupWallet, showPopupWallet, onHidePopupWallet } =
    useApplication();
  return (
    <>
      <div className="header-right !mr-[0] !ml-[0.6rem] md:!ml-[1rem]">
        <button
          className="btn-secondary md:flex-none px-0 md:w-auto w-12 rounded-full md:!px-[32px]"
          onClick={onShowPopupWallet}
        >
          <IconWallet className="!mr-0 md:!mr-[8px]" />{" "}
          <span className="hidden md:block">Connect</span>
        </button>
        <DarkMode />
      </div>
    </>
  );
};

export default memo(NotAuthen);
