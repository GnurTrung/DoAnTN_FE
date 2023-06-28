import { toast } from "react-hot-toast";

export const ERRORS = [
  { code: 1, message: "You are not owner!" },
  { code: 2, message: "Event ended" },
  { code: 3, message: "NFT is not listed" },
  { code: 4, message: "NFT is listed" },
  { code: 5, message: "NFT pool is max!" },
  { code: 6, message: "Insufficient money (No coin)!" },
  { code: 7, message: "You have reached max NFT!" },
  { code: 8, message: "Not time claim!" },
  { code: 9, message: "You can claim Airdrop once!" },
  { code: 10, message: "You are not eligible!" },
  { code: 11, message: "Event hasn't happened yet!" },
  { code: 12, message: "Can't verify your signature!" },
];
export const getMessageError = (error) => {
  let messageDefault = "Oops! There are some errors";
  try {
    if (!error) return messageDefault;
    if (error.startsWith("MoveAbort(MoveLocation") || error.includes("MoveAbort(MoveLocation")) {
      const lastIndex = error.lastIndexOf(",");
      const code = parseInt(
        error
          .substring(lastIndex + 1)
          .trim()
          .split(")")[0]
      );
      const message =
        ERRORS.find((x) => x.code == code)?.message || messageDefault;
      return `${message} (${code})`;
    }
  } catch (ex) {
    console.log(ex);
  }
  return "Oops! There are some errors";
};

export const getMessageErrorBlock = (response) => {
  if (!response) {
    toast.error("Error: No response!");
  }
  try {
    const { status, error } = response?.effects?.status;
    if (!status) {
      toast.error("Error: No response!");
      return;
    }
    if (status === "success") {
      toast.success("Success!");
      return "success";
    }
    if (status === "failure") {
      toast.error(error || "Error: No response!");
      return;
    }
    return true;
  } catch (ex) {
    toast.error("Error: No response!");
  }
};
