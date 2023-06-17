import { SUI_OFFSET } from "configs";
import placeHolderImage from "assets/images/collection/default-image.png";

export const removeDotAcceptFirst = (str) => {
  let value = str.replace(/^([^.]*\.)(.*)$/, function (a, b, c) {
    return b + c.replace(/\./g, "");
  });
  return value.startsWith(".") ? `0${value}` : value;
};

export const formatPrice = (price) => {
  return price ? price / SUI_OFFSET : 0;
};


export const isImage = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const isVideo = (url) => {
  return /\.(mp3|mp4|wav|ogg)$/.test(url);
};

export const getVideoType = (url) => {
  const types = ["mp4", "wav", "ogg"];
  let videoType = "";
  for (let type of types) {
    if (url.endsWith(type)) {
      videoType = `video/${type}`;
      break;
    }
  }
  return videoType;
};

export const getFullImageSrc = (src) => {
  if (!src) return placeHolderImage;
  let fullSrc = src;
  if (src.startsWith("ipfs://")) {
    fullSrc = `https://ipfs.io/ipfs/${src.slice(7)}`;
  }
  return fullSrc;
};
