import { useState } from "react";

const useShowModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({})
    const toggleModal = (show = false) => setShowModal(show)
    const onHide = () => {
        setShowModal(false);
        setData({})
    }
    const onShow = (data) => {
        setShowModal(true)
        setData(data);
    };

    return { showModal, toggleModal, onHide, onShow, dataModal: data }
}

export default useShowModal;