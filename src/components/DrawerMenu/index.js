import { Drawer } from "antd";
import IconClose from "assets/icons/IconClose";
import style from "./style.module.css";
const DrawerMenu = ({
  open = false,
  title = title,
  placement = "right",
  onClose,
  children,
}) => {
  const handleClose = () => onClose && onClose();

  return (
    <>
      <Drawer
        title={title}
        placement={placement}
        closable={false}
        onClose={handleClose}
        open={open}
        key={placement}
        className={style.menu}
        headerStyle={{ color: "#fff" }}
        extra={<IconClose onClick={onClose} className="cursor-pointer"/>}
      >
        {children}
      </Drawer>
    </>
  );
};
export default DrawerMenu;
