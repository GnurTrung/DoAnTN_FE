import IconCube from "assets/icons/IconCube";
import IconRank from "assets/icons/IconRank";
import LogoTocenSmall from "assets/images/logo/logo_tocen_small.png";
import { NavLink } from "react-router-dom";
import cx from "classnames";

const mainUrl = process.env.REACT_APP_MAIN_URL;

const menus = [
  {
    id: 3,
    name: "Launchpad",
    links: `/mint-nft`,
    icon: (
      <img
        src={LogoTocenSmall}
        alt="Tocen"
        width={19}
        height={19}
        className="opacity-60"
      />
    ),
  },
  {
    id: 3,
    name: "NFT",
    links: `/`,
    icon: <IconCube />,
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
                { "opacity-100 bg-[#1B2333]": isActive }
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

export const subMenus = {
  marketplace: [
    {
      name: "Marketplace",
      href: "/",
    },
    {
      name: "Explore",
      href: "/explore",
    },
    {
      name: "Ranking",
      href: "/ranking",
    },
  ],
  launchpad: [
    {
      name: "INO",
      href: "/mint-nft",
      active: false,
    },
  ],
};

export default menus;
