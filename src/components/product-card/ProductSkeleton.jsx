import { Skeleton } from "antd";
import React from "react";

const ProductSkeleton = ({ action }) => {
  return (
    <div className="w-full bg-[#131924] rounded-2xl">
      <Skeleton.Button
        shape="square"
        active
        className="aspect-square max-h-60 w-full rounded-2xl skeleton-image"
        block
      />
      <div className="py-[14px] px-3">
        <div className="mb-4">
          <Skeleton.Button shape="round" size="small" active block />
        </div>
        <div className="!w-[50%] mb-4">
          <Skeleton.Button shape="round" size="small" active block />
        </div>
        <div className="!w-[50%] mb-4">
          <Skeleton.Button shape="round" size="small" active block />
        </div>
        {action && (
          <div className="flex justify-between gap-2">
            <Skeleton.Button active shape="round" block />
            <Skeleton.Button active shape="round" block />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSkeleton;
