import { useState } from "react";

const useLoading = () => {
    const [loading, setLoading] = useState(false);
    const showLoading = (loading = false) => setLoading(loading)
    const hideLoading = () => setLoading(false)

    return { loading, showLoading, hideLoading }
}

export default useLoading