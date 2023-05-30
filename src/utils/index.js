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

export const openWindowTab = ({ url, title, w, h }) => {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  window.open(
    url,
    title,
    `
    scrollbars=yes,
    width=${w / systemZoom}, 
    height=${h / systemZoom}, 
    top=${top}, 
    left=${left}
    `
  );

  //if (window.focus) newWindow.focus();
};

export const verifyTwitter = (link) => {
  const regex = new RegExp(
    "^(?:https://)?(?:www\\.)?twitter\\.com/(\\w+)$",
    "i"
  );
  return regex.test(link);
};

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
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
