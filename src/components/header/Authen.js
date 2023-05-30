import DrawerMenu from "components/DrawerMenu";
import { useDrawerMenu } from "hooks";
import { memo, useState } from "react";
import styles from "./Authen.module.css";
import DarkMode from "./DarkMode";
import DrawerAccountProfile from "./Drawer/DrawerAccountProfile";
import DefaultAvatar from "assets/images/avatar_default.png";

const Authen = () => {
  const { open, onClose, onOpen } = useDrawerMenu();
  const [contentDrawer, setContentDrawer] = useState("");

  return (
    <>
      <DrawerMenu open={open} onClose={onClose} title={contentDrawer}>
        {contentDrawer === "My Wallet" && open && (
          <DrawerAccountProfile onClose={onClose} />
        )}
      </DrawerMenu>
      <div className="header-right flex items-center space-x-4">
        <div
          onClick={() => {
            onOpen();
            setContentDrawer("My Wallet");
          }}
          className={`menu-item menu-item-has-children !w-[3.2rem] !h-[3.2rem] !ml-[0.5rem] md:!ml-[1rem] cursor-pointer ${styles.liMenu}`}
        >
          <img className="rounded-full" src={DefaultAvatar} alt="Avatar" />
        </div>
        <DarkMode />
      </div>
    </>
  );
};

export default memo(Authen);
