import { mystToSui } from "utils/wallet-utils"
import { useNftDetailContext } from "../context"

const Price = () => {
    const { dataOnchain } = useNftDetailContext()
    const price = dataOnchain?.price
    return (
        <>
            {price && < div className="content_bottom--price_and_time">
                <div className="content_bottom--price">
                    <p className="content_bottom--price_title">Price</p>
                    <p className="content_bottom--price_price">
                        {mystToSui(price)} SUI
                    </p>
                </div>
                {/* <div className="content_bottom--time">
                <p className="content_bottom--price_title">
                    Sale ends in
                </p>
                <p className="content_bottom--time_time">
                    <span>6d</span> <span>21h</span> <span>2m</span>{" "}
                    <span>23s</span>
                </p>
            </div> */}
            </div>}
        </>
    )
}

export default Price