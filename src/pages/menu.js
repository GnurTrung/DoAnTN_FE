import IconCube from "assets/icons/IconCube";
import IconGlobalSearch from "assets/icons/IconGlobalSearch";
import IconRank from "assets/icons/IconRank";
import LogoTocenSmall from "assets/images/logo/logo_tocen_small.png";
import { toast } from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import cx from "classnames";

const mainUrl = process.env.REACT_APP_MAIN_URL;

const onClickComingSoon = () => {
  toast.success("Coming soon!");
};

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
    subMenu: [
      {
        key: "1",
        label: (
          <NavLink
            to="/mint-nft"
            className={({ isActive }) =>
              cx(
                "opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]",
                { "opacity-100 bg-[#2A294F]": isActive }
              )
            }
          >
            <span className="text-white font-semibold">INO</span>
          </NavLink>
        ),
      },
      {
        key: "2",
        label: (
          <NavLink
            to={`${mainUrl}/all-projects`}
            className={({ isActive }) =>
              cx(
                "opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]",
                { "opacity-100 bg-[#2A294F]": isActive }
              )
            }
          >
            <span className="text-white font-semibold">IDO</span>
          </NavLink>
        ),
      },
    ],
  },
  {
    id: 2,
    name: "Play",
    links: `${mainUrl}/gamehub`,
    icon: <IconRank />,
  },
  {
    id: 3,
    name: "Trade",
    onClick: onClickComingSoon,
    icon: <IconCube />,
    subMenu: [
      {
        key: "1",
        label: (
          <div
            onClick={onClickComingSoon}
            className="opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]"
          >
            <span className="text-white font-semibold">Swap</span>
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div
            onClick={onClickComingSoon}
            className="opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]"
          >
            <span className="text-white font-semibold">Liquidity</span>
          </div>
        ),
      },
      {
        key: "3",
        label: (
          <div
            onClick={onClickComingSoon}
            className="opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]"
          >
            <span className="text-white font-semibold">Bridge</span>
          </div>
        ),
      },
    ],
  },
  {
    id: 3,
    name: "Earn",
    links: `${mainUrl}/staking-key`,
    icon: <IconCube />,
    subMenu: [
      {
        key: "1",
        label: (
          <NavLink
            to={`${mainUrl}/staking-key`}
            className={({ isActive }) =>
              cx(
                "opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]",
                { "opacity-100 bg-[#2A294F]": isActive }
              )
            }
          >
            <span className="text-white font-semibold">Pools</span>
          </NavLink>
        ),
      },
      {
        key: "2",
        label: (
          <div
            onClick={onClickComingSoon}
            className="opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]"
          >
            <span className="text-white font-semibold">Vault</span>
          </div>
        ),
      },
    ],
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
                "opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]",
                { "opacity-100 bg-[#2A294F]": isActive }
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
                "opacity-60 hover:opacity-100 flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2A294F]",
                { "opacity-100 bg-[#2A294F]": isActive }
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
    {
      name: "IDO",
      href: `${mainUrl}/all-projects`,
      active: true,
    },
  ],
};

export default menus;
