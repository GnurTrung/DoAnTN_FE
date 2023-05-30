import { Modal } from "react-bootstrap";
import styles from './Modal.module.css';

const Base = (props) => {
    const { show, onHide, children } = props;
    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName={styles.modal}
            className={styles.container}
        >
            {/* <Modal.Header closeButton></Modal.Header> */}

            <div className="modal-body space-y-20 pd-40 add-nft-inner">
                <div className={`blockchain-button flex !justify-center flex-col`}>
                    <div
                        className={'lds-roller'}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    {children}
                </div>
            </div>
        </Modal>

    )
}

export default Base;