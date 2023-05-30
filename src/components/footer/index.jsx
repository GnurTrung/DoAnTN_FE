import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo/logo_tocen.png";
import logodark from "../../assets/images/logo/logo_tocen_dark.png";

import "./styles.scss";
import IconTwitter from "assets/icons/IconTwitter";
import IconDiscord from "assets/icons/IconDiscord";
import IconMedium from "assets/icons/IconMedium";
import IconTelegram from "assets/icons/IconTeleram";

function Footer(props) {
  const [productLink] = useState([
    {
      title: "Spot",
      path: "/spot",
    },
    {
      title: "Inverse Perpetual",
      path: "#",
    },
    {
      title: "USDT Perpetual",
      path: "#",
    },
    {
      title: "Exchange",
      path: "#",
    },
    {
      title: "Launchpad",
      path: "#",
    },
    {
      title: "Binance Pay",
      path: "#",
    },
  ]);
  const [servicesLink] = useState([
    {
      title: "Buy Crypto",
      path: "#",
    },
    {
      title: "Markets",
      path: "#",
    },
    {
      title: "Tranding Fee",
      path: "#",
    },
    {
      title: "Affiliate Program",
      path: "#",
    },
    {
      title: "Referral Program",
      path: "#",
    },
    {
      title: "API",
      path: "#",
    },
  ]);

  const [listSocial] = useState([
    {
      icon: <IconTwitter width={40} height={40} />,
      path: "https://twitter.com/tocen__",
    },
    {
      icon: <IconDiscord width={40} height={40} />,
      path: "https://discord.com/invite/DTsJYer7p2",
    },
    {
      icon: <IconMedium width={40} height={40} />,
      path: "https://medium.com/@tocen__",
    },
    {
      icon: <IconTelegram width={40} height={40} />,
      path: "https://t.me/tocen_launchpad",
    },
  ]);

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="footer">
      <div className="tf-container">
        <div className="flex !justify-start lg:justify-evenly flex-wrap">
          <div className="widget widget-infor">
            <div className="logo">
              <img
                id="logo_footer"
                className="logo-dark"
                src={logodark}
                alt="Tocen"
                height={77}
              />
              <img
                id="logo_footer"
                className="logo-light"
                src={logo}
                alt="Tocen"
                height={77}
              />
            </div>
            <p className="content">
              Tocen nurtures and accelerates top-tier Sui blockchain projects as
              a community-driven incubator
            </p>
            <ul className="social-item !mb-[15px]">
              <li>
                <a
                  href="https://twitter.com/tocen__"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconTwitter width={40} height={40} />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com/invite/DTsJYer7p2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconDiscord width={40} height={40} />
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@tocen__"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconMedium width={40} height={40} />
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/tocen_launchpad"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconTelegram width={40} height={40} />
                </a>
              </li>
            </ul>
            <p className="copy-right">© 2023 Tocen</p>
          </div>
          <div className="widget widget-menu mt-[2.5rem]">
            <div className="menu menu-1 !ml-0">
              <h6 className="widget-title">Support</h6>
              <ul>
                <li>
                  <Link
                    to="https://linktr.ee/tocen"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="hover:text-accent text-[#a1b0cc] cursor-pointer">
                      Contact Us
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://assets.tocen.co/tocen/docs/Terms-of-service.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="hover:text-accent text-[#a1b0cc] cursor-pointer">
                      Terms & Condition
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://assets.tocen.co/tocen/docs/privacy-policy.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="hover:text-accent text-[#a1b0cc] cursor-pointer">
                      Privacy
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu menu-2">
              <h6 className="widget-title">About</h6>
              <ul>
                <li>
                  <Link
                    to="https://tocen.gitbook.io/tocen-launchpad/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="hover:text-accent text-[#a1b0cc] cursor-pointer">
                      Documentation
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* {isVisible && (
        <Link
          onClick={scrollToTop}
          to="#"
          id="scroll-top"
          className="!hidden md:!block"
        ></Link>
      )} */}
    </footer>
  );
}

export default Footer;
