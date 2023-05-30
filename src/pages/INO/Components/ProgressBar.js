import { useProviderSigner } from "contexts";
import { useEffect, useRef, useState } from "react";
import { isDateGreater } from "utils/date-time";

const Bar = (data) => {
    const { getObject } = useProviderSigner();
    const bar = useRef(0);
    const calcPercent = (current, max) => {
        try {
            if (current < 0 || max <= 0) return ''
            const percent = max < 100000 ? (current * 100 / max).toFixed(2) : 100
            bar.current.style.width = `${percent}%`
            return `${percent}%`
        } catch (ex) {
        }
        return ''
    }
    console.log(data?.data?.collectionInfo?.itemCount, '1')
    const [dataSO, setDataSO] = useState([])
    const getNFTDataSO = async () => {
        try {
            const SO = await getObject(data?.data?.SCData?.SO_collection)
            setDataSO(SO?.data?.content?.fields)
        } catch (ex) {
            console.log(ex)
        }
    }
    // const currentMintSV = ((dataPool?.public || 0) + (dataPool?.whitelist || 0)) || 0
    const currentMintSO = dataSO?.sum_nft || 0
    // const currentMint = (currentMintSO <= data?.data?.collectionInfo?.itemCount ? currentMintSO : data?.data?.collectionInfo?.itemCount) || 0
    useEffect(() => {
        getNFTDataSO()
    }, [data?.data?.code])
    return (
        <div className='p-2'>
            {isDateGreater(new Date(), new Date(data?.data?.depositStartTime)) && <div className="mt-4">
                <div className="text-sm flex justify-between">
                    <span className="text-white mr-1">
                        {`${currentMintSO.toLocaleString(undefined)}/${data?.data?.collectionInfo?.itemCount >= 100000 ? "∞" : parseInt(data?.data?.collectionInfo?.itemCount).toLocaleString(undefined)}`}
                    </span>
                    <span className="text-white font-semibold">
                        {calcPercent(currentMintSO, data?.data?.collectionInfo?.itemCount)}
                    </span>
                </div>
                <div className="mt-2 text-sm flex justify-between mb-2">
                    <div className="w-full h-2 bg-jacarta-200 rounded-full">
                        <div ref={bar} className=" h-full bg-accent rounded-full max-w-full">
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default Bar;
