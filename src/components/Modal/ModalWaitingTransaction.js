import React from "react";
import CartModal from "components/layouts/CardModal";
import Loading from "components/loading";

const ModalWaitingTransaction = ({ show, onHide }) => {
  return (
    <CartModal
      open={show}
      onCancel={onHide}
      title="Checkout"
      width={417}
      processing={true}
      maskClosable={false}
    >
      <div className="flex flex-col items-center py-12">
        <Loading className="mb-5" />
        <p className="text-base text-white font-semibold leading-6 mb-1 text-center">
          Transfer in progress
        </p>
        <p className="text-[#BABAC7] font-medium leading-5 text-center">
          Please wait, while we make final touches
        </p>
      </div>
    </CartModal>
  );
};

export default ModalWaitingTransaction;
