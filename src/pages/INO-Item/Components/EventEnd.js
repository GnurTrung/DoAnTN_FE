const EvenEnd = () => {
    return <>
    <span className=" text-[14px] text-white font-display font-semibold mt-2">
        Event Ended
    </span>
    <div
        className="mt-2 js-countdown-single-timer flex space-x-4 w-full rounded-2xl justify-center py-2"
        data-countdown="2022-09-07T19:40:30"
        data-expired="This auction has ended"
    >
        <span className="countdown-daystext-white">
            <span className="js-countdown-days-number text-[18px] font-medium">
                {0}
            </span>
            <span className="block text-xs font-medium tracking-tight">
                Days
            </span>
        </span>
        <span className="countdown-hourstext-white">
            <span className="js-countdown-hours-number text-[18px] font-medium">
                {0}
            </span>
            <span className="block text-xs font-medium tracking-tight">
                Hrs
            </span>
        </span>
        <span className="countdown-minutestext-white">
            <span className="js-countdown-minutes-number text-[18px] font-medium">
                {0}
            </span>
            <span className="block text-xs font-medium tracking-tight">
                Min
            </span>
        </span>
        <span className="countdown-secondstext-white">
            <span className="js-countdown-seconds-number text-[18px] font-medium">
                {0}
            </span>
            <span className="block text-xs font-medium tracking-tight">
                Sec
            </span>
        </span>
    </div></>
}
export default EvenEnd