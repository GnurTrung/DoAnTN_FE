import { getAsync, postAsync } from "helpers/request";
import { async } from "q";

export const getOfferMadeApi = async ({ address, ...params }) => {
  try {
    const response = await getAsync(`/user/nft-offer/${address}`, params);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};

export const getUserPro5 = async ({ address, ...params }) => {
  try {
    const response = await getAsync(`/user/profile/${address}`, params);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};
export const updateUserPro5 = async ({ address, options }) => {
  const url = `/user/profile/${address}/update`;
  try {
    const response = await postAsync(url, options);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};
export const verifyTwitter = async () => {
  try {
    const response = await getAsync(`ino/verify-twitter`);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};
export const verifyDiscord = async () => {
  try {
    const response = await getAsync(`ino/verify-discord`);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};

export const getOfferReceivedApi = async ({ address, ...params }) => {
  try {
    const response = await getAsync(
      `/user/nft-offer-received/${address}`,
      params
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};

export const getFavoriteNftsApi = async (params) => {
  try {
    const response = await getAsync("/nft/get-list/favorite", params);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};

export const getWatchlistApi = async (params) => {
  try {
    const response = await getAsync("/user/watchlist", {
      ...params,
      page: 1,
      limit: 9999,
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
