const SUI_OFFSET = 1000000000;
export const formatWallet = (address) => {
    if (!address)
        return ''
    const length = address.length;
    const offset = 5;
    return `${address.substring(0, offset)}...${address.substring(length - offset, length)}`

}

export const mystToSui = (price) => {
    if (!price)
        return '--'
    return price / SUI_OFFSET;
}
export const numberShortFormat = (number) => {
    let finalNumber = number;
    let suffixCount = 0;
    const suffixList = ["", "K", "M", "B", "T", "Q"];
    while (finalNumber > 1000) {
        finalNumber = finalNumber / 1000;
        suffixCount += 1;
    }
    finalNumber = Math.round(finalNumber * 1000) / 1000;
    if (suffixCount < suffixList.length) {
        return `${finalNumber}${suffixList[suffixCount]}`;
    } else {
        return `${finalNumber}x10^${suffixCount}`;
    }
};
