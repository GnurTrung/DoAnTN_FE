import { Select } from "antd";
import IconSelectArrow from "assets/icons/IconSelectArrow";
import cx from "classnames";

const CustomSelect = ({
  options,
  onChange,
  value,
  className,
  defaultValue,
  ...props
}) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      {...props}
      className={cx("custom-select", className)}
      placement="bottomLeft"
      suffixIcon={<IconSelectArrow />}
      popupClassName="custom-popup"
      bordered={false}
    />
  );
};

export default CustomSelect;
