import { getAsync, postAsync, getCMSAsync } from "helpers/request";
import { toast } from "react-hot-toast";

export const getNFTsByCollectionIdApi = async (params) => {
  return await getAsync("/nft/get-list", params);
};

export const getNftDetailApi = async (address) => {
  return await getAsync(`/nft/${address}`);
};

export const getMoreNftApi = async ({ address, ...params }) => {
  return await getAsync(`/nft/get-more/${address}`, params);
};

export const explorerNFT = async ({ ...params }) => {
  return await getAsync(`/nft/explore`, params);
};

export const likeNftApi = async ({ nftAddress }) => {
  return await postAsync("/nft/like", { nftAddress });
};

const URL = process.env.REACT_APP_API_URL + "/";

export const getBanner = async () => {
  try {
    const response = await getAsync(`/cms/get-list-cms`);
    const { data } = response;
    return data;
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};

export const getNFTINOAll = async () => {
  try {
    const response = await getAsync(`/cms/get-list-cms`);
    const { data } = response;
    return data;
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};

export const getINOPool = async (options) => {
  const url = `${URL}ino/get-pool`;
  try {
    const response = await postAsync(url, options);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};
export const updateCurrentNFT = async (options) => {
  const url = `${URL}ino/mint-nft`;
  try {
    const response = await postAsync(url, options);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};
export const verifyNFT = async (options) => {
  const url = `${process.env.REACT_APP_SIGN_URL}verify/sign`;
  try {
    const response = await postAsync(url, options);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Some problems appeared, try again later!");
  }
  return { data: {}, meta: {} };
};

export const getINOUser = async () => {
  const url = `${URL}ino/get-user`;
  try {
    const response = await getAsync(url);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};

export const getProjectCMSByCode = async (code) => {
  try {
    const response = await postAsync(`/cms/get-detail-cms`, { code: code });
    const { data } = response;
    return { data: data.data[0] || {} };
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};

export const getRankINO = async (params) => {
  try {
    const response = await postAsync("/ino/get-rank", {
      project: params?.id,
      page: params?.page,
      limit: params?.limit,
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: [], meta: {} };
};

export const refreshOwnerApi = async (id) => {
  try {
    const response = await getAsync(`/nft/refresh-owner/${id}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
