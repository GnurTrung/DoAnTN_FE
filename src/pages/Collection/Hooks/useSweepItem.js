import { SUI_OFFSET } from "configs";
import { useWeb3 } from "contexts/useWeb3Context";
import { useState } from "react";

const useSweepItem = () => {
    const [items, setItems] = useState();
    const [totalSUI, setTotalSUI] = useState(0)
    const [minSUI, setMinSUI] = useState(0)
    const [maxSUI, setMaxSUI] = useState(0)
    const { account } = useWeb3()
    const getItemSweep = (options) => {
        try {
            let { sweepItem, nfts, } = options;
            
            const mSUI = !minSUI ? 0 : ((minSUI) * SUI_OFFSET);
            const mxSUI = !maxSUI ? 0 : ((maxSUI) * SUI_OFFSET);

            if (sweepItem <= 0 || !nfts || nfts.length === 0) {
                setItems([])
                setTotalSUI(0)
                return
            }

            let listNFTValid = nfts.filter(x => (x.ownerAddress != account && x.isListing === true));
            if (mSUI > 0 && mxSUI > 0)
                listNFTValid = nfts.filter(x => (x.ownerAddress != account && x.isListing === true) && (parseInt(x.listingPrice) >= mSUI) && (parseInt(x.listingPrice) <= mxSUI))
            else if (mSUI > 0)
                listNFTValid = nfts.filter(x => (x.ownerAddress != account && x.isListing === true) && (parseInt(x.listingPrice) >= mSUI))
            else if (mxSUI > 0)
                listNFTValid = nfts.filter(x => (x.ownerAddress != account && x.isListing === true) && (parseInt(x.listingPrice) <= mxSUI))

               
            // get all nfts
            const listNFTSweep = listNFTValid.slice(0, sweepItem);
            setItems(listNFTSweep)
            setTotalSUI(listNFTSweep.reduce((x, y) => x + parseInt(y.listingPrice), 0))

        } catch (ex) {
            console.log(ex)
        }
    }

    return {
        nftSweep: items,
        getItemSweep,
        totalSUISweep: totalSUI,
        setMinSUISweep: setMinSUI,
        setMaxSUISweep: setMaxSUI,
        minSUISweep: minSUI,
        maxSUISweep: maxSUI
    }
}

export default useSweepItem;