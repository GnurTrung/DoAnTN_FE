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

import Loading from "components/loading";
import NotFound from "pages/NotFound";
import { useApplication } from "./contexts/useApplication";

function App() {

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

  const { showPopupWallet, onHidePopupWallet } =
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
      <Footer />
    </Suspense>
  );
}

export default App;
