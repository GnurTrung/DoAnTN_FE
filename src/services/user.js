import { getAsync, postAsync } from "helpers/request";

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

