import { ACCEPT_OFFER_LISTED, ACCEPT_OFFER_NOT_LIST, MAKE_OFFER, SC_CONTRACT_MODULE, SC_PACKAGE_MARKET, SC_SHARED_MARKET, SUI_OFFSET, SC_CONTRACT_MODULE_V1, SC_PACKAGE_MARKET_V1, SC_SHARED_MARKET_V1 } from "configs";
import { toast } from "react-hot-toast";
import useSuiExecute from "./useSuiExecute";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTAcceptOffer = () => {
    const { executeHasPrice, } = useSuiExecute();
    const { signAndExecuteTransactionBlock } = useWalletKit();

    const onAcceptOffer = async (options) => {
        const { itemID, price, isListed, typeNFT, offerAddress, gas, version } = options;
        console.log(options)
        try {
            if (!itemID || !price || price <= 0 || !offerAddress)
                return;

            const functionAccept = (isListed ? ACCEPT_OFFER_LISTED : ACCEPT_OFFER_NOT_LIST)
            const tx = new TransactionBlock();
            const request = {
                target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${!version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1}::${functionAccept}`,
                typeArguments: [typeNFT],
                arguments: [
                    tx.pure(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
                    tx.pure(itemID),
                    tx.pure(offerAddress),
                    tx.pure(price.toString()),
                ]
            }
            await tx.moveCall(request);
            // if (!isNaN(gas) && gas > 0)
                // tx.setGasBudget(parseInt(gas * SUI_OFFSET));
            const response = await signAndExecuteTransactionBlock({ transactionBlock: tx, options: { showEffects: true }, });
            return getMessageErrorBlock(response)
        } catch (ex) {
            toast.error('Opps! There are some errors')
            console.log(ex)
        }
    }

    return { onAcceptOffer }
}

export default useNFTAcceptOffer;