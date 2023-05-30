import AOS from "aos";
import { Suspense, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";

import routes from "./pages";
// import 'reactjs-popup/dist/index.css';
import "antd/dist/reset.css";
import "assets/shortcodes.css";
import "assets/style.css";
import { DrawerMenu } from "components";
import DrawerWallet from "components/header/Drawer/DrawerWallet";
import { Toaster } from "react-hot-toast";
import "../src/assets/binasea.css";
import "../src/assets/font-awesome.css";

import IconPortfolio from "assets/icons/IconPortforlio";
import Loading from "components/loading";
import { FULLNODE } from "constants/wallets";
import NotFound from "pages/NotFound";
import { useApplication } from "./contexts/useApplication";

function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(
          process.env.REACT_APP_API_URL + "/get-chain-url?v=1"
        );
        const response = await data.json();

        const rpcs = response.data;
        const randomRPC = rpcs[Math.floor(Math.random() * rpcs.length)];
        if (randomRPC) {
          sessionStorage.setItem(FULLNODE, randomRPC);
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        // isRuning = false
      }
    };
    getData();
    let timer = setInterval(() => {
      getData();
    }, 30000);
    return () => timer && clearInterval(timer);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV != "development") {
      console.info = function () {};
      console.warn = function () {};
      console.error = function () {};
      console.log = function () {};
    }
    AOS.init({
      duration: 2000,
    });
  }, []);

  const { showPopupWallet, onHidePopupWallet, showModalSwap, onHideModalSwap } =
    useApplication();

  return (
    <Suspense fallback={<Loading className={"mt-20"} />}>
      <Header />
      <Toaster />
      <DrawerMenu
        open={showPopupWallet}
        onClose={onHidePopupWallet}
        title={"Connect your wallet"}
      >
        <DrawerWallet />
      </DrawerMenu>
      <Routes>
        {routes.map((data, idx) => (
          <Route key={idx} path={data.path} element={data.component} exact />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Link
        to="/portfolio"
        className="fixed right-0 bottom-10 z-50 cursor-pointer animate-fly"
      >
        <IconPortfolio />
      </Link>
      <Footer />
    </Suspense>
  );
}

export default App;
