import * as React from "react";

const IconCart = (props) => (
  <svg
    width={19}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.25 16.875a1.312 1.312 0 1 0 0-2.625 1.312 1.312 0 0 0 0 2.625ZM6.25 16.875a1.312 1.312 0 1 0 0-2.625 1.312 1.312 0 0 0 0 2.625ZM3.692 2.955l-.15 1.838a.595.595 0 0 0 .6.644h11.483c.315 0 .578-.24.6-.554a2.218 2.218 0 0 0-2.243-2.408H4.765a2.045 2.045 0 0 0-.457-.908c-.375-.397-.9-.63-1.44-.63H1.563A.567.567 0 0 0 1 1.5c0 .308.255.563.563.563h1.305a.84.84 0 0 1 .607.262.845.845 0 0 1 .217.63ZM15.445 6.563H3.94c-.315 0-.57.24-.6.547l-.27 3.263a2.192 2.192 0 0 0 2.183 2.377h8.34c1.124 0 2.114-.922 2.197-2.047l.248-3.503a.587.587 0 0 0-.593-.638Z"
      fill={props.fill || "#989BAC"}
      className="group-hover:fill-white"
    />
  </svg>
);

export default IconCart;
