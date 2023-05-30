import { getAsync, getCMSAsync, postAsync, putAsync } from "../helpers/request";

const URL = process.env.REACT_APP_STAKE_URL;

export const getProjectByCode = async (collectName) => {
  try {
    const url = `${URL}project/getInfo?collect_name=${collectName}`;
    const response = await getAsync(url);
    const { data } = response;
    return data;
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};
export const getPriceByCode = async (options) => {
  try {
    const url = `${URL}token-price`;
    const response = await postAsync(url, options);
    const { data } = response;
    return data;
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};
export const getProjectCMSByCode = async (code) => {
  try {
    const url = `${process.env.REACT_APP_CMS_URL}/project-idos/?populate=*&filters[code][$eq]=${code}`;
    const response = await getCMSAsync(url);
    const { data } = response;
    return { data: data.data[0] || {} };
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};
export const verifyClaim = async (options) => {
  const url = `${process.env.REACT_APP_SIGN_URL}verify/sign-claim`;
  try {
    const response = await postAsync(url, options);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: {}, meta: {} };
};
export const claim = async (options) => {
  try {
    const url = `${URL}claim`;
    const response = await putAsync(url, options);
    const { data } = response;
    return data;
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};
export const claimAirdrop = async (options) => {
  try {
    const url = `${URL}claim/airdrop`;
    const response = await postAsync(url, options);
    const { data } = response;
    return data;
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};

export const getDataNFTPort = async () => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/nft/portfolio-nft`;
    const response = await getAsync(url);
    const { data } = response;
    return data;
  } catch (ex) {
    console.log(ex);
  }
  return { data: [], meta: {} };
};
