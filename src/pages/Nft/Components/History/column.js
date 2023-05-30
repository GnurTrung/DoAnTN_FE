import { MARKET_ADDRESS } from "constants";
import moment from "moment";
import { Link } from "react-router-dom";
import { formatPrice } from "utils";
import { formatWallet } from "utils/wallet-utils";

export const nftActivityColumn = () => {
  return [
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 70,
      render: (value) => formatPrice(value) || "--",
    },
    {
      title: "From",
      dataIndex: "fromAddress",
      key: "fromAddress",
      width: 70,
      render: (value) => (
        <Link
          to={`/profile/${value}`}
          className="hover:text-current hover:underline"
        >
          {formatWallet(value)}
        </Link>
      ),
    },
    {
      title: "To",
      dataIndex: "userAddress",
      key: "userAddress",
      width: 70,
      render: (value) => {
        if (value === MARKET_ADDRESS) return "Market";
        else
          return (
            <Link
              to={`/profile/${value}`}
              className="hover:text-current hover:underline"
            >
              {formatWallet(value)}
            </Link>
          );
      },
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      key: "timestamp",
      width: 70,
      render: (value) => (
        <span>about {moment.unix(value / 1000).fromNow()}</span>
      ),
    },
  ];
};
