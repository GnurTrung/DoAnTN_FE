import { WalletProvider } from "@suiet/wallet-kit";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.scss";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { Web3Provider } from "./contexts/useWeb3Context";
import ScrollToTop from "./ScrollToTop";
import { ApplicationProvider } from "contexts/useApplication";
import { WalletKitProvider } from "@mysten/wallet-kit";
import IconLCP from "components/IconLCP";

import SocketProvider from "contexts/useSocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter>
  <ErrorBoundary>
    <WalletKitProvider>
      <WalletProvider>
        <ApplicationProvider>
          <Web3Provider>
            <SocketProvider>
              <BrowserRouter>
                <ScrollToTop />
                <IconLCP />
                <App />
              </BrowserRouter>
            </SocketProvider>
          </Web3Provider>
        </ApplicationProvider>
      </WalletProvider>
    </WalletKitProvider>
  </ErrorBoundary>
  // </BrowserRouter>
);
