import { TransactionBlock } from "@mysten/sui.js";
import { GAS_BUDGET, SC_PACKAGE_MARKET, SC_CONTRACT_MODULE_V1, SC_PACKAGE_MARKET_V1, SC_SHARED_MARKET_V1} from "configs";
import { SUI_OFFSET } from "configs";
import useProviderSigner from "contexts/useProviderSigner";
import { useWeb3 } from "contexts/useWeb3Context";
import { toast } from "react-hot-toast";
import { getMessageError } from "utils/error-code";

const useSuiExecute = () => {
    const { suiWallet, account } = useWeb3();
    const { executeMoveCall, getPaymentCoin } = useProviderSigner(suiWallet);

    /**
     * 
     * @param {*} options :{packageObjectId,module,function,typeArgent,arguments, gasBudget}
     * @returns 
     * const data = {
                packageObjectId: PK_INO,
                module: "TocenLaunchpadNFT",
                function: "mintNFT",
                typeArguments: [],
                arguments: [
                    SO_INO,
                    coins,
                ],
                gasBudget: 10000,
            }
     */
    const executeHasPrice = async (options) => {
        try {
            options = { gasBudget: GAS_BUDGET, ...options }
            const response = await executeMoveCall(options);
            console.log('executeHasPrice', response);
            if (!response)
                toast.error('Opps! There are some errors')
            else if (response.success == true) {
                toast.success('Success');
                return response;
            } else
                toast.error(getMessageError(response.error))
        } catch (ex) {
            console.log(ex)
        }
    }

    const getCoinsByPrice = async (price, hasOffset = false) => {
        try {
            if (!price || !account)
                return [];
            const value = !hasOffset ? price : (price * SUI_OFFSET)
            const coins = await getPaymentCoin(value, account);
            if (!coins || coins.length === 0)
                toast.error('Insufficient balance')
            return coins;
        } catch (ex) {
            console.log(ex)
        }
        return []
    }


    return { executeHasPrice, getCoinsByPrice }
}

export default useSuiExecute;