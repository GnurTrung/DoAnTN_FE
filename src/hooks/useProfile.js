import { useWeb3 } from "contexts/useWeb3Context";
import { useState } from "react";
import { verifyTwitter } from "services/user";

const useProfile = () => {

    const [noProfile, setNoProfile] = useState(true)
    const { account } = useWeb3()
    const [hasProfile, setHasProfile] = useState(false)

    const getProfile = async () => {
        if (!account)
            return
        try {
            const isVerifyTwitter = await verifyTwitter();
            setHasProfile(isVerifyTwitter.data)

            //setProfile(data)
        } catch (ex) {
            console.log(ex)
        }
    }

    return { getProfile, hasProfile, isNoProfile: !hasProfile }
}

export default useProfile