import { ACCESS_TOKEN } from "../constants/authentication";

export function getCookie(name = ACCESS_TOKEN) {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

export const cookieSetting = () => {
    return ({
        path: "/",
    })
}