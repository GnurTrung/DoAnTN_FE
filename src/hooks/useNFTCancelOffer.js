import {
  CANCEL_OFFER,
  SC_CONTRACT_MODULE,
  SC_PACKAGE_MARKET,
  SC_SHARED_MARKET,
  SUI_OFFSET,
  SC_CONTRACT_MODULE_V1,
  SC_PACKAGE_MARKET_V1,
  SC_SHARED_MARKET_V1,
  SC_SHARED_COLLECTION_OFFER_V1,
} from "configs";
import { toast } from "react-hot-toast";
import useSuiExecute from "./useSuiExecute";
import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { getMessageErrorBlock } from "utils/error-code";
import { useProviderSigner } from "contexts";

const useNFTCancelOffer = () => {
  const { executeHasPrice } = useSuiExecute();
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const { getObject } = useProviderSigner();

  const onCancelOffer = async (options) => {
    const { itemID, price, gas, version } = options;
    console.log("options", options);
    try {
      if (!itemID || !price || price <= 0) return;
      const tx = new TransactionBlock();
      const request = {
        target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${
          !version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1
        }::${CANCEL_OFFER}`,
        typeArguments: [],
        arguments: [
          tx.pure(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
          tx.pure(itemID),
          tx.pure(price.toString()),
        ],
      };
      await tx.moveCall(request);
      // if (!isNaN(gas) && gas > 0)
      //     tx.setGasBudget(parseInt(gas * SUI_OFFSET));
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
    const { itemID, price, timestamp, version } = options;
    try {
      if (!itemID || !price || price <= 0) return;
      const object = await getObject(itemID);

      const typeNFT = object?.data?.type;
      if (!typeNFT) return;
      const tx = new TransactionBlock();
      const request = {
        target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${
          !version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1
        }::${CANCEL_OFFER}`,
        typeArguments: [typeNFT],
        arguments: [
          tx.object(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
          tx.object(SC_SHARED_COLLECTION_OFFER_V1),
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
