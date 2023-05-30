import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { SUI_OFFSET } from "configs";
import {
  LIST_NFT,
  SC_CONTRACT_MODULE,
  SC_PACKAGE_MARKET,
  SC_SHARED_MARKET,
  SC_CONTRACT_MODULE_V1,
  SC_PACKAGE_MARKET_V1,
  SC_SHARED_MARKET_V1,
} from "configs";
import useProviderSigner from "contexts/useProviderSigner";
import { toast } from "react-hot-toast";
import { getMessageErrorBlock } from "utils/error-code";

const useNFTListing = () => {
  const { getObject } = useProviderSigner();
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const onListing = async (itemID, price, gas, version) => {
    try {
      if (!itemID || !price) return;
      const object = await getObject(itemID);

      const typeNFT = object?.data?.type;
      if (!typeNFT) return;

      const tx = new TransactionBlock();
      const price_sm = price * SUI_OFFSET;
      const request = {
        target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${
          !version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1
        }::${LIST_NFT}`,
        typeArguments: [typeNFT],
        arguments: [
          tx.pure(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
          tx.pure(itemID),
          tx.pure(price_sm.toString()),
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
      toast.error(ex.message);
      console.log(ex);
    }
  };

  const onBulkListing = async (nftArray, priceMap, version) => {
    try {
      if (!nftArray.length) return;
      const tx = new TransactionBlock();
      for (let i = 0; i < nftArray.length; i++) {
        const { nftId } = nftArray[i];
        const object = await getObject(nftId);

        const typeNFT = object?.data?.type;
        if (!typeNFT) return;
        const price_sm = priceMap[nftId] * SUI_OFFSET;
        tx.moveCall({
          target: `${!version ? SC_PACKAGE_MARKET : SC_PACKAGE_MARKET_V1}::${
            !version ? SC_CONTRACT_MODULE : SC_CONTRACT_MODULE_V1
          }::${LIST_NFT}`,
          typeArguments: [typeNFT],
          arguments: [
            tx.object(!version ? SC_SHARED_MARKET : SC_SHARED_MARKET_V1),
            tx.object(nftId),
            tx.pure(price_sm.toString()),
          ],
        });
      }
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

  return { onListing, onBulkListing };
};

export default useNFTListing;
