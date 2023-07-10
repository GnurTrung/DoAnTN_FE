import { useWeb3 } from "contexts/useWeb3Context";
import { Link } from "react-router-dom";
import { formatWallet, mystToSui } from "utils/wallet-utils";
import { useNftDetailContext } from "../context";

const BestOffer = () => {
    const { account } = useWeb3()
    const { dataOffers } = useNftDetailContext();
    const { onShowAcceptOffer, dataOnchain } = useNftDetailContext();

    const onAcceptOffer = async (row) => {
        try {
            //  const data = await getNFTDetails(id);
            const { userAddress, price } = row;
            onShowAcceptOffer({
                dataNFT: dataOnchain,
                userAddress,
                price,
            })
        } catch (ex) {
            console.log(ex)
        }
    }

    const renderRow = () => {
        try {
            
            if (!(dataOnchain?.owner === account))
                return <></>
            if (!dataOffers || !dataOffers.data)
                return <></>
            const { data } = dataOffers;
            const bestRow = data.rows.sort((a, b) => parseInt(b.price) - parseInt(a.price))[0];

            if (!bestRow)
                return <></>
            //const {} = bestRow;
            const price = mystToSui(bestRow.price);
            console.log('bestRow', bestRow)
            return (
                <div
                    className={"mt-4 grid rounded-2xl bg-[#1B2333] items-center p-4 text-sm mb-2 font-semibold"}
                >
                    <p>Best offer</p>
                    <p className="title-detail text-[24px] font-semibold">{price} SUI</p>
                    <Link to={`/profile/${bestRow.userAddress}`}><p>From : {formatWallet(bestRow.userAddress)} </p></Link>
                    <button onClick={() => onAcceptOffer(bestRow)} className="mt-4 btn-primary">
                        Accept Offer | {price} SUI
                    </button>
                </div>
            )
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <>{renderRow()}</>
    )
}

export default BestOffer;