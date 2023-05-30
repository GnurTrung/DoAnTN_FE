import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from "antd";
import { useWeb3 } from "contexts/useWeb3Context";
import { useState } from "react";
import { openWindowTab } from "utils";
import { getStoreKey, useNftDetailContext } from '../context';
import Verify from "assets/images/TW_verify.png"


const VerifyAccount = (data) => {
    const { twitterVerify, setTwitterVerify } = useNftDetailContext();
    const [enableVerify, setEnableVerify] = useState(false)
    const [loadingTW, setLoadingTW] = useState(false);
    const [disableClick, setDisableClick] = useState(false);
    const [timer, setTimer] = useState(5)

    const { account } = useWeb3();
    const onClickFollow = () => {
        try {
            const url = data?.data?.social?.twitterLink;
            openWindowTab({ url, title: 'Follow Tocen - NFT Marketplace on SUI', w: 600, h: 600 })
            setTimeout(() => { setEnableVerify(true) }, 2000)
        } catch (ex) {
            console.log(ex)
        }
    }

    const CountDown = () => {
        let timer = 5;
        let timerCount = setInterval(() => {
            timer--;
            setTimer(timer)
            if (timer < 0) {
                const STORAGE_KEY = getStoreKey(data?.data?.code)
                timerCount && clearInterval(timerCount)
                localStorage.setItem(STORAGE_KEY, true)
                setLoadingTW(false)
                setTwitterVerify(true)
            }
        }, 1000)
    }

    const handleVerifyTW = async () => {
        if (!enableVerify && disableClick) return;
        const STORAGE_KEY = getStoreKey(data?.data?.code)
        try {
            setLoadingTW(true)
            setDisableClick(true)
            CountDown()

        } catch (ex) {
            console.log(ex)
        } finally {
            setDisableClick(false)
        }
    }

    const renderButtonVerify = () => {
        let className = 'btn-primary mx-2'
        if (!enableVerify)
            className += ' disabled'

        return (
            <Button
                onClick={() => handleVerifyTW()}
                className={className}>
                {loadingTW
                    ?
                    <div className='flex'>
                        <span className='mr-2'>{timer}</span>
                        <svg className="animate-spin text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    : 'Verify'}
            </Button>
        )
    }

    const renderButtonFollow = () => {
        return (
            <Button
                onClick={onClickFollow}
                className={"btn-primary mx-2"}>
                Follow
            </Button>
        )
    }

    if (!account)
        return (
            <section className="tf-section tf-explore tf-filter tf-center mt-10 !p-0">
                {/* <Loading /> */}
            </section>
        )

    return (
        <>
            <section className="">
                <div className="row pt-1">
                    <div className="bg-[#1F1D43] border-jacarta-600 rounded-2xl border  py-4 px-8 mt-6">
                        <div className="flex flex-row">
                            <img src={Verify} alt="verify" />
                            <div className="flex justify-between items-center flex-col sm:flex-row gap-[1rem]">
                                <div className='flex flex-col mt-1 ml-1'>
                                    <span className="text-[14px]">
                                        Please follow and don't hesitate to contact us via Twitter
                                    </span>
                                    <span className="text-[16px] font-display font-semibold text-white">
                                        {`Tocen x ${data?.data?.name || ''}`} {<span>(*)</span>}
                                    </span>
                                </div>
                                {(twitterVerify)
                                    && <div>
                                        <CheckCircleFilled className="ml-1 p-2.5" style={{ fontSize: '30px', color: '#10AA7A' }} />
                                    </div>}
                                {!(twitterVerify)
                                    && (<div className='flex items-center'>
                                        {renderButtonVerify()}
                                        {renderButtonFollow()}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default VerifyAccount;
