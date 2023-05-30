import * as React from "react";
const IconAnimatedLoading = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{
      margin: "auto",
      background: "none",
      display: "block",
      shapeRendering: "auto",
    }}
    width="100px"
    height="100px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <circle cx={84} cy={50} r={10} fill="#8358ff">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="0.352112676056338s"
        calcMode="spline"
        keyTimes="0;1"
        values="10;0"
        keySplines="0 0.5 0.5 1"
        begin="0s"
      />
      <animate
        attributeName="fill"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="discrete"
        keyTimes="0;0.25;0.5;0.75;1"
        values="#8358ff;#8358ff;#8358ff;#8358ff;#8358ff"
        begin="0s"
      />
    </circle>
    <circle cx={16} cy={50} r={10} fill="#8358ff">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;10;10;10"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      />
    </circle>
    <circle cx={50} cy={50} r={10} fill="#8358ff">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;10;10;10"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.352112676056338s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.352112676056338s"
      />
    </circle>
    <circle cx={84} cy={50} r={10} fill="#8358ff">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;10;10;10"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.704225352112676s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.704225352112676s"
      />
    </circle>
    <circle cx={16} cy={50} r={10} fill="#8358ff">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;10;10;10"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.056338028169014s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1.408450704225352s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.056338028169014s"
      />
    </circle>
  </svg>
);
export default IconAnimatedLoading;
