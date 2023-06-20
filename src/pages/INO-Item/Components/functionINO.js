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
  const { getData, nftData, toggleModalWaitingForSignature } =
    useNftDetailContext();
  const { ref } = useQuery();

  const attributes = nftData?.attributes;
  const PK_INO = attributes?.SCData?.SC_collection;
  const SO_INO = attributes?.SCData?.SO_collection;
  const SC_MODULE = attributes?.SCData?.module;
  const SC_FUNCTION_WL = attributes?.SCData?.functionMintWhitelist;
  const SC_FUNCTION_PL = attributes?.SCData?.functionMintPublic;
  const SC_FUNCTION_PV = attributes?.SCData?.functionMintPrivate;
  const SC_FUNCTION_KH = attributes?.SCData?.functionMintKeyHolder;
  const pricePublic = attributes?.price?.pricePublic;
  const priceWhitelist = attributes?.price?.priceWhitelist;
  const pricePrivate = attributes?.price?.pricePrivate;
  const priceKeyHolder = attributes?.price?.priceKeyHolder;
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
        case "private":
          SC_FUNCTION = SC_FUNCTION_PV;
          value = pricePrivate * SUI_OFFSET;
          break;
        case "holder":
          SC_FUNCTION = SC_FUNCTION_KH;
          value = priceKeyHolder * SUI_OFFSET;
          break;
        default:
          break;
      }
      let code = attributes?.code;
      const dataIDO = {
        code: code,
        type: type,
        contract_address: PK_INO,
      };
      toggleModalWaitingForSignature(true);
      const verify = await verifyNFT(dataIDO);
      toggleModalWaitingForSignature(false);
      if (verify?.data?.error) {
        return toast.error(verify?.data?.message);
      }
      const signature = verify?.data?.signature;
      if (
        !signature ||
        signature.length === 0 ||
        !signature[0] ||
        !signature[1] ||
        signature[0].length === 0 ||
        signature[1].length === 0
      )
        return toast.error(
          "Can't verify signature, try re-login the wallet or press Ctrl + F5"
        );
      const tx = new TransactionBlock();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(value)]);
      const args = [
        tx.pure(SO_INO),
        coin,
        tx.pure(signature[0].map((num) => num.toString())), // sign
        tx.pure(signature[1].map((num) => num.toString())), // msg
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
        toast.success("Mint success");
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
