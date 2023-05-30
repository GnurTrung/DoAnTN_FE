import { Button } from "antd";
import IconSuccess from "assets/icons/IconSuccess";
import CartModal from "components/layouts/CardModal";

const ModalSuccess = ({ show, onHide }) => {
  return (
    <CartModal
      open={show}
      onCancel={onHide}
      width={417}
      maskClosable={false}
      title="Notification"
      footer={
        <Button
          className="w-full btn-secondary"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      }
    >
      <div className="flex flex-col items-center py-12">
        <IconSuccess className="mb-5" />
        <p className="text-base text-white font-semibold leading-6 mb-1 text-center">
          Transaction is completed.
        </p>
      </div>
    </CartModal>
  );
};

export default ModalSuccess;
