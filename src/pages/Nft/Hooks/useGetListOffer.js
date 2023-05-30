import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListOffer } from "services/userNFT";

const useGetListOffer = () => {
    const [data, setData] = useState({})

    const { id } = useParams();

    const getListNFTOffer = async () => {
        const data = await getListOffer(id)
        setData(data)
    }

    useEffect(() => { id && getListNFTOffer() }, [id])

    return { data, getListNFTOffer }
}
export default useGetListOffer;