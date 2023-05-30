import { useWeb3 } from "contexts/useWeb3Context"
import { useRedirect } from "hooks";

const VerifyButton = () => {
    const { account } = useWeb3()
    const { redirectToPage } = useRedirect();
    return (
        <button
            className="mt-4 btn-primary w-full"
            onClick={()=> redirectToPage(`/verify-account/${account}`) }
        >
            Verify to Mint
        </button>

    )
}

export default VerifyButton