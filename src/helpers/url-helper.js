export const getLogoURL = (path) => {
    if (!path) return null;
    try {
        if (path.slice(0, 5) == "https") {
            return path;
        } else return path && `${process.env.REACT_APP_CMS_URL}${path}`;
    } catch (ex) {
        console.log(ex);
    }
};