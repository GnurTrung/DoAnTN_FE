import React from "react";
import cx from "classnames";

const Loading = ({ className }) => {
  return (
    <div className={cx("w-full flex justify-center items-center", className)}>
      <svg
        width="78"
        height="78"
        viewBox="0 0 78 78"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle
          cx="39"
          cy="39"
          r="35.3721"
          stroke="#2A294F"
          strokeWidth="7.25581"
        />
        <path
          d="M71.4757 57.2C68.7542 57.2 67.0811 54.0659 68.1595 51.5672C69.8227 47.7132 70.7442 43.4642 70.7442 39C70.7442 21.4682 56.5318 7.25581 39 7.25581C21.4682 7.25581 7.25581 21.4682 7.25581 39C7.25581 43.4642 8.17734 47.7132 9.84054 51.5672C10.9189 54.0659 9.24576 57.2 6.52429 57.2V57.2C5.27796 57.2 4.12276 56.5157 3.59855 55.385C1.28899 50.4033 0 44.8522 0 39C0 17.4609 17.4609 0 39 0C60.5391 0 78 17.4609 78 39C78 44.8522 76.711 50.4033 74.4015 55.385C73.8772 56.5157 72.722 57.2 71.4757 57.2V57.2Z"
          fill="#8358FF"
        />
      </svg>
    </div>
  );
};

export default Loading;
