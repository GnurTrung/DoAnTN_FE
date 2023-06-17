import {
  DELIST_NFT,
  SC_CONTRACT_MODULE,
  SC_PACKAGE_MARKET,
  SC_SHARED_MARKET,
} from "configs";
import useProviderSigner from "contexts/useProviderSigner";
import { toast } from "react-hot-toast";
import { useWalletKit } from "@mysten/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTListingDelist = () => {
  const { getObject } = useProviderSigner();
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const onDelist = async (itemID) => {
    try {
      if (!itemID) return;
      const object = await getObject(itemID);

      const typeNFT = object?.data?.type;
      if (!typeNFT) return;

      const tx = new TransactionBlock();
      const request = {
        target: `${SC_PACKAGE_MARKET}::${SC_CONTRACT_MODULE}::${DELIST_NFT}`,
        typeArguments: [typeNFT],
        arguments: [tx.pure(SC_SHARED_MARKET), tx.pure(itemID)],
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

  return { onDelist };
};

export default useNFTListingDelist;
