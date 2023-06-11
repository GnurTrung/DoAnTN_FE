import { Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNftDetailContext } from "../context";

const RefCode = () => {
    const { accNftData } = useNftDetailContext();
    const { Paragraph } = Typography;
    const [copied, setCopied] = useState(false);
    const refcode = `${window.location.href.split("?")[0]}?ref=${accNftData?.referalCode || ""}`

    useEffect(() => {
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }, [copied]);
    return (
        <div className="bg-[#131924] border-jacarta-600 rounded-2xl border py-4 px-8 mt-6">
            <span className="text-white font-semibold">
                Invite Friend
            </span>
            <div className="mt-2">
                <div className="flex w-full justify-start select-none items-center rounded-lg border-[#4E4D6E] border-solid border py-3 px-4">
                    <Tooltip title={copied ? "Copied" : "Copy"}>
                        <div className="text-lg font-display font-semibold text-[#BABAC7]">
                            <CopyToClipboard className="cursor-pointer hover:text-white" text={refcode} onCopy={() => setCopied(true)}>
                                <span>{refcode}</span>
                            </CopyToClipboard>
                        </div>
                    </Tooltip>
                    <Paragraph copyable={{ text: refcode }}></Paragraph>
                </div>
            </div>
        </div>
    )
};

export default RefCode;