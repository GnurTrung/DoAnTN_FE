import { useNftDetailContext } from "../context";
import { useWalletKit } from "@mysten/wallet-kit";
import { toast } from "react-hot-toast";
import { updateCurrentNFT, verifyNFT } from "services/nfts";
import { getMessageError } from "utils/error-code";
import { CLOCK } from "constants/chain";
import { SUI_OFFSET } from "configs";
import { TransactionBlock } from "@mysten/sui.js";
import useQuery from "hooks/useQuery";

const useFunctionIDO = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const { getData, nftData } =
    useNftDetailContext();
  const { ref } = useQuery();

  const attributes = nftData?.attributes;
  const PK_INO = attributes?.SC_collection;
  const SO_INO = attributes?.SO_collection;
  const SC_MODULE = "boho_collection"
  const SC_FUNCTION_WL = "mint_nft_with_whitelist";
  const SC_FUNCTION_PL = "mint_nft_with_public";
  const pricePublic = attributes?.pricePublic;
  const priceWhitelist = attributes?.priceWhitelist;
  const handleMint = async (type) => {
    try {
      let value = 0;
      let SC_FUNCTION = "";
      switch (type) {
        case "whitelist":
          SC_FUNCTION = SC_FUNCTION_WL;
          value = priceWhitelist * SUI_OFFSET;
          break;
        case "public":
          SC_FUNCTION = SC_FUNCTION_PL;
          value = pricePublic * SUI_OFFSET;
          break;
        default:
          break;
      }
      let code = attributes?.code;

      const tx = new TransactionBlock();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(value)]);
      const args = [
        tx.pure(SO_INO),
        coin,
        tx.pure(CLOCK),
      ];
      const data = {
        target: `${PK_INO}::${SC_MODULE}::${SC_FUNCTION}`,
        typeArguments: [],
        arguments: args,
      };
      console.log("moveCall", data);
      tx.moveCall(data);
      const response = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
        },
      });
      console.log("response", response);
      const dataUpdate = {
        project: code,
        type: type,
        txnID: response?.digest,
        inviteRefCode: ref ? ref : "",
      };
      if (!response) toast.error("Opps! There are some errors");
      else if (response?.effects?.status.status == "success") {
        await updateCurrentNFT(dataUpdate);
        await getData();
        toast.success("Mint success!");
      } else
        toast.error(getMessageError(response?.effects?.status.error || ""));
    } catch (error) {
      console.log(error.message);
      toast.error(getMessageError(error.message));
    } finally {
    }
  };
  return { handleMint };
};
export default useFunctionIDO;
