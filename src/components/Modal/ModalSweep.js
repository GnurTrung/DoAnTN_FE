import Loading from "components/loading";
import Image from "components/ProgressiveImage";
import { useWeb3 } from "contexts/useWeb3Context";
import { Modal } from "react-bootstrap";
import { formatWallet, mystToSui, numberShortFormat } from "utils/wallet-utils";
import styles from "./Modal.module.css";
import { Typography } from "antd";


const ModalSweep = (props) => {
  const { balance } = useWeb3()
  const { totalAmount, totalNFTs, title = 'Sweep NFT' } = props;
  const { collectionName } = props;
  const { Paragraph } = Typography;
  
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      dialogClassName={styles.modal}
      className={styles.container}
    >
      {/* <Modal.Header closeButton></Modal.Header> */}

      <div className="modal-body space-y-20 pd-40">
        <h3 className={`${styles.borderBottom}`}>{title}</h3>
        <div
          className={`justify-between flex detail-1 !mt-0 !flex-col ${styles.borderBottom}`}
        >
          <div className="col-xl-3 col-lg-4 col-md-6 mt-2">
            <h5>Collection Name : {collectionName}</h5>
            <div className="tf-author">
              <div className="image">
                <Image
                  src={props?.logo}
                  alt="GnurT"
                  className="rounded-md"
                />
              </div>
              <div className="content">
                <div className="title">
                  <p>Collection : {formatWallet(props?.collectionAddress)}</p>
                  <Paragraph copyable={{ text: props?.collectionAddress }}></Paragraph>
                </div>

              </div>
            </div>
          </div>
        </div>
        <p className="label-1">Items: {totalNFTs}</p>
        <p className="label-1">Price: {mystToSui(totalAmount || 0)} SUI</p>
        <p className="label-1">Balance: {numberShortFormat(mystToSui(balance))} SUI</p>
        <Loading />
      </div>
    </Modal>
  );
};

export default ModalSweep;
