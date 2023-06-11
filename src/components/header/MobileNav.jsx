import { Dropdown } from "antd";
import IconGallery from "assets/icons/IconGallery";
import IconGalleryActive from "assets/icons/IconGalleryActive";

import IconRocket from "assets/icons/IconRocket";
import IconRocketActive from "assets/icons/IconRocketActive";
import IconShop from "assets/icons/IconShop";
import IconShopActive from "assets/icons/IconShopActive";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import cx from "classnames";

const MobileNav = () => {
  const onClickComingSoon = () => {
    toast.success("Coming soon!");
  };
  const links = [
    {
      name: "Launchpad",
      href: "/mint-nft",
      icon: <IconRocket />,
      activeIcon: <IconRocketActive />,
    },
    {
      name: "NFT",
      href: "/",
      icon: <IconGallery />,
      activeIcon: <IconGalleryActive />,
      subMenu: [
        {
          key: "1",
          label: (
            <NavLink
              to="/"
              className={({ isActive }) =>
                cx(
                  "opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#1B2333]",
                  { "opacity-100 bg-[#1B2333]": isActive }
                )
              }
            >
              <span className="text-white font-semibold">Marketplace</span>
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                cx(
                  "opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#1B2333]",
                  { "opacity-100 bg-[#1B2333]": isActive }
                )
              }
            >
              <span className="text-white font-semibold">Explore</span>
            </NavLink>
          ),
        },
        {
          key: "3",
          label: (
            <NavLink
              to="/ranking"
              className={({ isActive }) =>
                cx(
                  "opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]",
                  { "opacity-100 bg-[#2A294F]": isActive }
                )
              }
            >
              <span className="text-white font-semibold">Ranking</span>
            </NavLink>
          ),
        },
      ],
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#131924] text-[#9998AC] text-xs font-semibold px-4 block lg:hidden border-t border-[#4E4D6E] border-solid">
      <div className="flex justify-evenly items-center">
        {links.map((link, index) =>
          link.subMenu ? (
            <Dropdown
              menu={{ items: link.subMenu || null }}
              trigger={["click"]}
              placement="topLeft"
              overlayClassName="w-[80%]"
              key={index}
            >
              <NavLink to={link.href} key={index}>
                <div className="flex flex-col items-center py-4">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
              </NavLink>
            </Dropdown>
          ) : (
            <NavLink to={link.href} key={index}>
              <div className="flex flex-col items-center">
                {link.icon}
                <span>{link.name}</span>
              </div>
            </NavLink>
          )
        )}
      </div>
    </div>
  );
};

export default MobileNav;
