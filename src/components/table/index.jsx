import { Table } from "antd";
import NoData from "components/NoData";
import React from "react";
import cx from "classnames";

const CustomTable = ({
  columns,
  dataSource,
  bordered = false,
  loading,
  scroll,
  className,
  ...props
}) => {
  return (
    <Table
      className={cx("custom-table", className)}
      columns={columns}
      dataSource={dataSource}
      bordered={bordered}
      pagination={false}
      loading={loading}
      locale={{
        emptyText: (
          <div className="flex flex-col justify-center items-center">
            <NoData />
          </div>
        ),
      }}
      scroll={scroll}
      {...props}
    />
  );
};

export default CustomTable;
