import IconClose from "assets/icons/IconClose";
import IconSearch from "assets/icons/IconSearch";
import NoResult from "assets/images/not-result.png";
import cx from "classnames";
import TextInput from "components/input/TextInput";
import Loading from "components/loading";
import { useDebounce } from "hooks";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getGlobalSearchDataApi } from "services/global";
import { isMobile } from "react-device-detect";

const FILTER_OPTIONS = {
  ALL: 0,
  COLLECTIONS: 1,
  ITEMS: 2,
};

const SearchHeader = ({ showSearch, setShowSearch }) => {
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [showInputMobile, setShowInputMobile] = useState(false);
  const ref = useRef(null);
  const debouncedSearchText = useDebounce(text, 300);

  const onChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const getGlobalSearchData = async () => {
      setLoading(true);
      const res = await getGlobalSearchDataApi(debouncedSearchText);
      if (res.data) setSearchData(res.data);
      setLoading(false);
    };
    if (debouncedSearchText) getGlobalSearchData();
    else setSearchData(null);
  }, [debouncedSearchText]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setText("");
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const onChangeFilter = (value) => {
    if (value === filter) setFilter(FILTER_OPTIONS.ALL);
    else setFilter(value);
  };

  const onShowSearch = () => {
    setShowSearch(true);
    if (isMobile) {
      setShowInputMobile(true);
      document.querySelector("body").style.overflow = "hidden";
    }
  };

  const onCloseSearch = () => {
    setShowSearch(false);
    if (isMobile) {
      setShowInputMobile(false);
      document.querySelector("body").style.overflow = "auto";
    }
  };

  const CollectionItem = ({ logo, name, total_items, address }) => {
    return (
      <Link to={`/collection/${address}`}>
        <div className="flex items-center space-x-2 cursor-pointer group rounded-2xl hover:bg-[#323268] p-3 w-full">
          <img
            src={logo}
            alt="Logo"
            className="rounded-full w-10 h-10 object-cover"
          />
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-white font-semibold leading-5 text-sm group-hover:underline truncate">
              {name}
            </span>
            <span className="font-medium text-[#9998AC] leading-5 text-sm truncate">
              {total_items} Items
            </span>
          </div>
        </div>
      </Link>
    );
  };

  const NftItem = ({ image_url, title, nft_address, collection_name }) => {
    return (
      <Link to={`/nft/${nft_address}`}>
        <div className="flex items-center space-x-2 cursor-pointer group rounded-2xl hover:bg-[#323268] p-3 w-full">
          <img
            src={image_url}
            alt="Logo"
            className="rounded-full w-10 h-10 object-cover"
          />
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-white font-semibold leading-5 text-sm group-hover:underline truncate">
              {title}
            </span>
            <span className="font-medium text-[#9998AC] leading-5 text-sm truncate">
              {collection_name}
            </span>
          </div>
        </div>
      </Link>
    );
  };
  return (
    <div
      className={cx("relative flex flex-1 flex-col", {
        "!fixed top-0 w-full h-screen bottom-0 left-0 right-0 bg-[#181735] z-[100] justify-start items-center":
          showInputMobile,
        "items-end": !showInputMobile,
      })}
    >
      <div
        className={cx("flex !bg-[#1F1D43] w-full space-x-3", {
          "p-4": showInputMobile,
        })}
      >
        <TextInput
          placeholder="Search..."
          iconSearch
          value={text}
          onChange={onChange}
          className={cx("hidden", { "!flex": showInputMobile || showSearch })}
          {...(!showInputMobile && {
            suffix: (
              <IconClose className="cursor-pointer" onClick={onCloseSearch} />
            ),
          })}
        />
        <IconClose
          className={cx("hidden cursor-pointer", {
            "!block": showInputMobile,
          })}
          onClick={onCloseSearch}
        />
      </div>

      <div
        ref={ref}
        className={cx("w-full min-h-[10rem] z-[100] overflow-y-auto", {
          block: Boolean(text),
          hidden: !Boolean(text) && !showInputMobile,
          "!relative": showInputMobile,
          "absolute right-0 top-14 rounded-2xl border border-white border-solid bg-[#2A294F] max-h-[480px]":
            !showInputMobile,
        })}
      >
        <div className="flex flex-col space-y-5 px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onChangeFilter(FILTER_OPTIONS.COLLECTIONS)}
              className={cx(
                "h-9 rounded-[2rem] flex justify-center items-center border border-solid border-[#4E4D6E] font-semibold text-sm px-4 py-2 cursor-pointer hover:bg-[#323268] hover:border-none",
                { "bg-[#323268]": filter === FILTER_OPTIONS.COLLECTIONS }
              )}
            >
              Collections
            </button>
            <button
              onClick={() => onChangeFilter(FILTER_OPTIONS.ITEMS)}
              className={cx(
                "h-9 rounded-[2rem] flex justify-center items-center border border-solid border-[#4E4D6E] font-semibold text-sm px-4 py-2 cursor-pointer hover:bg-[#323268] hover:border-none",
                { "bg-[#323268]": filter === FILTER_OPTIONS.ITEMS }
              )}
            >
              Items
            </button>
          </div>
          {loading && <Loading />}
          {!loading &&
            searchData?.collectionSeach?.length === 0 &&
            searchData?.nftSeach?.length === 0 && (
              <div className="flex items-center flex-col space-y-3">
                <img src={NoResult} alt="No Result" />
                <p className="text-[#9998AC] font-semibold text-[18px]">
                  No results found
                </p>
              </div>
            )}
          <div className="divide-y divide-[#4E4D6E] divide-solid">
            {searchData?.collectionSeach?.length &&
            !loading &&
            filter !== FILTER_OPTIONS.ITEMS ? (
              <div className="pb-5">
                <h3 className="text-white font-semibold leading-5 text-base mb-3">
                  Collections
                </h3>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-3">
                  {searchData?.collectionSeach?.map((collection, index) => (
                    <CollectionItem
                      key={index}
                      logo={collection._source.logo}
                      name={collection._source.name}
                      total_items={collection._source.total_items}
                      address={collection._source.address}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            {searchData?.nftSeach?.length &&
            !loading & (filter !== FILTER_OPTIONS.COLLECTIONS) ? (
              <div className="pt-5">
                <h3 className="text-white font-semibold leading-5 text-base mb-3">
                  Items
                </h3>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-3">
                  {searchData?.nftSeach?.map((nft, index) => (
                    <NftItem
                      key={index}
                      image_url={nft._source.image_url}
                      title={nft._source.title}
                      collection_name={nft._source.collection_name}
                      nft_address={nft._source.nft_address}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div
        onClick={onShowSearch}
        className={cx(
          "icon bg-[#2a294f] w-[3.2rem] h-[3.2rem] flex justify-center items-center rounded-full group cursor-pointer hover:bg-[#323268]",
          { "!hidden": showSearch || showInputMobile }
        )}
      >
        <IconSearch />
      </div>
    </div>
  );
};

export default SearchHeader;
