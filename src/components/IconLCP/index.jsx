import React from 'react'
const defaultData =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbm" +
  "NvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI5OTk5OXB4IiBoZWlnaHQ9I" +
  "jk5OTk5cHgiIHZpZXdCb3g9IjAgMCA5OTk5OSA5OTk5OSIgdmVyc2lvbj0i" +
  "MS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5" +
  "zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBzdH" +
  "Jva2U9Im5vbmUiIGZpbGw9Im5vbmUiIGZpbGwtb3BhY2l0eT0iMCI+PHJlY" +
  "3QgeD0iMCIgeT0iMCIgd2lkdGg9Ijk5OTk5IiBoZWlnaHQ9Ijk5OTk5Ij48" +
  "L3JlY3Q+IDwvZz4gPC9zdmc+";

const defaultSize = parseInt("F4240", 16);

const IconLCP = ({
  src = defaultData,
  alt = "icon",
  width = defaultSize,
  height = defaultSize,
  className = "background-lcp",
}) => {
  return (
    <img
      alt={alt}
      width={width}
      height={height}
      src={src}
      className={className}
    />
  );
};

export default IconLCP;
