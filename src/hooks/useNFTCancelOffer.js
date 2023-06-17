import {
  CANCEL_OFFER,
  SC_CONTRACT_MODULE,
  SC_PACKAGE_MARKET,
  SC_SHARED_MARKET,
  SUI_OFFSET,
  SC_SHARED_COLLECTION_OFFER,
} from "configs";
import { toast } from "react-hot-toast";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { getMessageErrorBlock } from "utils/error-code";
import { useProviderSigner } from "contexts";

const useNFTCancelOffer = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const { getObject } = useProviderSigner();

  const onCancelOffer = async (options) => {
    const { itemID, price } = options;
    console.log("options", options);
    try {
      if (!itemID || !price || price <= 0) return;
      const tx = new TransactionBlock();
      const request = {
        target: `${SC_PACKAGE_MARKET}::${SC_CONTRACT_MODULE}::${CANCEL_OFFER}`,
        typeArguments: [],
        arguments: [
          tx.pure(SC_SHARED_MARKET),
          tx.pure(itemID),
          tx.pure(price.toString()),
        ],
      };
      tx.moveCall(request);
      const response = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: { showEffects: true },
      });
      return getMessageErrorBlock(response);
    } catch (ex) {
      toast.error("Opps! There are some errors");
      console.log(ex);
    }
  };

  const onCancelCollectionOffer = async (options) => {
    const { itemID, price, timestamp } = options;
    try {
      if (!itemID || !price || price <= 0) return;
      const object = await getObject(itemID);

      const typeNFT = object?.data?.type;
      if (!typeNFT) return;
      const tx = new TransactionBlock();
      const request = {
        target: `${SC_PACKAGE_MARKET}::${SC_CONTRACT_MODULE}::${CANCEL_OFFER}`,
        typeArguments: [typeNFT],
        arguments: [
          tx.object(SC_SHARED_MARKET),
          tx.object(SC_SHARED_COLLECTION_OFFER),
          tx.pure((price * SUI_OFFSET).toString()),
          tx.pure(timestamp),
        ],
      };
      tx.moveCall(request);
      const response = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: { showEffects: true },
      });
      return getMessageErrorBlock(response);
    } catch (ex) {
      toast.error("Opps! There are some errors");
      console.log(ex);
    }
  };

  return { onCancelOffer, onCancelCollectionOffer };
};

export default useNFTCancelOffer;
