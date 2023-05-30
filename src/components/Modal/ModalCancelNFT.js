import { Button } from "antd";
import IconSpin from "assets/icons/IconSpin";
import CartModal from "components/layouts/CardModal";
import { useState } from "react";

const ModalCancelNFT = (props) => {
  const { onCancelListing } = props;
  const [processing, setProcessing] = useState(false);

  const handleListing = async () => {
    if (processing) return;
    setProcessing(true);
    onCancelListing && (await onCancelListing());
    setProcessing(false);
  };

  return (
    <CartModal
      open={props.show}
      onCancel={props.onHide}
      destroyOnClose={true}
      title="List for Sale"
      width={417}
      footer={
        <div className="flex space-x-4">
          <Button className="btn-secondary flex-1" onClick={props.onHide}>
            Keep it
          </Button>
          <Button className="btn-primary flex-1" onClick={handleListing}>
            {processing ? <IconSpin /> : "Cancel Listing"}
          </Button>
        </div>
      }
    >
      <div className="p-5">
        <h4 className="text-base font-semibold text-[white] leading-6 mb-3">
          Are you sure you want to cancel your listing?
        </h4>
        <p className="text-[#BABAC7] leading-5">
          Canceling your listing will unpublish this sale from Tocen and
          requires a transaction to make sure it will never be fulfillable.
        </p>
      </div>

    </CartModal>
  );
};

export default ModalCancelNFT;
