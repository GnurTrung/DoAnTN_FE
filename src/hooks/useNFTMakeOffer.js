import {
  MAKE_OFFER,
  SC_CONTRACT_MODULE,
  SC_PACKAGE_MARKET,
  SC_SHARED_MARKET,
  SUI_OFFSET,
} from "configs";
import useProviderSigner from "contexts/useProviderSigner";
import { toast } from "react-hot-toast";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTMakeOffer = () => {
  const { getObject } = useProviderSigner();
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const onMakeOffer = async (itemID, price, gas, version) => {
    try {
      if (!itemID || !price || price <= 0) return;
      const object = await getObject(itemID);

      const typeNFT = object?.data?.type;
      if (!typeNFT) return;
      const price_sm = price * SUI_OFFSET;
      const tx = new TransactionBlock();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(price_sm)]);

      const request = {
        target: `${SC_PACKAGE_MARKET}::${SC_CONTRACT_MODULE}::${MAKE_OFFER}`,
        typeArguments: [typeNFT],
        arguments: [
          tx.pure(SC_SHARED_MARKET),
          tx.pure(itemID),
          tx.pure(price_sm.toString()),
          coin,
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

  return { onMakeOffer };
};

export default useNFTMakeOffer;
