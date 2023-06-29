import imgTiny from "assets/images/tiny.jpg";
import ProgressiveImage from "react-progressive-graceful-image";

import style from "./ProgressiveImage.module.css";
import imgLoading from "assets/images/product/loading-gif.gif";
import { getFullImageSrc, getVideoType, isVideo } from "utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import placeHolderImage from "assets/images/collection/default-image.png";

const Image = ({
  src,
  className = "",
  alt = "GnurT - NFT Marketplace",
  wrapperClassName,
  ...props
}) => {
  const fullSrc = getFullImageSrc(src);
  if (isVideo(fullSrc)) {
    return (
      <video
        width="100%"
        height="100%"
        className={className}
        muted
        autoPlay={true}
        controls={false}
        loop
      >
        <source src={src} type={getVideoType(fullSrc)} />
      </video>
    );
  }
  return (
    <LazyLoadImage
      src={fullSrc}
      placeholderSrc={placeHolderImage}
      alt="Image Alt"
      effect="blur"
      className={className}
      loading="lazy"
      wrapperClassName={wrapperClassName}
      {...props}
    />
  );
  //1680 - 315
  return (
    <ProgressiveImage src={src} placeholder={imgTiny}>
      {(src, loading) => (
        <img
          loading="lazy"
          className={`${className} ${loading ? style.loading : style.loaded}`}
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = imgLoading;
          }}
        />
      )}
    </ProgressiveImage>
  );
};

export default Image;
