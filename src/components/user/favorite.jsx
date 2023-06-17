import NoData from "components/NoData";
import SkeletonLoadingGrid from "components/product-card/SkeletonLoadingGrid";
import { useContexts } from "pages/User/context";

const Favorite = () => {
  const { loading } = useContexts();
  return (
    <div className="w-full grid grid-cols-5 gap-4 pt-4">
      {!loading && (
        <div className="col-span-full mt-8">
          <NoData />
        </div>
      )}
      {loading && <SkeletonLoadingGrid />}
    </div>
  );
};

export default Favorite;
