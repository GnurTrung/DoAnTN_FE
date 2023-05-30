import { DELIST_NFT, SC_CONTRACT_MODULE, SC_PACKAGE_MARKET, SC_SHARED_MARKET, SUI_OFFSET, SC_CONTRACT_MODULE_V1, SC_PACKAGE_MARKET_V1, SC_SHARED_MARKET_V1 } from "configs";
import useProviderSigner from "contexts/useProviderSigner";
import { toast } from "react-hot-toast";
import useSuiExecute from "./useSuiExecute";
import { useWalletKit } from "@mysten/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTListingDelist = () => {
    const { executeHasPrice, } = useSuiExecute();
    const { getObject } = useProviderSigner()
    const { signAndExecuteTransactionBlock } = useWalletKit()

    const onDelist = async (itemID, gas, version) => {
        try {
            console.log(!version)
            if (!itemID)
                return;
            const object = await getObject(itemID);

            const typeNFT = object?.data?.type;;
            if (!typeNFT)
                return;

            const tx = new TransactionBlock();
            const request = {
                target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${!version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1}::${DELIST_NFT}`,
                typeArguments: [typeNFT],
                arguments: [
                    tx.pure(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
                    tx.pure(itemID),
                ]
            }
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

    return { onDelist }
}

export default useNFTListingDelist;