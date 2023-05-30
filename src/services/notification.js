import { getAsync, postAsync } from "helpers/request";

export const getNotiApi = async (params) => {
  try {
    const res = await getAsync(`/user/get-notice`, params);
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotiByIdApi = async (id) => {
  try {
    const res = await postAsync(`/user/delete-notice/${id}`);
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const markNotiAsReadByIdApi = async (id) => {
  try {
    const res = await postAsync(`/user/read-notice/${id}`);
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllNotiApi = async () => {
  try {
    const res = await postAsync("/user/clear-all-notice");
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const readAllNotiApi = async () => {
  try {
    const res = await postAsync("/user/read-all-notice");
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNewNotiApi = async () => {
  try {
    const res = await getAsync("/user/get-new-notice");
    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};
