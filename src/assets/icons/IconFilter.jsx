import * as React from "react";

const IconFilter = ({data, ...props}) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.975 5.68501H11.79C11.4975 5.68501 11.265 5.45251 11.265 5.16001C11.265 4.86751 11.4975 4.63501 11.79 4.63501H15.975C16.2675 4.63501 16.5 4.86751 16.5 5.16001C16.5 5.45251 16.2675 5.68501 15.975 5.68501Z"
      fill={data ? "white" : "#9998AC"}
    />
    <path
      d="M4.815 5.68501H2.025C1.7325 5.68501 1.5 5.45251 1.5 5.16001C1.5 4.86751 1.7325 4.63501 2.025 4.63501H4.815C5.1075 4.63501 5.34 4.86751 5.34 5.16001C5.34 5.45251 5.1 5.68501 4.815 5.68501Z"
      fill={data ? "white" : "#9998AC"}
    />
    <path
      d="M7.60496 8.12251C9.2411 8.12251 10.5675 6.79615 10.5675 5.16001C10.5675 3.52387 9.2411 2.19751 7.60496 2.19751C5.96881 2.19751 4.64246 3.52387 4.64246 5.16001C4.64246 6.79615 5.96881 8.12251 7.60496 8.12251Z"
      fill={data ? "white" : "#9998AC"}
    />
    <path
      d="M15.975 13.3575H13.185C12.8925 13.3575 12.66 13.125 12.66 12.8325C12.66 12.54 12.8925 12.3075 13.185 12.3075H15.975C16.2675 12.3075 16.5 12.54 16.5 12.8325C16.5 13.125 16.2675 13.3575 15.975 13.3575Z"
      fill={data ? "white" : "#9998AC"}
    />
    <path
      d="M6.21 13.3575H2.025C1.7325 13.3575 1.5 13.125 1.5 12.8325C1.5 12.54 1.7325 12.3075 2.025 12.3075H6.21C6.5025 12.3075 6.735 12.54 6.735 12.8325C6.735 13.125 6.495 13.3575 6.21 13.3575Z"
      fill={data ? "white" : "#9998AC"}
    />
    <path
      d="M10.395 15.8025C12.0311 15.8025 13.3575 14.4761 13.3575 12.84C13.3575 11.2039 12.0311 9.8775 10.395 9.8775C8.75885 9.8775 7.4325 11.2039 7.4325 12.84C7.4325 14.4761 8.75885 15.8025 10.395 15.8025Z"
      fill={data ? "white" : "#9998AC"}
    />
  </svg>
);

export default IconFilter;