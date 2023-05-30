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

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import SocketProvider from "contexts/useSocketContext";

try {
  if (process.env.NODE_ENV != "development") {
    // Sentry.init({
    //     dsn: "https://dfd8e29291d746818724692b373a50ba@sentry.tool.ftech.ai/77",
    //     integrations: [new Integrations.BrowserTracing()],
    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    // });
  }
} catch (ex) {
  console.log(ex);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter>
  <ErrorBoundary>
    <WalletKitProvider>
      <WalletProvider>
        <ApplicationProvider>
          <Web3Provider>
            <SocketProvider>
              <BrowserRouter basename="/marketplace">
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
