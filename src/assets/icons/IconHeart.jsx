import * as React from "react";

const IconHeart = ({ fill, ...props }) => (
  <svg
    width={19}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.715 15.607c-.255.09-.675.09-.93 0-2.175-.742-7.035-3.84-7.035-9.09 0-2.317 1.868-4.192 4.17-4.192 1.365 0 2.572.66 3.33 1.68a4.147 4.147 0 0 1 3.33-1.68c2.303 0 4.17 1.875 4.17 4.193 0 5.25-4.86 8.347-7.035 9.09Z"
      stroke="#989BAC"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
    />
  </svg>
);

export default IconHeart;
