import { formatAddress } from "@mysten/sui.js";
import IconClock from "assets/icons/IconClock";
import { Link } from "react-router-dom";
import cx from "classnames";
import IconSui from "assets/icons/IconSui";

export const sharingProgramColumn = (account) => {
  return [
    {
      title: "No",
      key: "no",
      dataIndex: "index",
      width: 100,
      render: (value, record) => (
        <span
          className={cx({
            "text-white": record?.address !== account,
            "text-accent": record?.address === account,
          })}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Name",
      key: "address",
      dataIndex: "address",
      render: (value, record) => (
        <Link to={`/profile/${value}`} className="hover:underline">
          <span
            className={cx({
              "text-white": record?.address !== account,
              "text-accent": record?.address === account,
            })}
          >
            {formatAddress(value || "")}
          </span>
        </Link>
      ),
    },
    {
      title: "Point",
      key: "point",
      dataIndex: "point",
      width: 100,
      render: (value, record) => (
        <span
          className={cx({
            "text-white": record?.address !== account,
            "text-accent": record?.address === account,
          })}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (value) => (
        <div className="flex items-center space-x-1">
          {!value && (
            <div className="flex flex-row">
              <IconClock width={20} height={20} />{" "}
              <span className="ml-1">Waiting</span>
            </div>
          )}
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-[#9998AC] hover:text-white"
            >
              <div className="flex items-center space-x-1">
                <IconSui />
                <span>View on Explores</span>
              </div>
            </a>
          )}
        </div>
      ),
    },
  ];
};

export const prizeColumn = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    render: (value) => <span className="text-white">{value}</span>,
  },
  {
    title: "Tier",
    dataIndex: "tier",
    key: "tier",
  },
  {
    title: "Token prizes (split)",
    dataIndex: "prize",
    key: "prize",
    render: (value) => <span className="text-white">{value}</span>,
  },
];
