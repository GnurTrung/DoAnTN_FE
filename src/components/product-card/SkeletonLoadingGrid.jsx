import ProductSkeleton from "./ProductSkeleton";

const SkeletonLoadingGrid = ({ action = false }) => {
  const array = new Array(12).fill(1);
  return (
    <>
      {array.map((e, index) => (
        <ProductSkeleton action={action} key={index} />
      ))}
    </>
  );
};

export default SkeletonLoadingGrid;
