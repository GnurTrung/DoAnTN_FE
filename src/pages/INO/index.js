import Meta from "components/Meta";
import { Active, Released, Upcoming } from "./Components";
import { Banner } from "pages/Home/Components";
import { Provider, useContexts } from "./Context";

const INOImpl = () => {

  const { categories, activeID, setActiveID } = useContexts();
 
  const renderMenu = () => {
    return categories.map(item => (
      <li className="my-1 mr-2.5" key={item.id} onClick={() => setActiveID(item.id)}>
        <button>
          <div
            className={
              (item.id != activeID) ? 'bg-[#1B2333] text-[#BABAC7] hover:bg-[#364055] flex items-center w-full rounded-full border h-10 px-8 dark:border-transparent global-title font-semibold text-base'
                : 'group bg-accent global-title flex h-10 items-center rounded-full px-8 text-white font-semibold text-base'
            }
          >
            <span>{item.text}</span>
          </div>
        </button>
      </li>
    ))
  }
  return (
    <>
      <Meta title={"GnurT - NFT Marketplace INO"} />
      <div className="pb-20">
        <div id="page">
          <Banner />
          <div className="py-6 tf-container">
            <ul className="flex flex-wrap items-center justify-start">
              {renderMenu()}
            </ul>
          </div>
          <Active />
          <Upcoming />
          <Released />
        </div>
      </div>
    </>
  );
};

const Item = (props) => (
  <Provider>
      <INOImpl {...props} />
  </Provider>
);

export default Item;
