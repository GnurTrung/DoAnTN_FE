import { getAsync } from "helpers/request";

export const getAnalysis = async (option) => {
    return await getAsync(`/collection/get-chart`, option);
};
