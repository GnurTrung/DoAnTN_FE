import { useRedirect } from "hooks";
import { useState } from "react";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { getHotInfo } from "services/hot-info";
const Marquees = () => {
    const { redirectToPage } = useRedirect();

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const { data = [] } = await getHotInfo()
            setData(data)
        }
        catch (ex) {
            console.log(ex)
        }
    }

    const renderData = () => {
        try {
            if (!data || data.length === 0)
                return <></>
            const marquees = data.map(x => ({
                message: x?.attributes?.message,
                link: x?.attributes?.redirect_link
            }))
            return marquees.map((item, index) => (
                <p key={index} className="mx-12" onClick={() => item.link && redirectToPage(item.link)}>{item.message}</p>
            ))
        } catch (ex) {
            console.log(ex)
        }
        return <></>
    }

    return (
        <div className="w-full h-11 hover:opacity-100 z-[21]">
            <div className="w-full h-11 bg-gray-500 hover:bg-gray-600 transition-colors flex items-center px-9 justify-center relative text-light-gray-700">
                <Marquee speed={60} gradient={false} direction={"right"} pauseOnHover pauseOnClick className="cursor-pointer">
                    {renderData()}
                </Marquee>

            </div>
        </div>)
}

export default Marquees;