import Meta from "components/Meta";
import Items from "./Components/Items";
import { Provider } from "./context";

Collection.propTypes = {};

function Collection(props) {
  return (
    <>
      <Meta title={"Explore"} />
      <div className="page-collection">
        <section className="tf-explore-sidebar">
          <div className="tf-container">
            <h4 className="font-display font-semibold text-4xl pt-10 text-white">
              Explore NFTs
            </h4>
            <h4 className="font-display font-medium text-lg pb-10">
            Buy and Sell NFTs on Sui Network.
            </h4>
            <Items />
          </div>
        </section>
      </div>
    </>
  );
}

const CollectionPage = (props) => (
  <Provider>
    <Collection {...props} />
  </Provider>
);

export default CollectionPage;
