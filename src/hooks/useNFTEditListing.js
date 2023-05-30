import { EDIT_LISTING, SC_CONTRACT_MODULE, SC_PACKAGE_MARKET, SC_SHARED_MARKET, SUI_OFFSET, SC_CONTRACT_MODULE_V1, SC_PACKAGE_MARKET_V1, SC_SHARED_MARKET_V1 } from "configs";
import { toast } from "react-hot-toast";
import useSuiExecute from "./useSuiExecute";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";

const useNFTEditListing = () => {
    const { executeHasPrice, } = useSuiExecute();
    const { signAndExecuteTransactionBlock } = useWalletKit()

    const onEditListing = async (itemID, price, gas, version) => {
        try {
            if (!itemID || !price)
                return;

            const price_sm = (price * SUI_OFFSET)
            const tx = new TransactionBlock();

            const request = {
                target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${!version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1}::${EDIT_LISTING}`,
                typeArguments: [],
                arguments: [
                    tx.pure(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
                    tx.pure(itemID),
                    tx.pure(price_sm.toString()),
                ]
            }
            await tx.moveCall(request);
            // if (!isNaN(gas) && gas > 0)
            //     tx.setGasBudget(parseInt(gas * SUI_OFFSET));
            const response = await signAndExecuteTransactionBlock({ transactionBlock: tx, options: { showEffects: true }, });
            toast.success('Edit Listing success')
            return !!response?.effects?.status?.status;

        } catch (ex) {
            toast.error('Opps! There are some errors')
            console.log(ex)
        }
    }

    return { onEditListing }
}

export default useNFTEditListing;