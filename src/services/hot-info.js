import { getCMSAsync } from "helpers/request";

export const getHotInfo = async (options) => {
    try {
        const url = process.env.REACT_APP_CMS_URL;
        const res = await getCMSAsync(url + "/hot-infos");
        const { data } = res;
        return data;
    } catch (error) {
        console.log(error);
    }
    return { data: null, meta: {} };
};
