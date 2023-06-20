import { SC_CONTRACT_MODULE } from "configs";
import { SC_SHARED_MARKET } from "configs";
import { BUY_NFT } from "configs";
import { SC_PACKAGE_MARKET } from "configs";
import useProviderSigner from "contexts/useProviderSigner";
import { toast } from "react-hot-toast";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTBuyAndTake = () => {
  const { getObject } = useProviderSigner();
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const onBuyAndTake = async (itemID, price) => {
    try {
      if (!itemID || !price) return;
      const object = await getObject(itemID);
      const typeNFT = object?.data?.type;
      if (!typeNFT) return;

      const tx = new TransactionBlock();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(price)]);

      const request = {
        target: `${SC_PACKAGE_MARKET}::${SC_CONTRACT_MODULE}::${BUY_NFT}`,
        typeArguments: [typeNFT],
        arguments: [tx.pure(SC_SHARED_MARKET), tx.pure(itemID), coin],
      };
      tx.moveCall(request);
      const response = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: { showEffects: true },
      });
      return getMessageErrorBlock(response);
    } catch (ex) {
      toast.error(ex.message);
      console.log(ex);
    }
  };

  return { onBuyAndTake };
};

export default useNFTBuyAndTake;
