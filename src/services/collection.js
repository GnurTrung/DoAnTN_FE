import { getAsync, postAsync } from "helpers/request";

export const getCollectionDetailApi = async (address) => {
  return await getAsync("/collection/get-detail", { address });
};

export const getListCollection = async (options = {}) => {
  try {
    const { page = 1, limit = 10 } = options;
    const response = await getAsync(
      `/collection/get-list?page=${page}&limit=${limit}`
    );
    return response?.data || {};
  } catch (ex) {}
  return { data: { rows: [], total: 0 } };
};

export const addToWatchlistApi = async (collectionAddress) => {
  try {
    const response = await postAsync("/user/watchlist/update", {
      collectionAddress,
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
