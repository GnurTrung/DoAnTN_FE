import {
  ACCEPT_OFFER_LISTED,
  ACCEPT_OFFER_NOT_LIST,
  SC_CONTRACT_MODULE,
  SC_PACKAGE_MARKET,
  SC_SHARED_MARKET,
} from "configs";
import { toast } from "react-hot-toast";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTAcceptOffer = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const onAcceptOffer = async (options) => {
    const { itemID, price, isListed, typeNFT, offerAddress, version } = options;
    try {
      if (!itemID || !price || price <= 0 || !offerAddress) return;
      const functionAccept = isListed
        ? ACCEPT_OFFER_LISTED
        : ACCEPT_OFFER_NOT_LIST;
      const tx = new TransactionBlock();
      const request = {
        target: `${SC_PACKAGE_MARKET}::${SC_CONTRACT_MODULE}::${functionAccept}`,
        typeArguments: [typeNFT],
        arguments: [
          tx.pure(SC_SHARED_MARKET),
          tx.pure(itemID),
          tx.pure(offerAddress),
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

  return { onAcceptOffer };
};

export default useNFTAcceptOffer;
