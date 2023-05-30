import IconSearch from "assets/icons/IconSearch";
import React from "react";
import cx from "classnames";

const TextInput = ({ placeholder, width, onChange, className, ...rest }) => {
  return (
    <div className={cx("text-input", className)} style={{ width }}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
      <div className="icon">
        <IconSearch />
      </div>
    </div>
  );
};

export default TextInput;
