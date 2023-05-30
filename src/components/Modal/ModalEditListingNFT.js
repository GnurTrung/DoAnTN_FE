import Image from "components/ProgressiveImage";
import { useWeb3 } from "contexts/useWeb3Context";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeDotAcceptFirst } from "utils";
import { mystToSui, numberShortFormat } from "utils/wallet-utils";
import styles from "./Modal.module.css";

const ModalListingNFT = (props) => {
  const { onListing } = props;
  const [price, setPrice] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { balance } = useWeb3();

  const onInputChange = (e) => {
    if (!e.target.validity.valid) setPrice((v) => v);
    else {
      let value = e.target.value;
      value = removeDotAcceptFirst(value);
      setPrice(value);
    }
  };

  useEffect(() => {
    setIsValid(!(!price || price <= 0));
  }, [price]);

  const handleListing = () => {
    if (!isValid || processing) return;
    setProcessing(true);
    onListing && onListing(price);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      dialogClassName={styles.modal}
      className={styles.container}
    >
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3 className={`${styles.borderBottom}`}>Edit Listing NFT</h3>
        <div
          className={`justify-between flex detail-1 !mt-0 !flex-col ${styles.borderBottom}`}
        >
          <p>Item</p>
          <div className="col-xl-3 col-lg-4 col-md-6 mt-2">
            <div className="tf-author">
              <div className="image">
                <Image
                  src={props?.nft?.imageUrl}
                  alt="Tocen"
                  className="rounded-md"
                />
              </div>
              <div className="content">
                <div className="title">
                  <Link to="#">{props?.nft?.title}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="label-1">Price: {price} SUI</p>
        <p className="label-1">
          Balance: {numberShortFormat(mystToSui(balance))} SUI
        </p>
        <input
          type="text"
          className="form-control quantity form-bottom !my-0"
          value={price}
          onChange={(e) => onInputChange(e)}
          pattern="[0-9\.]*$"
        />
        {!isValid && (
          <p className={`!my-2 !p-2 ${styles.warning}`}>
            Please enter a valid amount
          </p>
        )}
        <a
          className="button-popup !mt-0 cursor-pointer !mt-4 !flex !justify-center"
          onClick={handleListing}
        >
          {!processing ? (
            "Continue"
          ) : (
            <svg
              className="animate-spin text-white h-5 w-5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </a>
      </div>
    </Modal>
  );
};

export default ModalListingNFT;
