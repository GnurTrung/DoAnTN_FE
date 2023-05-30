import { getAsync } from "helpers/request";


export const getListNFTOff = async (id, options = {}) => {
    try {
        const url = `/user/nft/${id}`
        const response = await getAsync(
            url, options
        );
        return response?.data || {};
    } catch (ex) { }
    return { data: { rows: [], total: 0 } };
};


export const getListOffer = async (address) => {
    try {
        const url = `/nft/get-offers/${address}?page=1&limit=100000`
        const response = await getAsync(
            url
        );
        return response?.data || {};
    } catch (ex) {
        console.log(ex)
    }
    return { data: { rows: [], total: 0 } };
}