import { useState } from "react";

const useDrawerMenu = () => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    const onOpen = () => setOpen(true);
    const toggleOpen = () => setOpen(x => !x);

    return { open, onClose, onOpen, toggleOpen };
}

export default useDrawerMenu;