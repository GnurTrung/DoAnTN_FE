import { MAKE_OFFER, SC_CONTRACT_MODULE, SC_PACKAGE_MARKET, SC_SHARED_MARKET, SUI_OFFSET, SC_CONTRACT_MODULE_V1, SC_PACKAGE_MARKET_V1, SC_SHARED_MARKET_V1 } from "configs";
import useProviderSigner from "contexts/useProviderSigner";
import { toast } from "react-hot-toast";
import useSuiExecute from "./useSuiExecute";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTMakeOffer = () => {
    const { executeHasPrice, getCoinsByPrice } = useSuiExecute();
    const { getObject } = useProviderSigner()
    const { signAndExecuteTransactionBlock } = useWalletKit();

    const onMakeOffer = async (itemID, price, gas, version) => {
        try {
            if (!itemID || !price || price <= 0)
                return;
            const object = await getObject(itemID);

            const typeNFT = object?.data?.type;;
            if (!typeNFT)
                return;
            const price_sm = (price * SUI_OFFSET)
            const tx = new TransactionBlock();
            const [coin] = tx.splitCoins(tx.gas, [tx.pure(price_sm)]);

            const request = {
                target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${!version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1}::${MAKE_OFFER}`,
                typeArguments: [typeNFT],
                arguments: [
                    tx.pure(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
                    tx.pure(itemID),
                    tx.pure(price_sm.toString()),
                    coin
                ]
            }
            await tx.moveCall(request);
            // if (!isNaN(gas) && gas > 0)
            //     tx.setGasBudget(parseInt(gas * SUI_OFFSET));
            const response = await signAndExecuteTransactionBlock({ transactionBlock: tx, options: { showEffects: true }, });
            return getMessageErrorBlock(response)
        } catch (ex) {
            toast.error('Opps! There are some errors')
            console.log(ex)
        }
    }

    return { onMakeOffer }
}

export default useNFTMakeOffer;