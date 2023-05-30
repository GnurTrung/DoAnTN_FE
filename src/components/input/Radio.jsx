import { Radio } from "antd";
import React from "react";

const CustomRadio = ({ children, value, ...props }) => {
  return (
    <Radio value={value} className="custom-radio" {...props}>
      {children}
    </Radio>
  );
};

export default CustomRadio;
