import { getAsync } from "helpers/request";

export const getGlobalSearchDataApi = async (search) => {
  try {
    const response = await getAsync("/elasticsearch/search", {
      filter: search,
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
