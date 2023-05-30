import { Input } from "antd";
import IconSearch from "assets/icons/IconSearch";
import cx from "classnames";

const TextInput = ({
  placeholder,
  width,
  onChange,
  className,
  type,
  iconSearch,
  value,
  ...rest
}) => {
  return (
    <Input
      value={value}
      type={type || "text"}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
      prefix={iconSearch ? <IconSearch /> : null}
      className={cx("custom-text-input", className)}
    />
  );
};

export default TextInput;
