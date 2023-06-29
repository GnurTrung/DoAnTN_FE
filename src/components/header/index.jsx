import { useEffect, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";
import menus, { subMenus } from "../../pages/menu";

import logoMobile from "../../assets/images/logo/logo_mb.png";
import logodark from "../../assets/images/logo/logo_gnurt.png";
import "./styles.scss";

import { useWeb3 } from "../../contexts/useWeb3Context";
import Authen from "./Authen";
import NotAuthen from "./NotAuthen";

import { Dropdown } from "antd";
import cx from "classnames";
import { useDrawerMenu } from "hooks";
import MobileNav from "./MobileNav";
import SearchHeader from "./SearchHeader";


const Header = () => {
  const { account } = useWeb3();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 150);
    });
    return () => {
      setScroll({});
    };
  }, []);
  const location = useLocation();
  const router = location.pathname.replace("/", "");
  const [menuActive, setMenuActive] = useState(null);
  const [subMenuState, setSubMenuState] = useState(subMenus.marketplace);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (location.pathname === "/mint-nft") setSubMenuState(subMenus.launchpad);
    else setSubMenuState(subMenus.marketplace);
  }, [location.pathname]);

  const { open, onClose, onOpen } = useDrawerMenu();

  const isActive = (link) => {
    console.log(link, location.pathname.includes(link));
    if (
      link?.startsWith("/") &&
      link !== "/" &&
      location.pathname.includes(link)
    )
      return true;
    if (location.pathname === "/" && location.pathname === link) return true;
    return false;
  };

  return (
    <header
      className={`!z-[999] ${
        scroll ? "sticky top-0 !bg-[#131924]" : "!bg-[#131924]"
      }`}
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-md-12">
            <div
              className={`flex items-center justify-between py-[0.2rem] lg:h-[5rem]`}
            >
              <div className="flex justify-start items-center">
                <div
                  id="site-logo"
                  className="clearfix !py-[0] sm:min-w-[180px]"
                >
                  <div id="site-logo-inner" className="sm:w-[111px]">
                    <Link to="/" rel="home" className="main-logo">
                      <img
                        id="logo_header"
                        className={`logo-dark w-[7rem] py-[0.8rem] !hidden sm:!block`}
                        src={logodark}
                        alt="GnurT"
                      />
                      {/* <img
                      id="logo_header"
                      className="logo-light"
                      src={logo}
                      alt="GnurT"
                    /> */}
                      <img
                        id="logo_header"
                        className={`logo-dark sm:!hidden w-[2.1rem] py-[1rem] block`}
                        src={logoMobile}
                        alt="GnurT"
                      />
                    </Link>
                  </div>
                </div>
                {!showSearch && (
                  <div className="header-center">
                    <nav
                      id="main-nav"
                      className={`main-nav !mt-[4.5rem] lg:!mt-[0rem] !w-full !bg-[#131924] ${
                        menuActive ? "active " : ""
                      } !h-screen lg:!h-[unset]`}
                    >
                      
                      <ul id="menu-primary-menu" className="menu">
                        {menus.map((data, idx) =>
                          data.subMenu ? (
                            <Dropdown
                              menu={{ items: data.subMenu || [] }}
                              placement="bottomRight"
                              key={idx}
                            >
                              <li
                               
                                className={`menu-item !px-4 ${
                                  menuActive && "hover:bg-[#364055]"
                                }`}
                              >
                                <NavLink
                                  className={({ isActive }) =>
                                    (isActive && data.links) ||
                                    (data.name == "NFT" &&
                                      (router == "ranking" ||
                                        router == "explore" ||
                                        (data.name == "Explore" &&
                                          router.includes("nft"))))
                                      ? "!text-white !font-[600] !text-[16px] hover:!text-white "
                                      : "!text-[#9998AC] !font-[600] !text-[16px] hover:!text-white "
                                  }
                                  {...(data.links && { to: data.links })}
                                  {...(data.onClick && {
                                    onClick: data.onClick,
                                  })}
                                  {...(data.target && { target: data.target })}
                                >
                                  <div className="flex items-center space-x-2">
                                    {menuActive && data.icon}{" "}
                                    <span>{data.name}</span>
                                  </div>
                                </NavLink>
                              </li>
                            </Dropdown>
                          ) : (
                            <li
                              key={idx}
                              className={`menu-item !px-[15px] ${
                                menuActive && "hover:bg-[#364055]"
                              }`}
                            >
                              <NavLink
                                className={({ isActive }) =>
                                  isActive && data.links
                                    ? "!text-white !font-[600] !text-[16px] hover:!text-white "
                                    : "!text-[#9998AC] !font-[600] !text-[16px] hover:!text-white "
                                }
                                {...(data.links && { to: data.links })}
                                {...(data.onClick && { onClick: data.onClick })}
                                {...(data.target && { target: data.target })}
                              >
                                <div className="flex items-center space-x-2">
                                  {menuActive && data.icon}{" "}
                                  <span>{data.name}</span>
                                </div>
                              </NavLink>
                            </li>
                          )
                        )}
                      </ul>
                    </nav>
                  </div>
                )}
              </div>

              <div
                className={cx("flex items-center justify-end", {
                  "flex-1": showSearch,
                })}
              >
                <div className="flex flex-1 justify-end">
                  <SearchHeader
                    setShowSearch={setShowSearch}
                    showSearch={showSearch}
                  />
                </div>
                {account ? <Authen /> : <NotAuthen />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center border-t border-[#4E4D6E] border-solid">
        {subMenuState.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.href}
            className={({ isActive }) =>
              cx(
                "py-2 px-4 w-32 flex justify-center hover:text-white active:text-white focus:text-white",
                {
                  "border-b-2 border-[#8358FF] border-solid text-white":
                    isActive ||
                    (menu.name == "Explore" && router.includes("nft")),
                  "text-[#9998AC]": !isActive,
                }
              )
            }
          >
            <span className="font-semibold">{menu.name}</span>
          </NavLink>
        ))}
      </div>
      <MobileNav />
    </header>
  );
};

export default Header;
