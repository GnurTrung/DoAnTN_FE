import { Helmet } from "react-helmet";

const Meta = ({ title, src }) => {
  return (
    <>
      <Helmet>
        <title>{title || "GnurT - NFT Marketplace"}</title>
        <link rel="GnurT NFT " href="https://marketplace.tocen.co/" />
        <meta content="GnurT NFT, NFT marketplace on SUI" name="og:title"></meta>
        <meta content="website" name="og:type"></meta>
        <meta content="https://marketplace.tocen.co/" name="og:url"></meta>
        <meta content="GnurT NFT Marketplace is a web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using GnurT today." name="og:description"></meta>
        <meta content="GnurT NFT Marketplace is a web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using GnurT today." name="description"></meta>
        <meta content="GnurT" name="og:site_name"></meta>
        <meta content="GnurT NFT, NFT marketplace on SUI" name="title"></meta>
        <meta content="GnurT" name="apple-mobile-web-app-title"></meta>
        <meta content="GnurT" name="application-name"></meta>
        {/* <meta
          content={src ? src : "https://marketplace.tocen.co/default_meta.jpg"}
          name="og:image"
        /> */}
        <meta name="og:description" content="GnurT NFT Marketplace is a Launchpad IDO INO IGO and web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using GnurT today." />
        <meta name="twitter:url" content="https://marketplace.tocen.co/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tocen" />
        <meta name="twitter:creator" content="@tocen" />
        <meta name="twitter:title" content="GnurT Launchpad and NFT Marketplace on Sui Blockchain" />
        <meta name="twitter:image" content="https://marketplace.tocen.co/default_meta.jpg" />
        <meta name="twitter:description" content="GnurT NFT Marketplace is a Launchpad IDO INO IGO and web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using GnurT today." />
      </Helmet>
    </>
  );
};
export default Meta;
