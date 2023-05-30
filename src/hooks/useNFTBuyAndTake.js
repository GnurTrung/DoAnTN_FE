import { SC_CONTRACT_MODULE, SUI_OFFSET } from "configs";
import { SC_SHARED_MARKET } from "configs";
import { BUY_NFT } from "configs";
import { SC_PACKAGE_MARKET, SC_CONTRACT_MODULE_V1, SC_PACKAGE_MARKET_V1, SC_SHARED_MARKET_V1 } from "configs";
import useProviderSigner from "contexts/useProviderSigner";
import { toast } from "react-hot-toast";
import useSuiExecute from "./useSuiExecute";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTBuyAndTake = () => {
    const { executeHasPrice, getCoinsByPrice } = useSuiExecute();
    const { getObject } = useProviderSigner()
    const { signAndExecuteTransactionBlock } = useWalletKit();

    const onBuyAndTake = async (itemID, price, gas, version) => {
        try {
            if (!itemID || !price)
                return;
            const object = await getObject(itemID);
            const typeNFT = object?.data?.type;;
            if (!typeNFT)
                return;

            const tx = new TransactionBlock();
            const [coin] = tx.splitCoins(tx.gas, [tx.pure(price)]);

            const request = {
                target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${!version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1}::${BUY_NFT}`,
                typeArguments: [typeNFT],
                arguments: [
                    tx.pure(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
                    tx.pure(itemID),
                    coin
                ]
            }
            //tx.setGasBudget(100000000)
            await tx.moveCall(request);
            // if (!isNaN(gas) && gas > 0)
            //     tx.setGasBudget(parseInt(gas * SUI_OFFSET));
            const response = await signAndExecuteTransactionBlock({ transactionBlock: tx, options: { showEffects: true }, });
            return getMessageErrorBlock(response)
        } catch (ex) {
            toast.error(ex.message)
            console.log(ex)
        }
    }

    return { onBuyAndTake }
}

export default useNFTBuyAndTake;