import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Collection = lazy(() => import("./Collection"));
const CollectionPage = lazy(() => import("./ExploreNFT"));
const INO = lazy(() => import("./INO"));
const INODetailPage = lazy(() => import("./INO-Item"));
const NftDetail = lazy(() => import("./Nft"));
const ProfilePage = lazy(() => import("./User"));

const routes = [
  { path: "/", component: <Home /> },
  { path: "/collection/:id", component: <Collection /> },
  { path: "/nft/:id", component: <NftDetail /> },
  { path: "/ino/:id", component: <INODetailPage /> },
  { path: "/profile/:id", component: <ProfilePage /> },
  { path: "/mint-nft", component: <INO /> },
  { path: "/explore", component: <CollectionPage /> },
];

export default routes;
