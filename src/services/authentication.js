import { getAsync, postAsync } from "helpers/request";

export const authenticate = async (options) => {
    try {
        const response = await postAsync('/user/login', options)
        return response
    } catch (ex) {
        console.log(ex);
    }
    return false;
}