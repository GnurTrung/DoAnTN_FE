import { postAsync } from "helpers/request";

export const getActivityApi = async (options) => {
  try {
    const res = await postAsync("/activity", options);
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
  return { data: null, meta: {} };
};
