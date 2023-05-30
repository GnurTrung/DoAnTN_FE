import { useEffect, useState } from "react";
import { SUIET_TAG, wallets } from "../constants/wallets";
import { useWallet } from '@suiet/wallet-kit';

const WALLET = 'SUI_WALLET'

const useSuiWallet = () => {
    const [suiWallet, setSuiWallet] = useState(null);
    const [walletData, setWalletData] = useState({});
    const walletSuiet = useWallet();

    const getWallet = () => localStorage.getItem(WALLET) || '';

    useEffect(() => {
        const wallet = getWallet();
        const timer = wallet === 'spacecy' ? 500 : 0;
        const tm = setTimeout(() => {
            wallet && setSuiWallet(window[wallet])
            setWallet(wallet)
        }, timer)

        return () => tm && clearTimeout(tm)
    }, [])


    const disconnect = async () => {
        //window.walletSuiet = walletSuiet
        const wallet = getWallet();
        if (wallet.toLowerCase === 'martian')
            await window.martian.sui.disconnect()
        else if (wallet.toLowerCase == 'spacecy')
            await window.spacecy.sui.disconnect()
        else if (wallet.toLowerCase == SUIET_TAG)
            await walletSuiet.disconnect()
        localStorage.removeItem(WALLET);
        localStorage.removeItem('WK__LAST_CONNECT_WALLET_NAME')
        setSuiWallet(null)
    }

    const setWalletConnect = ({ tag }) => {
        setSuiWallet(window[tag])
        localStorage.setItem(WALLET, tag)
        setWallet(tag)
    }

    const setWallet = (tag) => {
        const walletData = wallets.find(x => x.tag == tag);
        setWalletData(walletData || {})
    }
    return { suiWallet, setWalletConnect, disconnect, walletData }
};

export default useSuiWallet;