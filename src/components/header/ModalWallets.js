import React from 'react';
import { Modal } from "react-bootstrap";
import { wallets } from '../../constants/wallets';
import styles from './ModalWallets.module.css';
import { useWeb3 } from '../../contexts/useWeb3Context'

const ModalWallet = (props) => {
    const { onHide } = props;

    const { handleConnect } = useWeb3()
    const onConnect = (wallet) => {
        handleConnect(wallet)
        onHide && onHide()
    }
    const renderWallet = () => {
        const ui = wallets.map(x => {
            return (
                <li className={`${styles.limodal}`} key={x.tag}>
                    <a className={`${styles.row}`} onClick={() => onConnect(x)}>
                        <img src={x.src} alt="GnurT - NFT Marketplace" className={styles.icon} />
                        <div className={`${styles.item}`}>
                            {x.name}
                        </div>
                    </a>
                </li>
            )
        })
        return ui;
    }

    return (

        <Modal
            show={props.show}
            onHide={props.onHide}
            dialogClassName={styles.modal}
            className={styles.container}
        >
            <Modal.Header closeButton></Modal.Header>

            <div className="modal-body space-y-20 pd-40 add-nft-inner">
                <h3>Connect your wallet</h3>
                <ul className={`blockchain-button `}>
                    {renderWallet()}
                </ul>
            </div>
        </Modal>

    );
};

export default ModalWallet;
