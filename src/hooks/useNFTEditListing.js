import {
  EDIT_LISTING,
  SC_CONTRACT_MODULE,
  SC_PACKAGE_MARKET,
  SC_SHARED_MARKET,
  SUI_OFFSET,
} from "configs";
import { toast } from "react-hot-toast";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";

const useNFTEditListing = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const onEditListing = async (itemID, price) => {
    try {
      if (!itemID || !price) return;

      const price_sm = price * SUI_OFFSET;
      const tx = new TransactionBlock();

      const request = {
        target: `${SC_PACKAGE_MARKET}::${SC_CONTRACT_MODULE}::${EDIT_LISTING}`,
        typeArguments: [],
        arguments: [
          tx.pure(SC_SHARED_MARKET),
          tx.pure(itemID),
          tx.pure(price_sm.toString()),
        ],
      };
      tx.moveCall(request);
      const response = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: { showEffects: true },
      });
      toast.success("Edit Listing success!");
      return !!response?.effects?.status?.status;
    } catch (ex) {
      toast.error("Opps! There are some errors");
      console.log(ex);
    }
  };

  return { onEditListing };
};

export default useNFTEditListing;
