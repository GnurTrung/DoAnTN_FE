import { Modal } from "antd";
import IconClose from "assets/icons/IconClose";
import cx from "classnames";

const CardModal = ({
  open,
  onCancel,
  destroyOnClose,
  children,
  title,
  footer,
  processing,
  width,
  className,
  maskClosable = true,
  ...props
}) => {
  return (
    <Modal
      open={open}
      centered={true}
      onCancel={onCancel}
      closable={false}
      destroyOnClose={destroyOnClose}
      {...props}
      footer={null}
      width={width}
      className={cx("custom-modal", className)}
      maskClosable={maskClosable}
    >
      <div className="flex flex-col justify-start items-center w-full">
        {!processing && (
          <div className="flex justify-between items-center border-b-[1px] border-[#4E4D6E] border-solid p-5 w-full">
            <p className="text-white text-base font-semibold leading-6">
              {title}
            </p>
            <IconClose className="cursor-pointer" onClick={onCancel} />
          </div>
        )}
        {children}
        {footer && <div className="p-5 w-full">{footer}</div>}
      </div>
    </Modal>
  );
};

export default CardModal;
