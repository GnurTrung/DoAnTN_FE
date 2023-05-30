import { useState } from "react";

const useReloadData = () => {
    const [reload, setReload] = useState(1)
    const handleReload = () => setReload(x => x + 1)
    return { reload, handleReload }
}
export default useReloadData;