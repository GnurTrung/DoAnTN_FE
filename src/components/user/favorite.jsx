import NoData from "components/NoData";
import FavoriteProductCard from "components/product-card/FavoriteProductCard";
import SkeletonLoadingGrid from "components/product-card/SkeletonLoadingGrid";
import { useContexts } from "pages/User/context";
import { Link } from "react-router-dom";

const Favorite = () => {
  const { favoriteNfts, loading } = useContexts();
  return (
    <div className="w-full grid grid-cols-5 gap-4 pt-4">
      {favoriteNfts.data.length
        ? favoriteNfts.data.map((nft, index) => (
            <Link to={`/nft/${nft?.nftId}`}>
              <FavoriteProductCard {...nft} key={index} />
            </Link>
          ))
        : !loading && (
            <div className="col-span-full mt-8">
              <NoData description="No NFTs" />
            </div>
          )}
      {loading && <SkeletonLoadingGrid />}
    </div>
  );
};

export default Favorite;
